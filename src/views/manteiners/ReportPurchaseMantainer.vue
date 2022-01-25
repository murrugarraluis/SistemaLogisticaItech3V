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
          <v-col cols="12">
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
                      <v-col
                        cols="12"
                        md="5"
                      >
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
                              label="Fecha Inicio"
                              :rules="dateMinRules"
                              outlined
                              dense
                              :value="computedDateRequiredFormattedDatefns"
                              :disabled="editedIndex !== -1"
                              v-on="on"
                              @click:clear="date = null"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.date_min"
                            elevation="15"
                            @change="menu1 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col
                        cols="12"
                        md="5"
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
                              label="Fecha Final"
                              :rules="dateMaxRules"
                              outlined
                              dense
                              :value="computedDateFormattedDatefns"
                              :disabled="editedIndex !== -1"
                              v-on="on"
                              @click:clear="date = null"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.date_max"
                            elevation="15"
                            @change="menu2 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col
                        cols="12"
                        md="2"
                      >
                        <div class="d-flex justify-center justify-md-end">
                          <v-btn
                            color="primary"
                            elevation="1"
                            @click="save"
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
            xl="6"
          >
            <!--                Tabla Detalle-->
            <v-card class="pa-4">
              <!--      Modal-->
              <template>
                <div class="d-flex flex-column justify-center align-center flex-md-row justify-md-space-between">
                  <h3 class="py-4">
                    Compras
                  </h3>
                  <div>
                    <v-btn
                      v-show="desserts_detail.length"
                      color="primary"
                      elevation="2"
                      @click="generatePDF()"
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
          <v-col
            cols="12"
            xl="6"
          >
            <!--                Tabla Detalle-->
            <v-card class="pa-4">
              <!--      Modal-->
              <template>
                <div class="d-flex flex-column justify-center align-center flex-md-row justify-md-space-between">
                  <h3 class="py-4">
                    Reporte Grafico
                  </h3>
                </div>
              </template>
              <div>
                <div id="chart" class="d-flex justify-center d-sm-block">
                  <vue-apex-charts
                    v-if="renderGrapihcs"
                    ref="demoChart"
                    type="donut"
                    :options="chartOptions"
                    :series="series"
                    :height="desserts_detail.length > 0 ? '975' : '226'"
                  ></vue-apex-charts>
                </div>
              </div>
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
import VueApexCharts from 'vue-apexcharts'
import api from '@/api'
import generatePDF from '@/reports/jsPDF/jsPDF'

export default {
  components: {
    VueApexCharts,
  },
  data: () => ({
    renderGrapihcs: true,
    series: [],
    chartOptions: {
      chart: {
        width: 1000,
        type: 'pie',
      },
      labels: [],
      responsive: [
        {
          breakpoint: 600,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },

    valid: true,
    table: 'Ordenes de Compra',
    uri: 'purchase-orders',

    maintainer: 'Reporte de Compras',
    headers_detail: [
      { text: 'Codigo', align: 'start', value: 'code' },
      { text: 'Fecha', value: 'date_required' },
      { text: 'Proveedor', value: 'supplier_fullname' },
      { text: 'Estado', align: 'center', value: 'status' },
      { text: 'Total', align: 'center', value: 'total_amount' },
    ],
    desserts_global: [],
    desserts_global_my_data: [],
    desserts: [],
    desserts_detail: [],
    items_importance: ['Baja', 'Media', 'Alta'],

    items_status: ['Pendiente', 'Confirmado'],
    items_type_request: [
      'Para Marketing',
      'Para Ventas',
      'Para Gerencia',
      'Para Contabilidad',
      'Para Logistica',
      'Para Almacen',
    ],
    data_report: [],

    // Variables para ordenamiento de tabla
    sortBy: 'code',
    sortDesc: true,

    // Variables de busqueda o filtrado
    search: '',
    search_detail: '',
    select_status: 'Pendiente',

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
    statusRules: [v => !!v || 'Estado es obligatorio'],
    typeRequestRules: [v => !!v || 'Tipo Requeriiento es obligatorio'],
    dateMinRules: [v => !!v || 'Fecha Inicio es obligatorio'],
    dateMaxRules: [v => !!v || 'Fecha Final es obligatorio'],

    date: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
    date_min: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
    menu1: false,
    menu2: false,
  }),
  computed: {
    computedDateRequiredFormattedDatefns() {
      return this.editedItem.date_min ? format(parseISO(this.editedItem.date_min), 'dd/MM/yyyy') : ''
    },
    computedDateFormattedDatefns() {
      return this.editedItem.date_max ? format(parseISO(this.editedItem.date_max), 'dd/MM/yyyy') : ''
    },
  },
  methods: {
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

      const url = `${this.$URL_SERVE}/purchases?date_min=${data.date_min}&&date_max=${data.date_max}`
      const validation = this.$refs.form.validate()

      if (validation) {
        [this.desserts_detail, this.data_report] = await api.getAllReport(url)
        this.chartOptions.labels = this.data_report.suppliers
        this.series = this.data_report.amount_purchases
        this.renderGrapihcs = false
        this.$nextTick(() => {
          this.renderGrapihcs = true
        })
      }
    },

    // Metodo para limpiar reseatear formulario (limpiar campos)
    reset() {
      this.$refs.form.reset()
    },

    // Metodo para limpiar validaciones
    resetValidation() {
      this.$refs.form.resetValidation()
    },

    generatePDF() {
      const data = this.desserts_detail
      const name = 'Reporte de Compras'
      const columns = [
        { header: 'Codigo', dataKey: 'code' },
        { header: 'Fecha', dataKey: 'date_required' },
        { header: 'Proveedor', dataKey: 'supplier_fullname' },
        { header: 'Estado', dataKey: 'status' },
        { header: 'Total', dataKey: 'total_amount' },
      ]
      const parameters = this.editedItem
      console.log(data)
      let graphic = ''
      this.$refs.demoChart.dataURI().then(({ imgURI }) => {
        graphic = imgURI
        generatePDF.reportPurchase(name, columns, data, parameters, graphic)
      })
    },
  },
}
</script>
<style scoped>
.swal2-popup {
  font-family: 'Inter', sans-serif;
}
</style>
