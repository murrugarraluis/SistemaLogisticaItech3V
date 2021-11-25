<template>
  <v-card>
    <v-card-text>
      <template>
        <div class="text-center">
          <v-dialog
            v-model="dialog"
            width="500"
          >
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Editar Almacen
              </v-card-title>

              <v-card-text>
                <v-row
                  class-name="match-height"
                  class="py-4"
                >
                  <v-col cols="12">
                    <!-- Formulario-->
                    <v-form
                      ref="form"
                      v-model="valid"
                      class="multi-col-validation"
                      lazy-validation
                    >
                      <!--    Columnas de Inputs-->
                      <v-row>
                        <v-col
                          cols="12"
                        >
                          <v-text-field
                            v-model="editedItem.name"
                            label="Nombre"
                            outlined
                            dense
                            :rules="nameRules"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                        >
                          <v-textarea
                            v-model="editedItem.description"
                            label="Descripcion"
                            outlined
                            dense
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <div class="d-flex flex-column flex-sm-row justify-sm-center">
                  <v-btn
                    color="primary"
                    class="mb-2 mb-sm-0 mr-sm-2"
                    @click="save"
                  >
                    Guardar
                  </v-btn>
                  <v-btn
                    type="reset"
                    outlined
                    @click="close"
                  >
                    Cancelar
                  </v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </template>
      <!--      Encabezado de Tabla-->
      <v-card-title class="d-flex flex-column justify-center flex-sm-row">
        <v-text-field
          v-model="search"
          :append-icon="icons.mdiMagnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-btn-toggle>
          <v-btn elevation="0">
            <span class="hidden-sm-and-down">Excel</span>
            <v-icon :right="this.$vuetify.breakpoint.name === 'md'">
              {{ icons.mdiFileExcel }}
            </v-icon>
          </v-btn>

          <v-btn elevation="0">
            <span class="hidden-sm-and-down">CSV</span>
            <v-icon :right="this.$vuetify.breakpoint.name === 'md'">
              {{ icons.mdiFileDelimited }}
            </v-icon>
          </v-btn>

          <v-btn elevation="0">
            <span class="hidden-sm-and-down">PDF</span>
            <v-icon :right="this.$vuetify.breakpoint.name === 'md'">
              {{ icons.mdiFilePdfBox }}
            </v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-card-title>
      <!--      Tabla-->
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            {{ icons.mdiPencil }}
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            {{ icons.mdiDelete }}
          </v-icon>
        </template>
        <template v-slot:no-data>
          No hay datos disponibles
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
import {
  mdiDelete,
  mdiFileDelimited,
  mdiFileExcel,
  mdiFilePdfBox,
  mdiMagnify,
  mdiPencil,
} from '@mdi/js'

import api from '@/api'

export default {
  data: () => ({
    // Variables de uso en tabla
    headers: [
      { text: 'Codigo', align: 'start', value: 'code' },
      { text: 'Nombre', value: 'name' },
      { text: 'Descripcion', value: 'description', sortable: false },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    desserts: [],

    // Variables para ordenamiento de tabla
    sortBy: 'code',
    sortDesc: true,

    // Variables de busqueda o filtrado
    search: '',

    // Iconos
    icons: {
      mdiPencil, mdiDelete, mdiMagnify, mdiFileExcel, mdiFileDelimited, mdiFilePdfBox,
    },

    dialog: false,
    editedItem: {
      id: '',
      code: 0,
      name: 0,
      description: 0,
    },
    defaultItem: {
      id: '',
      code: 0,
      name: 0,
      description: 0,
    },
  }),
  created() {
    this.initialize()

    // console.log('Table Creda')
  },
  mounted() {
    // Recibir y Actualizar data recien ingresada
    this.$root.$on('setData-Table', data => { this.desserts.push(data) })
  },
  methods: {
    async initialize() {
      const url = `${this.$URL_SERVE}/warehouses`
      this.desserts = await api.getAll(url)
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = { ...item }
      this.dialog = true
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item)
      const { id } = { ...item }
      this.$swal({
        title: '¿Está Seguro?', text: 'Una vez eliminado ya no se podrá recuperar!', icon: 'warning', showCancelButton: true, confirmButtonText: 'Si, Eliminar!', cancelButtonText: 'Cancelar',
      }).then(async result => {
        if (result.isConfirmed) {
          const url = `${this.$URL_SERVE}/warehouses/${id}`
          const response = await api.destroy(url)
          if (response.status === 200) {
            this.$swal('Eliminado!!!', response.message, 'success')
            this.desserts.splice(index, 1)
          } else {
            this.$swal('Algo no salió bien !!!', response.error, 'error')
          }
        }
      })
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },
    async save() {
      const data = this.editedItem
      const url = `${this.$URL_SERVE}/warehouses/${data.id}`
      const response = await api.update(url, data)
      if (response.status === 200) {
        this.$swal('Editado!!!', response.message, 'success')
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
        this.close()
      } else if (response.errors) {
        const errorsArray = Object.values(response.errors)
        const errors = errorsArray.join('\n')
        this.$swal('Algo no salió bien !!!', errors, 'error')
      } else {
        this.$swal('Algo no salió bien !!!', response.error, 'error')
      }
    },

    // Metodo para limpiar reseatear formulario (limpiar campos)
    // reset() {
    //   this.$refs.form.reset()
    // },

    // Metodo para limpiar validaciones
    // resetValidation() {
    //   this.$refs.form.resetValidation()
    // },

  },
}
</script>
