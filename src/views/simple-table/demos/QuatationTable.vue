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
                                <v-autocomplete
                                  v-model="editedItem.supplier"
                                  :items="items_suppliers"
                                  label="Proveedor"
                                  item-text="fullname"
                                  item-value="id"
                                  :rules="supplierRules"
                                  outlined
                                  dense
                                  :disabled="editedIndex !== -1"
                                ></v-autocomplete>
                              </v-col>
                              <v-col cols="12">
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
                                      label="Fecha"
                                      :rules="dateRequiredRules"
                                      outlined
                                      dense
                                      :value="computedDateFormattedDatefns"
                                      :disabled="editedIndex !== -1"
                                      v-on="on"
                                      @click:clear="date = null"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="editedItem.date_agreed"
                                    elevation="15"
                                    :min="date_min"
                                    @change="menu2 = false"
                                  ></v-date-picker>
                                </v-menu>
                              </v-col>
                              <v-col cols="12">
                                <v-select
                                  v-model="editedItem.way_to_pay"
                                  :items="items_way_to_pay"
                                  label="Forma Pago"
                                  outlined
                                  dense
                                  :rules="wayToPayRules"
                                  :disabled="editedIndex !== -1"
                                ></v-select>
                              </v-col>
                              <v-col cols="12">
                                <v-select
                                  v-model="editedItem.type_quotation"
                                  :items="items_type_exit"
                                  label="Tipo Cotizacion"
                                  outlined
                                  dense
                                  :rules="typeQuotationRules"
                                  :disabled="editedIndex !== -1"
                                ></v-select>
                              </v-col>
                              <v-col cols="12">
                                <div class="d-flex flex-row">
                                  <!-- <v-text-field
                                    v-if="editedItem.type_quotation === 'Por Requerimiento'"
                                    v-model="editedItem.document_number"
                                    label="Numero Documento"
                                    :rules="documentnumberRules"
                                    outlined
                                    dense
                                    :disabled="editedIndex !== -1"
                                  ></v-text-field> -->
                                  <v-autocomplete
                                    v-if="editedItem.type_quotation === 'Por Requerimiento'"
                                    v-model="editedItem.document_number"
                                    :items="items_requests"
                                    label="Numero Documento"
                                    item-text="code"
                                    item-value="id"
                                    :rules="documentnumberRules"
                                    outlined
                                    dense
                                    :disabled="editedIndex !== -1"
                                  ></v-autocomplete>
                                  <!-- <v-btn
                                    v-if="editedItem.type_exit === 'Por Requerimiento'"
                                    color="primary"
                                    dark
                                    elevation="2"
                                    min-width="0"
                                  >
                                    <v-icon>
                                      {{ icons.mdiMagnify }}
                                    </v-icon>
                                  </v-btn> -->
                                </div>
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
                            Detalle {{ table }}
                          </h3>
                          <add-product-dialog
                            v-if="editedIndex === -1"
                            :warehouse="editedItem.warehouse"
                            @toggleMaterial="toggleMaterial"
                          ></add-product-dialog>
                        </div>
                      </template>
                      <div>
                        <div class="d-flex justify-center">
                          <span class="font-weight-black display-1">S/{{ calcTotalQuotation() }}</span>
                        </div>
                      </div>
                      <!--      Encabezado de Tabla-->
                      <v-card-title class="d-flex flex-column justify-center flex-sm-row">
                        <v-text-field
                          v-model="search_detail"
                          :append-icon="icons.mdiMagnify"
                          label="Buscar"
                          single-line
                          hide-details
                        ></v-text-field>
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
                            v-model="item.quantity"
                            :hide-details="true"
                            dense
                            single-line
                            type="number"
                            min="1"
                            :value="item.quantity > 0 ? item.quantity : 1"
                            :disabled="editedIndex !== -1"
                            oninput="validity.valid||(value='1');"
                          ></v-text-field>
                        </template>
                        <template v-slot:item.price="{ item }">
                          <v-text-field
                            v-model="item.price"
                            :hide-details="true"
                            dense
                            single-line
                            type="number"
                            min="0"
                            :value="item.price > 0 ? item.price : 0.0"
                            :disabled="editedIndex !== -1"
                          ></v-text-field>
                        </template>
                        <template v-slot:item.total="{ item }">
                          {{ calcTotal(item) }}
                        </template>

                        <template v-slot:item.actions="{ item }">
                          <div class="pa-2">
                            <v-btn
                              color="#C62828"
                              fab
                              x-small
                              class="ma-1"
                              :disabled="editedIndex !== -1"
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
                    color="primary"
                    class="ma-1"
                    @click="save"
                  >
                    {{ editedIndex === -1 ? 'Guardar' : 'Imprimir' }}
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
      <div class="d-flex flex-column justify-center align-center align-sm-start px-5">
        <!-- <v-select
          v-model="select_status"
          :items="items_status_request"
          label="Estado"
          style="max-width: 170px"
          hide-details
        ></v-select> -->
        <!-- <v-switch
          v-if="canRoleLogistics || canRoleWarehouse"
          v-model="switch_my_request"/
          label="Mis Requerimientos"
          color="primary"
          value="Mis Requerimientos"
          hide-details
        ></v-switch> -->
        <!-- <v-switch
          v-if="!switch_my_request && canRoleLogistics"
          v-model="switch_purchase"
          label="Para Compra"
          color="primary"
          value="Para Compra"
          hide-details
        ></v-switch> -->
      </div>
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

          <v-btn
            elevation="0"
            @click="generatePDF()"
          >
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
        <!-- <template v-slot:item.importance="{ item }">
          <span :class="getColorImportance(item.importance)"> {{ item.importance }}</span>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip :color="getColorStatus(item.status)">
            {{ item.status }}
          </v-chip>
        </template> -->
        <template v-slot:item.actions="{ item }">
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
  mdiDelete,
  mdiFileDelimited,
  mdiFileExcel,
  mdiFilePdfBox,
  mdiMagnify,
  mdiPencil,
  mdiPlusCircleOutline,
  mdiEye,
  mdiSend,
  mdiBookCheckOutline,
} from '@mdi/js'
import { format, parseISO } from 'date-fns'
import AddProductDialog from '@/views/dialog/AddProductDialog.vue'
import api from '@/api'
import generatePDF from '@/reports/jsPDF/jsPDF'

