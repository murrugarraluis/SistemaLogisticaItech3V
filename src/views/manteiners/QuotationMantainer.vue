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
          {{ mantenedor }}
        </h1>
      </v-card-title>
    </v-toolbar>
    <!--    Table -->
    <base-table></base-table>
  </v-card>
</template>
<script>
import BaseTable from '@/views/simple-table/demos/QuatationTable.vue'

export default {
  components: {
    BaseTable,

  },
  data() {
    return {
      mantenedor: 'Cotizaciones',
    }
  },
}
</script>
<style>
.swal2-popup {
  font-family: "Inter", sans-serif
}
</style>
