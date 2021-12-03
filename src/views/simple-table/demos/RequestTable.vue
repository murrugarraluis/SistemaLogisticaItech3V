<template>
  <v-card>
    <v-card-text>
      <!--      Modal-->
      <template>
        <div class="d-flex justify-center justify-sm-end">
          <v-dialog
            v-model="dialog"
            width="500"
            persistent
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
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
                          cols="4"
                        >
                          <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                readonly
                                v-bind="attrs"
                                label="Fecha Requerida"
                                :rules="dateRequiredRules"
                                outlined
                                dense
                                :value="computedDateFormattedDatefns"
                                v-on="on"
                                @click:clear="date = null"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.date_required"
                              elevation="15"
                              :min="date_min"
                              @change="menu2 = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col
                          cols="4"
                        >
                          <v-text-field
                            v-model="editedItem.type_request"
                            label="Tipo Requerimiento"
                            :rules="typeRequiredRules"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="4"
                        >
                          <v-select
                            v-model="editedItem.importance"
                            :items="items_importance"
                            label="Importancia"
                            outlined
                            dense
                            :rules="importanceRules"
                          ></v-select>
                        </v-col>
                        <v-col
                          cols="12"
                        >
                          <v-textarea
                            v-model="editedItem.comment"
                            label="Comentario"
                            outlined
                            dense
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-col>
                </v-row>
                <!--                Tabla Detalle-->
                <v-card>
                  <v-card-text>
                    <!--      Modal-->
                    <template>
                      <div class="d-flex justify-center justify-sm-end">
                        <v-dialog
                          v-model="dialogProduct"
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
                                              <!--                                              <v-btn-->
                                              <!--                                                color="#C62828"-->
                                              <!--                                                fab-->
                                              <!--                                                x-small-->
                                              <!--                                                class="ma-1"-->
                                              <!--                                                @click="destroy(item)"-->
                                              <!--                                              >-->
                                              <!--                                                <v-icon color="white">-->
                                              <!--                                                  {{ icons.mdiDelete }}-->
                                              <!--                                                </v-icon>-->
                                              <!--                                              </v-btn>-->
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
                                <!--                                <v-btn-->
                                <!--                                  color="primary"-->
                                <!--                                  class="ma-1"-->
                                <!--                                  @click="save"-->
                                <!--                                >-->
                                <!--                                  Guardar-->
                                <!--                                </v-btn>-->
                                <v-btn
                                  type="reset"
                                  outlined
                                  class="ma-1"
                                  @click="closeProduct"
                                >
                                  cerrar
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
                      :headers="headers_detail"
                      :items="desserts_detail"
                      :search="search_detail"
                      :sort-by.sync="sortBy"
                      :sort-desc.sync="sortDesc"
                    >
                      <template v-slot:item.quantity="{ item }">
                        <v-text-field
                          :key="item.id"
                          :hide-details="true"
                          dense
                          single-line
                          type="number"
                          min="1"
                          value="1"
                        ></v-text-field>
                      </template>

                      <template
                        v-slot:item.actions="{ item }"
                      >
                        <div class="pa-2">
                          <v-btn
                            color="#C62828"
                            fab
                            x-small
                            class="ma-1"
                            @click="removeMaterial(item)"
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
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <div class="w-full d-flex flex-column flex-sm-row justify-sm-end">
                  <v-btn
                    color="primary"
                    class="ma-1"
                    @click="save"
                  >
                    Guardar
                  </v-btn>
                  <v-btn
                    type="reset"
                    outlined
                    class="ma-1"
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
        <template v-slot:item.importance="{ item }">
          <v-chip
            :color="getColor(item.importance)"
          >
            {{ item.importance }}
          </v-chip>
        </template>
        <template
          v-slot:item.actions="{ item }"
        >
          <div class="pa-2">
            <v-btn
              color="#0277BD"
              fab
              x-small
              class="ma-1"
              @click="edit(item)"
            >
              <v-icon color="white">
                {{ icons.mdiEye }}
              </v-icon>
            </v-btn>
            <v-btn
              color="#C62828"
              fab
              x-small
              class="ma-1"
              @click="destroy(item)"
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
  mdiDelete, mdiFileDelimited, mdiFileExcel, mdiFilePdfBox, mdiMagnify, mdiPencil, mdiPlusCircleOutline, mdiEye,
} from '@mdi/js'

