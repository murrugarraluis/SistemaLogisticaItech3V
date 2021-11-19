<template>
  <v-card>
    <v-card-title>
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
      <div class="d-flex flex-wrap justify-center">
        <v-btn
          class="ma-2"
          :loading="ExcelLoading"
          :disabled="ExcelLoading"
          color="secondary"
          @click="loader = 'ExcelLoading'"
        >
          Excel
        </v-btn>
        <v-btn
          class="ma-2"
          :loading="CSVLoading"
          :disabled="CSVLoading"
          color="secondary"
          @click="loader = 'CSVLoading'"
        >
          CSV
        </v-btn>
        <v-btn
          class="ma-2"
          :loading="PDFLoading"
          :disabled="PDFLoading"
          color="secondary"
          @click="loader = 'PDFLoading'"
        >
          PDF
        </v-btn>
      </div>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
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
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import {
  mdiPencil,
  mdiDelete, mdiMagnify,
} from '@mdi/js'

export default {
  data: () => ({
    loader: null,
    ExcelLoading: false,
    CSVLoading: false,
    PDFLoading: false,
    dialog: false,
    dialogDelete: false,
    search: '',
    icons: { mdiPencil, mdiDelete, mdiMagnify },
    headers: [
      {
        text: 'Codigo',
        align: 'start',
        value: 'code',
      },
      { text: 'Tipo de Usuario', value: 'typeUser' },
      { text: 'Nombre Completo', value: 'fullName' },
      { text: 'Actiones', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  // watch: {
  //   dialog(val) {
  //     val || this.close()
  //   },
  //   dialogDelete(val) {
  //     val || this.closeDelete()
  //   },
  // },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      // eslint-disable-next-line no-return-assign
      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
  },
  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          code: 'USR-000001',
          typeUser: 'Administrador',
          fullName: 'Murrugarra Astolingon Luis Angel',
        },
        {
          code: 'USR-000002',
          typeUser: 'Logistica',
          fullName: 'Urbina Rodriguez Alexandro Del Piero',
        },
        {
          code: 'USR-000003',
          typeUser: 'Almacen',
          fullName: 'Murrugarra Astolingon Luis Angel',
        },
        {
          code: 'USR-000004',
          typeUser: 'Almacenero',
          fullName: 'Urbina Rodriguez Alexandro Del Piero',
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = { ...item }
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = { ...item }
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
