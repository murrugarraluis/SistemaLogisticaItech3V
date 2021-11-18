<template>
  <div>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          :append-icon="icons.mdiMagnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
      ></v-data-table>
    </v-card>
  </div>
</template>
<script>
import {
  mdiMagnify,
} from '@mdi/js'

export default {
  data() {
    return {
      dialog: false,
      search: '',
      icons: { mdiMagnify },
      headers: [
        { text: 'Tipo Usuario', align: 'start', value: 'type_user' },
        { text: 'Usuario', value: 'user' },
        { text: 'Nombre', value: 'full_name' },
        { text: 'Estado', value: 'status' },
      ],
      desserts: [
        {
          type_user: 'Usuario Interno',
          user: 'Sistema',
          full_name: 'Murrugarra Astolingon Luis Angel',
          status: 'Activo',
        },
        {
          type_user: 'Usuario Interno',
          user: 'Gerencia General',
          full_name: 'Murrugarra Astolingon Luis Angel',
          status: 'Activo',
        },
        {
          type_user: 'Usuario Interno',
          user: 'Gerencia Logistica',
          full_name: 'Murrugarra Astolingon Luis Angel',
          status: 'Activo',
        },
        {
          type_user: 'Usuario Interno',
          user: 'Almacen',
          full_name: 'Murrugarra Astolingon Luis Angel',
          status: 'Activo',
        },
        {
          type_user: 'Usuario Interno',
          user: 'Operaciones',
          full_name: 'Murrugarra Astolingon Luis Angel',
          status: 'Activo',
        },
        {
          type_user: 'Usuario Interno',
          user: 'Logistica',
          full_name: 'Murrugarra Astolingon Luis Angel',
          status: 'Activo',
        },
        {
          type_user: 'Usuario Interno',
          user: 'Operaciones',
          full_name: 'Murrugarra Astolingon Luis Angel',
          status: 'Activo',
        },
        {
          type_user: 'Usuario Interno',
          user: 'Operaciones',
          full_name: 'Murrugarra Astolingon Luis Angel',
          status: 'Activo',
        },
      ],
    }
  },
}
</script>
