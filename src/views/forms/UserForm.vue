<template>
  <v-row class-name="match-height">
    <!-- Multiple Column -->
    <v-col cols="12">
      <v-card>
        <v-card-text>
          <user-form-demo></user-form-demo>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import UserFormDemo from '@/views/forms/demos/UserFormDemo.vue'

export default {
  components: {
    UserFormDemo,
  },
  setup() {
    return {}
  },
}
</script>
