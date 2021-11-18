<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h4 basil--text">
        Usuarios
      </h1>
    </v-card-title>

    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="(item, index) in items"
        :key="item"
      >
        <v-card
          color="basil"
          flat
        >
          <v-card-text>
            <user-form v-if="index === 0"></user-form>
            <user-table v-if="index === 1"></user-table>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import UserTable from '@/views/simple-table/demos/UserTable.vue'
import UserForm from '@/views/forms/UserForm.vue'

export default {
  name: 'User',
  components: {
    UserTable,
    UserForm,
  },
  data() {
    return {
      tab: null,
      items: [
        'Nuevo Usuario', 'Listar Usuario',
      ],
      text: 'SOY NUEVO',
    }
  },
}
</script>

<style scoped>
</style>
