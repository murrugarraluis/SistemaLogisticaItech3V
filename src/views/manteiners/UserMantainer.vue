<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-card-title class="w-full d-flex justify-center">
        <h1 class="font-weight-bold text-h4 text--white">
          Usuarios
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
            <user-form v-if="i === 0"></user-form>
            <user-table v-if="i === 1"></user-table>
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
  components: {
    UserTable,
    UserForm,
  },
  data() {
    return {
      model: 'tab-1',
      items: [
        'Nuevo Usuario', 'Listar Usuario',
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
}
</script>
