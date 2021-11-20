<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-card-title class="w-full d-flex justify-center">
        <h1 class="font-weight-bold text-h4 text--white text-truncate">
          Almacenes
        </h1>
      </v-card-title>
      <template v-slot:extension>
        <v-tabs
          v-model="model"
          centered
          slider-color="yellow"
        >
          <v-tab
            v-for="(item,i) in items"
            :key="i"
            :href="`#tab-${i}`"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="model">
      <v-tab-item
        v-for="(item,i) in items"
        :key="i"
        :value="`tab-${i}`"
      >
        <v-card flat>
          <v-card-text>
            <warehouse-form v-if="i === 0"></warehouse-form>
            <warehouse-table v-if="i === 1 && renderTable"></warehouse-table>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import WarehouseTable from '@/views/simple-table/demos/WarehouseTable.vue'
import WarehouseForm from '@/views/forms/WarehouseForm.vue'

export default {
  components: {
    WarehouseTable,
    WarehouseForm,
  },
  data() {
    return {
      model: 'tab-1',
      renderTable: true,
      items: [
        'Nuevo Almacen', 'Listar Almacen',
      ],
    }
  },
  watch: {
    model(val) {
      if (val === 'tab-1') {
        console.log('Renderiza')
        this.forceRerenderTable()
      }
    },
  },
  methods: {
    forceRerenderTable() {
      this.renderTable = false

      this.$nextTick(() => {
        this.renderTable = true
      })
    },
  },
}
</script>
