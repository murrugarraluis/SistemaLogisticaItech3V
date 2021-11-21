<template>
  <v-card>
    <v-card-text>
      <!--      Dialog para Consultar Eliminacion-->
      <v-dialog
        v-model="dialogDelete"
        max-width="500px"
      >
        <v-card>
          <v-card-title class="text-h5 d-flex justify-center">
            ¿Desea eliminar el almacén ?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="closeDelete"
            >
              Cancel
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="deleteItemConfirm"
            >
              OK
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--    Alertas-->
      <div id="alerts">
        <v-alert
          :type="typeAlert"
          text
        >
          {{ alertText }}
        </v-alert>
      </div>
      <!--      Emcabezado de Tabla-->
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
  mdiPencil, mdiDelete, mdiMagnify, mdiFileExcel, mdiFileDelimited, mdiFilePdfBox,
} from '@mdi/js'
import axios from 'axios'

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

    // variables para el uso de alertas
    typeAlert: 'info',
    alertText: 'Notificaciones',

    // Variables para eliminacion
    dialogDelete: false,
    deletedItem: 0,
    deletedId: 0,

    // Iconos
    icons: {
      mdiPencil, mdiDelete, mdiMagnify, mdiFileExcel, mdiFileDelimited, mdiFilePdfBox,
    },

  }),
  watch: {
    // Muestra una alerta por un tiempo,segun su cambio de estado (true or false)
    typeAlert(val) {
      if (val) setTimeout(() => { this.typeAlert = 'info'; this.alertText = 'Notificaciones' }, 3000)
    },
  },
  mounted() {
    // Recibir y Actualizar data recien ingresada
    this.$root.$on('setData-Table', data => { this.desserts.push(data) })
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      const url = `${this.$URL_SERVE}/warehouses`

      // Llamado a la api
      axios.get(url).then(result => {
        const { data } = result.data
        this.desserts = [...data]
      })
    },

    deleteItem(item) {
      this.deletedItem = this.desserts.indexOf(item)
      this.deletedId = { ...item }.id
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      const url = `${this.$URL_SERVE}/warehouses/${this.deletedId}`
      console.log(url)

      // Peticion Http
      axios.delete(url).then(result => {
        const { message } = result.data
        this.typeAlert = 'success'
        this.alertText = message
      }).catch(error => {
        if (error.response) {
          const message = error.response.data.error
          this.typeAlert = 'error'
          this.alertText = message
        }
      })

      this.desserts.splice(this.deletedItem, 1)
      this.closeDelete()
    },

    closeDelete() {
      this.dialogDelete = false
      this.deletedId = 0
      this.deletedItem = 0
    },
  },
}
</script>
<style></style>
