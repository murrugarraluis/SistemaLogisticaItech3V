<template>
  <div class="d-flex justify-center justify-sm-end">
    <v-dialog
      v-model="dialog"
      scrollable
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
          <span class="white--text text-2xl pa-0"> Agregar {{ table }}</span>
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
                        v-model="search_products"
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
                      <template v-slot:item.actions="{ item }">
                        <!-- <div class="pa-2">
                          <v-checkbox
                            :ref="item.code"
                            :key="item.code"
                            type="checkbox"
                            color="success"
                            @change="toggleMaterial(item, $event)"
                          ></v-checkbox>
                        </div> -->
                        <div class="pa-2">
                          <v-btn
                            color="primary"
                            fab
                            x-small
                            class="ma-1"
                            @click="toggleMaterial(item)"
                          >
                            <v-icon color="white">
                              {{ icons.mdiPlusThick }}
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
import { mdiPlusCircleOutline, mdiPlusThick } from '@mdi/js'
import api from '@/api'

export default {
  // props: {
  //   warehouse: {
  //     type: Number,
  //     default: 1,
  //   },
  // },
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
        text: 'Acciones',
        align: 'end',
        value: 'actions',
        sortable: false,
      },
    ],
    desserts_products: [],

    // Variables para ordenamiento de tabla
    sortBy: 'code',
    sortDesc: true,

    // Variables de busqueda o filtrado
    search_products: '',

    // Iconos
    icons: { mdiPlusCircleOutline, mdiPlusThick },

    // Variable para uso de modal
    dialog: false,
  }),
  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close()
    },

    // async warehouse(val) {
    //   const url = `${this.$URL_SERVE}/warehouses/${val}/materials`
    //   this.desserts_products = []
    //   this.desserts_products = await api.getAll(url)
    //   console.log(this.desserts_products)
    // },
  },
  created() {
    this.getAllMaterials()
  },
  methods: {
    //  Metodo para optener productos
    async getAllMaterials() {
      const url = `${this.$URL_SERVE}/materials`
      this.desserts_products = await api.getAll(url)
    },
    toggleMaterial(item, event) {
      this.$emit('toggleMaterial', item, event)
    },

    // Metodo Para restablecer valores por default
    close() {
      this.dialog = false
    },
  },
}
</script>
