<template>
  <div class="d-flex justify-center justify-sm-end">
    <v-dialog
      v-model="dialog"
      width="900"
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
            Agregar {{ table }}
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
                class="multi-col-validation"
                lazy-validation
              >
                <!--    Columnas de Inputs-->
                <v-card>
                  <v-card-text>
                    <!--      Encabezado de Tabla-->
                    <v-card-title class="d-flex flex-column justify-center flex-sm-row">
                      <v-text-field
                        v-model="search"
                        :append-icon="icons.mdiMagnify"
                        label="Buscar"
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-card-title>
                    <!--      Tabla-->
                    <v-data-table
                      :headers="headers_products"
                      :items="desserts_products"
                      :search="search_products"
                      :sort-by.sync="sortBy"
                      :sort-desc.sync="sortDesc"
                    >
                      <template
                        v-slot:item.actions="{ item }"
                      >
                        <div class="pa-2">
                          <v-checkbox
                            :ref="item.code"
                            :key="item.code"
                            type="checkbox"
                            color="success"
                            @change="toggleMaterial(item,$event)"
                          ></v-checkbox>
                        </div>
                      </template>
                      <template v-slot:no-data>
                        No hay datos disponibles
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="w-full d-flex flex-column flex-sm-row justify-sm-end">
            <v-btn
              type="reset"
              outlined
              class="ma-1"
              @click="close"
            >
              cerrar
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  mdiDelete, mdiFileDelimited, mdiFileExcel, mdiFilePdfBox, mdiMagnify, mdiPencil, mdiPlusCircleOutline, mdiEye,
} from '@mdi/js'
import api from '@/api'

export default {
  data: () => ({
    valid: true,
    table: 'Producto',
    uri: 'materials',

    // Variables de uso en tabla
    headers_products: [
      { text: 'Codigo', align: 'start', value: 'code' },
      { text: 'Nombre', value: 'name' },
      { text: 'Unidad de Medida', value: 'measure_unit' },
      { text: 'Categoria', align: 'center', value: 'category' },
      { text: 'Marca', align: 'center', value: 'mark' },
      {
        text: 'Acciones', align: 'end', value: 'actions', sortable: false,
      },
    ],
    desserts_products: [],

    // Variables para ordenamiento de tabla
    sortBy: 'code',
    sortDesc: true,

    // Variables de busqueda o filtrado
    search_products: '',

    // Iconos
    icons: {
      mdiPencil, mdiDelete, mdiMagnify, mdiFileExcel, mdiFileDelimited, mdiFilePdfBox, mdiPlusCircleOutline, mdiEye,
    },

    // Variable para uso de modal
    dialog: false,

  }),
  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close()
    },
  },
  created() {
    this.getAllMaterials()
  },
  methods: {
    // Metodo para mostrar en Toast Mensaje
    showMessage(message) {
      this.$toast.success(message)
    },

    // Metodo para mostrar en Toast Errors
    showErrors(errors) {
      const errorsArray = Object.values(errors)
      const errosList = errorsArray.join('\n')
      this.$toast.error(errosList)
    },

    // Metodo Para restablecer valores por default
    close() {
      this.dialog = false
    },

    //  Metodo para optener productos
    async getAllMaterials() {
      const url = `${this.$URL_SERVE}/materials`
      this.desserts_products = await api.getAll(url)
    },
    toggleMaterial(item, event) {
      this.$emit('toggleMaterial', item, event)
    },
  },
}
</script>
