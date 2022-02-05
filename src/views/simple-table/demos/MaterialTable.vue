<template>
  <v-card>
    <v-card-text>
      <span>Tiempo de registro de material: {{time_diff}} segundos </span>
      <!--      Modal-->
      <template>
        <div class="d-flex justify-center justify-sm-end">
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            persistent
            transition="dialog-bottom-transition"
            width="500"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mb-2"
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                @click="startTime()"
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

              <v-card-text class="pa-6">
                <v-row>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-card class="pa-4">
                      <v-row class-name="match-height">
                        <v-col cols="12">
                          <!-- Formulario-->
                          <div class="d-flex justify-center justify-md-start">
                            <h3 class="py-4">
                              Datos {{ table }}
                            </h3>
                          </div>
                          <v-form
                            ref="form"
                            v-model="valid"
                            class="multi-col-validation"
                            lazy-validation
                          >
                            <!--    Columnas de Inputs-->
                            <v-row>
                              <v-col cols="12">
                                <v-text-field
                                  v-model="editedItem.name"
                                  :rules="nameRules"
                                  dense
                                  label="Nombre"
                                  outlined
                                  :disabled="editedIndex === -2"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-select
                                  v-model="editedItem.category"
                                  :items="items_category"
                                  :rules="categoryRules"
                                  item-text="name"
                                  item-value="id"
                                  dense
                                  label="Categoria"
                                  outlined
                                  :disabled="editedIndex === -2"
                                >
                                </v-select>
                              </v-col>
                              <v-col cols="12">
                                <v-select
                                  v-model="editedItem.mark"
                                  :items="items_mark"
                                  :rules="markRules"
                                  item-text="name"
                                  item-value="id"
                                  dense
                                  label="Marca"
                                  outlined
                                  :disabled="editedIndex === -2"
                                ></v-select>
                              </v-col>
                              <v-col cols="12">
                                <v-select
                                  v-model="editedItem.measure_unit"
                                  :items="items_measure_unit"
                                  :rules="measureUnitRules"
                                  item-text="name"
                                  item-value="id"
                                  dense
                                  label="Unidad de Medida"
                                  outlined
                                  :disabled="editedIndex === -2"
                                ></v-select>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  v-model="editedItem.minimum_stock"
                                  :rules="minimumStockRules"
                                  dense
                                  label="Stock Minimo"
                                  outlined
                                  type="number"
                                  min="0"
                                  oninput="validity.valid||(value='0');"
                                  :disabled="editedIndex === -2"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-form>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                  <v-col
                    cols="12"
                    md="8"
                  >
                    <!--                Tabla Detalle-->
                    <v-card class="pa-4">
                      <!--      Modal-->
                      <template>
                        <div
                          class="d-flex flex-column justify-center align-center flex-md-row justify-md-space-between"
                        >
                          <h3 class="py-4">
                            {{ table }} en Almacen
                          </h3>
                        </div>
                      </template>
                      <!--      Encabezado de Tabla-->
                      <v-card-title class="d-flex flex-column justify-center flex-sm-row">
                      </v-card-title>
                      <!--      Tabla-->
                      <v-data-table
                        :headers="headers_detail"
                        :items="desserts_detail"
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
                            min="0"
                            :value="item.quantity > -1 ? item.quantity:0"
                            oninput="validity.valid||(value='0');"
                            :disabled="editedIndex === -2"
                            @change="setQuantityItem($event,item)"
                          ></v-text-field>
                        </template>

                        <template v-slot:item.actions="{ item }">
                          <div class="pa-2">
                            <v-btn
                              class="ma-1"
                              color="#C62828"
                              fab
                              x-small
                              :disabled="editedIndex === -2"
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
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <div class="w-full d-flex flex-column flex-sm-row justify-sm-end">
                  <v-btn
                    class="ma-1"
                    color="primary"
                    @click="save"
                  >
                    {{ editedIndex !== -2 ? 'Guardar' : 'Imprimir' }}
                  </v-btn>
                  <v-btn
                    class="ma-1"
                    outlined
                    type="reset"
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
          hide-details
          label="Buscar"
          single-line
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
          <div class="pa-2">
            <v-btn
              color="#0277BD"
              fab
              x-small
              class="ma-1"
              @click="view(item)"
            >
              <v-icon color="white">
                {{ icons.mdiEye }}
              </v-icon>
            </v-btn>
            <v-btn
              class="ma-1"
              color="#F9A825"
              fab
              x-small
              @click="edit(item)"
            >
              <v-icon color="white">
                {{ icons.mdiPencil }}
              </v-icon>
            </v-btn>
            <v-btn
              class="ma-1"
              color="#C62828"
              fab
              x-small
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
  mdiDelete,
  mdiFileDelimited,
  mdiFileExcel,
  mdiFilePdfBox,
  mdiMagnify,
  mdiPencil,
  mdiPlusCircleOutline,
  mdiEye,
} from '@mdi/js'

import api from '@/api'

