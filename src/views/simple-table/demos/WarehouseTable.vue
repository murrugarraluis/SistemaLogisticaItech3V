<template>
  <v-card>
    <v-card-text>
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
  mdiDelete,
  mdiFileDelimited,
  mdiFileExcel,
  mdiFilePdfBox,
  mdiMagnify,
  mdiPencil,
} from '@mdi/js'
import axios from 'axios'
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

  }),
  mounted() {
    // Recibir y Actualizar data recien ingresada
    this.$root.$on('setData-Table', data => { this.desserts.push(data) })
  },
  created() {
    this.initialize()
  },
  methods: {
    async initialize() {
      const url = `${this.$URL_SERVE}/warehouses`
      this.desserts = await api.get(url)
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item)
      const { id } = { ...item }
      this.$swal({
        title: '¿Está Seguro?', text: 'Una vez eliminado ya no se podrá recuperar!', icon: 'warning', showCancelButton: true, confirmButtonText: 'Si, Eliminar!', cancelButtonText: 'Cancelar',
      }).then(result => {
        if (result.isConfirmed) {
          const url = `${this.$URL_SERVE}/warehouses/${id}`

          // Peticion Http
          axios.delete(url).then(r => {
            const { message } = r.data
            this.$swal('Eliminado!!!', message, 'success')
          }).catch(error => {
            if (error.response) {
              const message = error.response.data.error
              this.$swal('Algo no salió bien !!!', message, 'error')
            }
          })
          this.desserts.splice(index, 1)
        }
      })
    },

  },
}
</script>
