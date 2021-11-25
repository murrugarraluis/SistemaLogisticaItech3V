<template>
  <v-card>
    <v-card-text>
      <!--      Modal-->
      <template>
        <div class="d-flex justify-center justify-sm-end">
          <v-dialog
            v-model="dialog"
            width="500"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon class="mr-1">
                  {{ icons.mdiPlusCircleOutline }}
                </v-icon>
                Agregar
              </v-btn>
            </template>
            <!--            Contenido Modal-->
            <v-card>
              <v-card-title class="primary">
                <span class="white--text text-2xl pa-0">
                  {{ formTitle }}
                </span>
              </v-card-title>

              <v-card-text>
                <v-row
                  class-name="match-height"
                  class="py-8"
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
                            :rules="nameRules"
                            outlined
                            dense
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
        <template
          v-slot:item.actions="{ item }"
        >
          <div class="pa-2">
            <v-btn
              color="#F9A825"
              fab
              x-small
              class="ma-1"
              @click="editItem(item)"
            >
              <v-icon color="white">
                {{ icons.mdiPencil }}
              </v-icon>
            </v-btn>
            <v-btn
              color="#C62828"
              fab
              x-small
              class="ma-1"
              @click="deleteItem(item)"
            >
              <v-icon color="white">
                {{ icons.mdiDelete }}
              </v-icon>
            </v-btn>
          </div>
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
  mdiDelete, mdiFileDelimited, mdiFileExcel, mdiFilePdfBox, mdiMagnify, mdiPencil, mdiPlusCircleOutline,
} from '@mdi/js'

import api from '@/api'

export default {
  data: () => ({
    valid: true,
    table: 'Almacen',
    uri: 'warehouses',

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
      mdiPencil, mdiDelete, mdiMagnify, mdiFileExcel, mdiFileDelimited, mdiFilePdfBox, mdiPlusCircleOutline,
    },

    // Variable para uso de modal
    dialog: false,

    // Variable para formulario
    editedItem: {},
    defaultItem: {
      id: '',
      code: '',
      name: '',
      description: '',
    },
    editedIndex: -1,

    // Reglas de Validacion
    nameRules: [v => !!v || 'Nombre es obligatorio'],

  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? `Nuevo ${this.table}` : `Editar ${this.table}`
    },
  },
  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close()
    },
  },
  created() {
    this.initialize()
  },
  methods: {
    // Metodo para cargar recursos (API)
    async initialize() {
      const url = `${this.$URL_SERVE}/${this.uri}`
      this.desserts = await api.getAll(url)
    },

    // Metodo para abrir modal de editar y capturar data
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = { ...item }
      this.dialog = true
    },

    // Metodo para guardar cambios(crear o editar)
    async save() {
      if (this.editedIndex > -1) {
        await this.update()
      } else {
        await this.register()
      }
    },

    // Metodo para crear recurso (API)
    async register() {
      const url = `${this.$URL_SERVE}/${this.uri}`
      const validation = this.$refs.form.validate()
      if (validation) {
        const response = await api.save(url, this.editedItem)
        if (response.status === 201) {
          const { data } = response
          this.desserts.push(data)
          this.close()
          this.$toast.success(response.message)
        } else {
          const errorsArray = Object.values(response.errors)
          const errors = errorsArray.join('\n')
          this.$toast.error(errors)
        }
      }
    },

    // Metodo oara editar recurso (API)
    async update() {
      const data = this.editedItem
      const url = `${this.$URL_SERVE}/${this.uri}/${data.id}`
      const response = await api.update(url, data)
      if (response.status === 200) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
        this.close()
        this.$toast.success(response.message)
      } else if (response.errors) {
        const errorsArray = Object.values(response.errors)
        const errors = errorsArray.join('\n')
        this.$toast.error(errors)
      } else {
        this.$toast.error(response.error)
      }
    },

    // Metodo Para restablecer valores por default
    close() {
      this.reset()
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },

    // Metodo para eliminar un recurso (API)
    deleteItem(item) {
      const index = this.desserts.indexOf(item)
      const { id } = { ...item }
      this.$swal({
        title: '¿Está Seguro?', text: 'Una vez eliminado ya no se podrá recuperar!', icon: 'warning', showCancelButton: true, confirmButtonText: 'Si, Eliminar!', cancelButtonText: 'Cancelar',
      }).then(async result => {
        if (result.isConfirmed) {
          const url = `${this.$URL_SERVE}/${this.uri}/${id}`
          const response = await api.destroy(url)
          if (response.status === 200) {
            this.desserts.splice(index, 1)
            this.$toast.success(response.message)
          } else {
            this.$toast.error(response.error)
          }
        }
      })
    },

    // Metodo para limpiar reseatear formulario (limpiar campos)
    reset() {
      this.$refs.form.reset()
    },

    // Metodo para limpiar validaciones
    resetValidation() {
      this.$refs.form.resetValidation()
    },

  },
}
</script>