export default {
  data: () => ({
    valid: true,
    table: 'Material',
    uri: 'materials',

    // Variables de uso en tabla
    headers: [
      { text: 'Codigo', align: 'start', value: 'code' },
      { text: 'Nombre', value: 'name' },
      { text: 'Categoria', align: 'center', value: 'category' },
      { text: 'Marca', align: 'center', value: 'mark' },
      { text: 'Unidad de Medida', value: 'measure_unit' },
      { text: 'Stock Minimo', value: 'minimum_stock' },
      { text: 'Stock Actual', value: 'stock' },
      {
        text: 'Acciones',
        align: 'end',
        value: 'actions',
        sortable: false,
      },
    ],
    headers_detail: [
      { text: 'Codigo', align: 'start', value: 'code' },
      { text: 'Nombre', value: 'name' },
      {
        text: 'Cantidad', value: 'quantity', width: '5%', sortable: false,
      },
    ],
    desserts: [],
    desserts_detail: [],

    // Variables para ordenamiento de tabla
    sortBy: 'code',
    sortDesc: true,

    // Variables de busqueda o filtrado
    search: '',

    // Iconos
    icons: {
      mdiPencil,
      mdiDelete,
      mdiMagnify,
      mdiFileExcel,
      mdiFileDelimited,
      mdiFilePdfBox,
      mdiPlusCircleOutline,
      mdiEye,
    },

    // Variable para uso de modal
    dialog: false,

    // Variable para formulario
    editedItem: {
      id: '',
      code: '',
      name: '',
      category: '',
      mark: '',
      measure_unit: '',
      minimum_stock: '',
      warehouses: {},
    },
    defaultItem: {
      id: '',
      code: '',
      name: '',
      category: '',
      mark: '',
      measure_unit: '',
      minimum_stock: '',
      warehouses: {},
    },
    editedIndex: -1,

    // Reglas de Validacion
    nameRules: [v => !!v || 'Nombre es obligatorio'],
    categoryRules: [v => !!v || 'Categoria es obligatorio'],
    markRules: [v => !!v || 'Marca es obligatorio'],
    measureUnitRules: [v => !!v || 'Unidad de Medida es obligatorio'],
    minimumStockRules: [v => !!v || 'Stock Minimo es obligatorio'],

    items_category: [],
    items_mark: [],
    items_measure_unit: [],

    // Calculo de Tiempos (TIMER)
    time1: '',
    time2: '',
    time_diff: 0,
  }),
  computed: {
    formTitle() {
      if (this.editedIndex === -1) return `Nuevo ${this.table}`
      if (this.editedIndex === -2) return `Información ${this.table}`

      return `Editar ${this.table}`
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
    this.getCategories()
    this.getMarks()
    this.getMeasureUnits()
    this.getWarehouses()
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
      this.editedItem.category = this.getIdItemCategory(item)
      this.editedItem.mark = this.getIdItemMark(item)
      this.editedItem.measure_unit = this.getIdItemMeasureUnit(item)
      this.desserts_detail = item.warehouses
      this.dialog = true
    },

    // Metodo para abrir modal de editar y capturar data
    view(item) {
      // -2 es el valor para activar el modo view en campos y botones
      this.editedIndex = -2
      this.editedItem = { ...item }
      this.editedItem.category = this.getIdItemCategory(item)
      this.editedItem.mark = this.getIdItemMark(item)
      this.editedItem.measure_unit = this.getIdItemMeasureUnit(item)
      this.desserts_detail = item.warehouses
      this.dialog = true
    },
    getIdItemCategory(item) {
      const index = this.items_category.findIndex(val => val.name === item.category)

      return this.items_category[index].id
    },
    getIdItemMark(item) {
      const index = this.items_mark.findIndex(val => val.name === item.mark)

      return this.items_mark[index].id
    },
    getIdItemMeasureUnit(item) {
      const index = this.items_measure_unit.findIndex(val => val.name === item.measure_unit)

      return this.items_measure_unit[index].id
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
      const data = this.editedItem
      const url = `${this.$URL_SERVE}/${this.uri}`
      const validation = this.$refs.form.validate()
      if (validation) {
        Object.assign(this.editedItem.warehouses, { ...this.desserts_detail })
        const response = await api.register(url, data)
        if (response.status === 201) {
          this.insertItem(response)
          this.getElapsedTime()
        } else if (await this.isDeleted(data.name)) {
          this.restore(data.name)
        } else {
          this.showErrors(response.errors)
        }
      }
    },
    getElapsedTime() {
      this.time2 = new Date().getTime()
      this.time_diff = (this.time2 - this.time1) / 1000
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
        title: '¿Está Seguro?',
        text: 'Una vez eliminado ya no se podrá recuperar!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminar!',
        cancelButtonText: 'Cancelar',
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

      return response.status === 200
    },

    // Metodo para restaurar un recurso eliminado
    restore(name) {
      this.$swal({
        title: '¿Desea Restaurar?',
        text: 'Este recurso ha sido eliminado anteriormente',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Restaurar!',
        cancelButtonText: 'Cancelar',
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
        this.getWarehouses()
        this.editedIndex = -1
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

    async getCategories() {
      const url = `${this.$URL_SERVE}/categories`
      this.items_category = await api.getAll(url)
    },
    async getMarks() {
      const url = `${this.$URL_SERVE}/marks`
      this.items_mark = await api.getAll(url)
    },
    async getMeasureUnits() {
      const url = `${this.$URL_SERVE}/measure-units`
      this.items_measure_unit = await api.getAll(url)
    },
    async getWarehouses() {
      const url = `${this.$URL_SERVE}/warehouses`
      this.desserts_detail = await api.getAll(url)
    },

    // Metodo para insertar detalle de cantidad a data (editItem)
    setQuantityItem(event, item) {
      const index = this.desserts_detail.findIndex(val => val.name === item.name)
      this.desserts_detail[index].quantity = event
    },
    startTime() {
      this.time1 = new Date().getTime()
    },
  },
}
</script>
