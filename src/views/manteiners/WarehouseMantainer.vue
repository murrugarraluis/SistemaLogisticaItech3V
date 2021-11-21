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
      <!--      Pestañas -->
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
    <!--   Contenido Pestañas -->
    <v-tabs-items v-model="model">
      <v-tab-item
        v-for="(item,i) in items"
        :key="i"
        :value="`tab-${i}`"
      >
        <v-card flat>
          <v-card-text>
            <base-form v-if="i === 0"></base-form>
            <base-table v-if="i === 1"></base-table>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import BaseTable from '@/views/simple-table/demos/WarehouseTable.vue'
import BaseForm from '@/views/forms/WarehouseForm.vue'

export default {
  components: { BaseTable, BaseForm },
  data() {
    return {
      mantenedor: 'Almacenes',
      model: 'tab-1',
      items: ['Nuevo Almacen', 'Listar Almacen'],
    }
  },
}
</script>
