<template>
  <v-card>
    <!--    Cabezera Mantenedor-->
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-card-title class="w-full d-flex justify-center">
        <h1 class="font-weight-bold text-h4 text--white text-truncate">
          {{ maintainer }}
        </h1>
      </v-card-title>
    </v-toolbar>

    <v-card>
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
                      Datos de Busqueda
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
                          v-model="editedItem.status"
                          :items="items_status"
                          label="Estado"
                          :rules="statusRules"
                          outlined
                          dense
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12">
                        <v-autocomplete
                          v-model="editedItem.type_request"
                          :items="items_type_request"
                          label="Tipo Requerimento"
                          :rules="typeRequestRules"
                          outlined
                          dense
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12">
                        <v-menu
                          v-model="menu1"
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
                              :value="computedDateRequiredFormattedDatefns"
                              :disabled="editedIndex !== -1"
                              v-on="on"
                              @click:clear="date = null"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.date_required"
                            elevation="15"
                            :min="date_min"
                            @change="menu1 = false"
                          ></v-date-picker>
                        </v-menu>
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
                              label="Fecha Pactada"
                              :rules="datePactRules"
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
                        <div class="d-flex justify-center">
                          <v-btn
                            color="primary"
                            elevation="2"
                            large
                          >
                            Buscar
                          </v-btn>
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
                <div class="d-flex flex-column justify-center align-center flex-md-row justify-md-space-between">
                  <h3 class="py-4">
                    Requerimientos
                  </h3>
                  <div>
                    <v-btn
                      block
                      color="primary"
                      elevation="2"
                      large
                    >
                      Reportar
                    </v-btn>
                  </div>
                </div>
              </template>
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
                    :disabled="editedIndex !== -1 || quantityDisable"
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
                    :disabled="editedIndex !== -1 || priceDisable"
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
                      :disabled="editedIndex !== -1 || priceDisable"
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
    </v-card>
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
import api from '@/api'
import generatePDF from '@/reports/jsPDF/jsPDF'

export default {
  data: () => ({
    valid: true,
    table: 'Ordenes de Compra',
    uri: 'purchase-orders',

    maintainer: 'Reporte de Requerimientos',

    // Variables de uso en tabla
    headers: [
      { text: 'Codigo', align: 'start', value: 'code' },
      { text: 'Fecha Requerida', value: 'date_required' },
      { text: 'Fecha Pactada', value: 'date_agreed' },
      { text: 'importance', value: 'importance' },
      { text: 'Proveedor', value: 'supplier_fullname' },
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
      { text: 'Fecha Requerida', value: 'date_required' },
      { text: 'Tipo Requerimiento', value: 'type_request' },
      { text: 'Importancia', align: 'center', value: 'importance' },
      { text: 'Estado', align: 'center', value: 'status' },
    ],
    desserts_global: [],
    desserts_global_my_data: [],
    desserts: [],
    desserts_detail: [],
    items_importance: ['Baja', 'Media', 'Alta'],

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

    quantityDisable: false,
    priceDisable: false,

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
    dateRequiredRules: [v => !!v || 'Fecha Requerida es obligatorio'],
    datePactRules: [v => !!v || 'Fecha Pactada es obligatorio'],
    importanceRules: [v => !!v || 'Importancia es obligatorio'],
    typePurchaseOrderRules: [v => !!v || 'Tipo Orden de Compra es obligatorio'],
    documentnumberRules: [v => !!v || 'Numero Documento es obligatorio'],

    date: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
    date_min: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
    menu1: false,
    menu2: false,

    items_type_exit: ['Por Cotizacion', 'Por Producto'],
    items_suppliers: [],
    items_requests: [],
    roles: localStorage.getItem('roles'),
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? `Nuevo ${this.table}` : `Informacion ${this.table}`
    },
    computedDateRequiredFormattedDatefns() {
      return this.editedItem.date_required ? format(parseISO(this.editedItem.date_required), 'dd/MM/yyyy') : ''
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

    'editedItem.document_number': function (val) {
      this.$nextTick(() => {
        if (val && this.editedIndex === -1) {
          this.getQuotationById(val)
        }
      })
    },
    'editedItem.type_purchase_order': function (val) {
      this.$nextTick(() => {
        if (val && this.editedIndex === -1) {
          this.quantityDisable = false
          this.priceDisable = false
          this.desserts_detail = []
          this.editedItem.document_number = ''
        }
      })
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
    this.getAllQuotations()
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
    async getQuotationById(id) {
      const url = `${this.$URL_SERVE}/quotations/${id}`
      const response = await api.get(url)
      this.quantityDisable = true
      this.priceDisable = true
      this.desserts_detail = response.data.materials
    },

    //  Metodo para optener productos
    async getAllQuotations() {
      const url = `${this.$URL_SERVE}/quotations`
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
.swal2-popup {
  font-family: 'Inter', sans-serif;
}
</style>