import { format, parseISO } from 'date-fns'
import api from '@/api'

export default {
  data: () => ({
    valid: true,
    table: 'Requerimiento',
    uri: 'requests',

    // Variables de uso en tabla
    headers: [
      { text: 'Codigo', align: 'start', value: 'code' },
      { text: 'Fecha Requerida', value: 'date_required' },
      { text: 'Tipo Requerimiento', value: 'type_request' },
      { text: 'Importancia', align: 'center', value: 'importance' },
      {
        text: 'Acciones', align: 'end', value: 'actions', sortable: false,
      },
    ],
    headers_detail: [
      { text: 'Codigo', align: 'start', value: 'code' },
      { text: 'Nombre', value: 'name' },
      { text: 'Unidad de Medida', value: 'measure_unit' },
      {
        text: 'Cantidad', value: 'quantity', width: '10%', sortable: false,
      },
      {
        text: 'Acciones', align: 'end', value: 'actions', sortable: false,
      },
    ],
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
    desserts: [],

    desserts_detail: [],
    desserts_products: [],

    // Variables para ordenamiento de tabla
    sortBy: 'code',
    sortDesc: true,

    // Variables de busqueda o filtrado
    search: '',
    search_detail: '',
    search_products: '',

    // Iconos
    icons: {
      mdiPencil, mdiDelete, mdiMagnify, mdiFileExcel, mdiFileDelimited, mdiFilePdfBox, mdiPlusCircleOutline, mdiEye,
    },

    // Variable para uso de modal
    dialog: true,
    dialogProduct: false,

    // Variable para formulario
    editedItem: {
      date_required: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
      type_request: '',
      importance: '',
      materials: {},
    },
    defaultItem: {
      id: '',
      code: '',
      name: '',
    },
    editedIndex: -1,

    // Reglas de Validacion
    dateRequiredRules: [v => !!v || 'Fecha Requerida es obligatorio'],
    typeRequiredRules: [v => !!v || 'Tipo Requerimiento es obligatorio'],
    importanceRules: [v => !!v || 'Importancia es obligatorio'],

    date: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
    date_min: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
    menu2: false,

    items_importance: [
      'Baja', 'Media', 'Alta',
    ],
    checkbox: true,

  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? `Nuevo ${this.table}` : `Editar ${this.table}`
    },
    computedDateFormattedDatefns() {
      return this.editedItem.date_required ? format(parseISO(this.editedItem.date_required), 'dd/MM/yyyy') : ''
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
    this.getAllMaterials()
  },
  methods: {
    // Metodo para cargar recursos (API)
    async initialize() {
      const url = `${this.$URL_SERVE}/${this.uri}`
      this.desserts = await api.getAll(url)
    },

    // Metodo para abrir modal de editar y capturar data
    edit(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = { ...item }
      this.dialog = true
    },

    // Metodo para guardar cambios(crear o editar)
    async save() {
      if (this.editedIndex > -1) {
        await this.update()
      } else {
        // Object.assign(this.editedItem.materials, { ...this.desserts_detail })
        await this.register()
      }
    },

    // Metodo para crear recurso (API)
    async register() {
      const data = this.editedItem
      const url = `${this.$URL_SERVE}/${this.uri}`
      const validation = this.$refs.form.validate()
      if (validation) {
        // no esta vacio
        if (Object.keys(this.desserts_detail).length !== 0) {
          Object.assign(this.editedItem.materials, { ...this.desserts_detail })
          const response = await api.register(url, data)
          if (response.status === 201) {
            // this.insertItem(response)
            this.$toast.success('Genial')
          } else {
            this.showErrors(response.errors)
          }
        } else {
          this.$toast.error('Debe Agregar al menos un producto')
        }
      }
    },

    // Metodo oara editar recurso (API)
    async update() {
      const data = this.editedItem
      const url = `${this.$URL_SERVE}/${this.uri}/${data.id}`
      const response = await api.update(url, data)
      if (response.status === 200) {
        this.updateItem(response)
      } else if (await this.isDeleted(data.name)) {
        this.restore(data.name)
      } else {
        this.showErrors(response.errors)
      }
    },

    // Metodo para eliminar un recurso (API)
    destroy(item) {
      const { id } = { ...item }
      this.$swal({
        title: '¿Está Seguro?', text: 'Una vez eliminado ya no se podrá recuperar!', icon: 'warning', showCancelButton: true, confirmButtonText: 'Si, Eliminar!', cancelButtonText: 'Cancelar',
      }).then(async result => {
        if (result.isConfirmed) {
          const url = `${this.$URL_SERVE}/${this.uri}/${id}`
          const response = await api.destroy(url)
          if (response.status === 200) {
            this.deleteItem(item, response)
          } else {
            this.showErrors(response.errors)
          }
        }
      })
    },

    // Metodo para saber si un recurso a sido eliminado
    async isDeleted(name) {
      const url = `${this.$URL_SERVE}/${this.uri}/deleted/${name}`
      const response = await api.getDeleted(url)

      return (response.status === 200)
    },

    // Metodo para restaurar un recurso eliminado
    restore(name) {
      this.$swal({
        title: '¿Desea Restaurar?', text: 'Este recurso ha sido eliminado anteriormente', icon: 'warning', showCancelButton: true, confirmButtonText: 'Si, Restaurar!', cancelButtonText: 'Cancelar',
      }).then(async result => {
        if (result.isConfirmed) {
          const url = `${this.$URL_SERVE}/${this.uri}/deleted/${name}/restore`
          const response = await api.restore(url)
          if (response.status === 200) {
            this.insertItem(response)
          } else {
            this.showErrors(response.errors)
          }
        }
      })
    },

    // Metodo para insertar Item
    insertItem(response) {
      this.desserts.push(response.data)
      this.close()
      this.showMessage(response.message)
    },

    // Metodo para Actualizar Item
    updateItem(response) {
      Object.assign(this.desserts[this.editedIndex], response.data)
      this.close()
      this.showMessage(response.message)
    },

    // Metodo para Eliminar Item
    deleteItem(item, response) {
      const index = this.desserts.indexOf(item)
      this.desserts.splice(index, 1)
      this.showMessage(response.message)
    },

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
      this.reset()
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },

    // Metodo Para restablecer valores por default
    closeProduct() {
      this.dialogProduct = false
    },

    // Metodo para limpiar reseatear formulario (limpiar campos)
    reset() {
      this.$refs.form.reset()
    },

    // Metodo para limpiar validaciones
    resetValidation() {
      this.$refs.form.resetValidation()
    },

    // Metodo para Obternet color de IMportancia
    getColor(importance) {
      if (importance.toLowerCase() === 'alta') return '#C62828'
      if (importance.toLowerCase() === 'media') return '#FFAB40'

      return '#00897B'
    },

    //  Metodo para optener productos
    async getAllMaterials() {
      const url = `${this.$URL_SERVE}/materials`
      this.desserts_products = await api.getAll(url)
    },
    toggleMaterial(item, event) {
      if (event) {
        this.addMaterial(item)
      } else {
        this.removeMaterial(item)
      }
    },
    addMaterial(item) {
      const data = { ...item }
      this.desserts_detail.push(data)
    },
    removeMaterial(item) {
      const index = this.desserts_detail.findIndex(val => val.name === item.name)
      this.desserts_detail.splice(index, 1)
    },
  },
}
</script>