export default {
  components: {
    AddProductDialog,
  },
  data: () => ({
    valid: true,
    table: 'Cotizaciones',
    uri: 'quotations',

    // Variables de uso en tabla
    headers: [
      { text: 'Codigo', align: 'start', value: 'code' },
      { text: 'Fecha', value: 'date' },
      { text: 'Fecha Pactada', value: 'date_agreed' },
      { text: 'Forma Pago', value: 'way_to_pay' },
      { text: 'Proveedor', value: 'supplier' },
      { text: 'Estado', value: 'status' },
      { text: 'Total', value: 'total_amount' },

      // { text: 'Importancia', align: 'center', value: 'importance' },
      // { text: 'Estado', align: 'center', value: 'status' },
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
      { text: 'Unidad de Medida', value: 'measure_unit' },
      {
        text: 'Cantidad',
        value: 'quantity',
        width: '5%',
        sortable: false,
      },
      {
        text: 'Precio',
        value: 'price',
        width: '14%',
        sortable: false,
      },
      {
        text: 'Total',
        value: 'total',
        width: '14%',
        sortable: false,
      },
      {
        text: 'Acciones',
        align: 'end',
        value: 'actions',
        sortable: false,
      },
    ],
    desserts_global: [],
    desserts_global_my_data: [],
    desserts: [],
    desserts_detail: [],
    items_way_to_pay: ['Contado', 'Mensual', 'Semanal'],

    items_warehouse: [],

    // Variables para ordenamiento de tabla
    sortBy: 'code',
    sortDesc: true,

    // Variables de busqueda o filtrado
    search: '',
    search_detail: '',
    select_status: 'Pendiente',

    switch_my_request: false,
    switch_purchase: false,

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
      mdiSend,
      mdiBookCheckOutline,
    },

    // Variable para uso de modal
    dialog: false,

    // Variable para formulario
    editedItem: {
      id: '',
      date: '',
      date_agreed: '',
      supplier: '',
      way_to_pay: '',
      type_quotation: '',
      document_number: '',
      materials: {},
      total_amount: 0,
    },
    defaultItem: {
      id: '',
      date: '',
      date_agreed: '',
      supplier: '',
      way_to_pay: '',
      type_quotation: '',
      document_number: '',
      materials: {},
      total_amount: 0,
    },
    editedIndex: -1,

    // Reglas de Validacion
    supplierRules: [v => !!v || 'Proveedor es obligatorio'],
    dateRequiredRules: [v => !!v || 'Fecha es obligatorio'],
    wayToPayRules: [v => !!v || 'Forma Pago es obligatorio'],
    typeQuotationRules: [v => !!v || 'Tipo Cotizacion es obligatorio'],
    documentnumberRules: [v => !!v || 'Numero Documento es obligatorio'],

    date: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
    date_min: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
    menu2: false,

    items_type_exit: ['Por Requerimiento', 'Por Producto'],
    items_suppliers: [],
    items_requests: [],
    roles: localStorage.getItem('roles'),
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? `Nuevo ${this.table}` : `Informacion ${this.table}`
    },
    computedDateFormattedDatefns() {
      return this.editedItem.date_agreed ? format(parseISO(this.editedItem.date_agreed), 'dd/MM/yyyy') : ''
    },
    canRoleLogistics() {
      return this.roles.includes('logistics')
    },
    canRoleWarehouse() {
      return this.roles.includes('warehouse')
    },
  },
  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close()
    },

    select_status() {
      if (this.switch_my_request || (!this.canRoleWarehouse && !this.canRoleLogistics)) {
        this.desserts = this.desserts_global_my_data.filter(item => item.status === this.select_status)
      } else if (this.canRoleLogistics) {
        this.desserts = this.desserts_global.filter(
          item => item.status === this.select_status
            && item.type_request !== 'Para Logistica'
            && item.type_request !== 'Para Compra',
        )
      } else {
        this.desserts = this.desserts_global.filter(item => item.status === this.select_status)
      }
    },
    switch_my_request(val) {
      if (val) {
        this.desserts = this.desserts_global_my_data.filter(item => item.status === this.select_status)
      } else if (this.canRoleLogistics) {
        this.desserts = this.desserts_global.filter(
          item => item.status === this.select_status
            && item.type_request !== 'Para Logistica'
            && item.type_request !== 'Para Compra',
        )
      } else {
        this.desserts = this.desserts_global.filter(item => item.status === this.select_status)
      }
    },
    switch_purchase(val) {
      if (val) {
        this.desserts = this.desserts_global.filter(
          item => item.status === this.select_status && item.type_request === 'Para Compra',
        )
      } else {
        this.desserts = this.desserts_global.filter(
          item => item.status === this.select_status
            && item.type_request !== 'Para Logistica'
            && item.type_request !== 'Para Compra',
        )
      }
    },

    'editedItem.warehouse': function () {
      if (this.editedIndex === -1) {
        this.desserts_detail = []
      }
    },

    desserts_detail: {
      handler(val) {
        let total = 0
        val.forEach(item => {
          total += item.total
        })
        this.editedItem.total_amount = total
      },
      deep: true,
    },

    // desserts_detail: {
    //   handler(val) {
    //     const vm = this
    //     val.filter((p, idx) => Object.keys(p).some(prop => {
    //       const diff = p[prop] !== vm.desserts_detail[idx][prop]
    //       if (diff) {
    //         vm.desserts_detail[idx][prop] = p[prop]
    //       }
    //     }))
    //   },
    //   deep: true,
    // },
  },
  created() {
    this.initialize()
    this.getAllSuppliers()
    this.getAllRequests()
  },
  methods: {
    // Metodo para cargar recursos (API)
    async initialize() {
      const url = `${this.$URL_SERVE}/${this.uri}/`
      this.desserts = await api.getAll(url)
    },

    // Metodo para abrir modal de editar y capturar data
    edit(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = { ...item }
      this.desserts_detail = item.materials
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
      const data = this.editedItem
      const url = `${this.$URL_SERVE}/${this.uri}`
      const validation = this.$refs.form.validate()
      if (validation) {
        // no esta vacio
        if (Object.keys(this.desserts_detail).length !== 0) {
          Object.assign(this.editedItem.materials, { ...this.desserts_detail })
          const response = await api.register(url, data)
          if (response.status === 201) {
            this.insertItem(response)
          } else {
            console.log(response)

            // this.showErrors(response.errors)
          }
        } else {
          this.$toast.error('Debe Agregar al menos un producto')
        }
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

            // this.getAllMaterials()
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

    // Metodo para Enviar Requerimiento a almacen
    async sendToWarehouse(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = { ...item }
      const data = this.editedItem

      const json = {
        status: 'Pendiente',
        status_message: 'Enviado a Almacen',
      }

      const url = `${this.$URL_SERVE}/${this.uri}/${data.id}/change-status`
      const response = await api.updatePatch(url, json)

      if (response.status === 200) {
        this.updateItem(response)
      } else {
        this.showErrors(response.errors)
      }
    },

    // Metodo para Evaluar Requerimiento
    async evaluateRequest(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = { ...item }
      const data = this.editedItem
      const url = `${this.$URL_SERVE}/${this.uri}/${data.id}/evaluate`
      const response = await api.get(url)
      if (response.status === 200) {
        this.showConfirmation(response.message, response.data)
      } else {
        this.showErrors(response.errors)
      }
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

    showConfirmation(message, data) {
      if (message === 'Requerimiento Satisfecho') {
        // Mostrar Confirmacion a nota de salida
        this.confirmationNewExitNote(data)
      } else {
        // Mostrar Confirmacion a nota de salida a Nuevo Requerimiento
        this.confirmationNewRequest(data)
      }
    },
    confirmationNewExitNote() {
      this.$swal({
        title: '¿Desea Crear una Nueva Nota de Salida?',
        text: 'Requerimiento Satisfecho',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Si, Crear!',
        cancelButtonText: 'Cancelar',
      }).then(async result => {
        if (result.isConfirmed) {
          // Redirigiri a nueva nota de salida
        }
      })
    },
    confirmationNewRequest(data) {
      this.$swal({
        title: '¿Desea Crear una Nuevo Requerimiento de Compra?',
        text: 'Requerimiento Insatisfecho',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Crear!',
        cancelButtonText: 'Cancelar',
      }).then(async result => {
        if (result.isConfirmed) {
          // Redirigiri a nuevo Requerimiento
          this.desserts_detail = []
          this.editedItem = { ...this.defaultItem }
          this.editedIndex = -1
          this.desserts_detail = data
          this.dialog = true
        }
      })
    },

    // Metodo Para restablecer valores por default
    close() {
      this.reset()
      this.dialog = false
      this.$nextTick(() => {
        this.desserts_detail = []
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
    getColorImportance(importance) {
      if (importance.toLowerCase() === 'alta') return 'color-importance--red'
      if (importance.toLowerCase() === 'media') return 'color-importance--yellow'

      return 'color-importance--green'
    },

    // Metodo para Obternet color de IMportancia
    // getColorStatus(status) {
    //   if (status.toLowerCase() === 'pendiente') return '#FFC400'

    //   return '#00897B'
    // },

    //  Metodo para optener productos
    async getAllSuppliers() {
      const url = `${this.$URL_SERVE}/suppliers`
      this.items_suppliers = await api.getAll(url)
    },

    //  Metodo para optener productos
    async getAllRequests() {
      const url = `${this.$URL_SERVE}/requests`
      this.items_requests = await api.getAll(url)
    },
    toggleMaterial(item) {
      const existMaterial = this.desserts_detail.findIndex(val => val.code === item.code)
      if (existMaterial === -1) {
        this.addMaterial(item)
      } else {
        this.$toast.error('El Material ya esta en lista')
      }
    },
    addMaterial(item) {
      const data = { ...item }
      data.quantity = 1
      this.desserts_detail.push(data)
    },
    removeMaterial(item) {
      const index = this.desserts_detail.findIndex(val => val.name === item.name)
      this.desserts_detail.splice(index, 1)
    },

    // Metodo para insertar detalle de cantidad a data (editItem)
    setQuantityItem(event, item) {
      const index = this.desserts_detail.findIndex(val => val.name === item.name)
      this.desserts_detail[index].quantity = event
    },

    generatePDF() {
      // Default export is a4 paper, portrait, using millimeters for units
      const name = `${this.table}s`
      const columns = [
        { header: 'Codigo', dataKey: 'code' },
        { header: 'Fecha Requerida', dataKey: 'date_required' },
        { header: 'Tipo Requerimiento', dataKey: 'type_request' },
        { header: 'Importancia', dataKey: 'importance' },
        { header: 'Estado', dataKey: 'status' },
      ]
      const data = this.desserts
      generatePDF.report(name, columns, data)
    },
    calcTotal(item) {
      const total = item.price * item.quantity
      const index = this.desserts_detail.findIndex(val => val.name === item.name)
      this.desserts_detail[index].total = total

      return total
    },
    calcTotalQuotation() {
      return this.editedItem.total_amount > 0 ? this.editedItem.total_amount : 0
    },
  },
}
</script>
<style scoped>
.color-importance--red {
  color: #b71c1c;
  font-weight: 600;
}
.color-importance--yellow {
  color: #ff9100;
  font-weight: 600;
}
.color-importance--green {
  color: #00897b;
  font-weight: 600;
}
</style>
