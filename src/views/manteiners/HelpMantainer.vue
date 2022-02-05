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
    <v-card>
      <v-card-text>
        <div class="d-flex justify-center">
          <v-btn
            color="primary"
            dark
            class="mb-2"
            @click="getHelp()"
          >
            Ver
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-card>
</template>
<script>
import axios from 'axios'

export default {
  methods: {
    async getHelp() {
      const axiosInstance = axios.create({
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      await axiosInstance.get('http://localhost:8000/api/files/1', { responseType: 'blob' }).then(result => {
        console.log(result.data)
        const blob = new Blob([result.data])
        const url = window.URL.createObjectURL(blob)
        window.open(url)
      })
    },
  },
  data() {
    return {
      mantenedor: 'Ayuda',
    }
  },

}
</script>
<style>
.swal2-popup {
  font-family: "Inter", sans-serif
}
</style>
