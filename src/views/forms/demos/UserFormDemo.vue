<template>
  <v-form
    ref="form"
    v-model="valid"
    class="multi-col-validation"
    lazy-validation
  >
    <!--    Alertas-->
    <div id="alerts">
      <v-alert
        type="success"
        text
        :value="alertSuccess"
      >
        Usuario Registrado
      </v-alert>
      <v-alert
        text
        type="error"
        :value="alertErrors"
      >
        Algo no salió bien
      </v-alert>
    </div>
    <!--    Columnas de Inputs-->
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="personal"
          label="Personal"
          outlined
          dense
          :rules="personalRules"
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-select
          v-model="typeUser"
          :items="type_user_items"
          label="Tipo Usuario"
          outlined
          dense
          :rules="typeUserRules"
        ></v-select>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="email"
          label="Email"
          outlined
          dense
          type="email"
          :rules="emailRules"
          required
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="password"
          label="Contraseña"
          outlined
          dense
          :rules="passwordRules"
          type="password"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <div class="d-flex flex-column flex-sm-row justify-sm-center">
          <v-btn
            color="primary"
            class="mb-2 mb-sm-0 mr-sm-2"
            @click="validate"
          >
            Guardar
          </v-btn>
          <v-btn
            type="reset"
            outlined
            @click="reset"
          >
            Cancelar
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { ref } from '@vue/composition-api'

export default {
  data() {
    return {

      valid: true,

      // variables para el uso de alertas
      alertSuccess: false,
      alertErrors: false,

      // Items para selects
      type_user_items: [
        'Administrador',
        'Logistica',
        'Almacen',
      ],

      // Reglas de Validacion
      personalRules: [
        v => !!v || 'Personal es obligatorio',
      ],
      typeUserRules: [
        v => !!v || 'Tipo de Usuario es obligatorio',
      ],
      emailRules: [
        v => !!v || 'E-mail es obligatorio',
        v => /.+@.+\..+/.test(v) || '\n'
          + 'El email debe ser válido',
      ],
      passwordRules: [
        v => !!v || 'Contraseña es obligatorio',
        v => (v && v.length >= 8) || 'Contraseña debe tener como minimo 8 caracteres',
      ],
    }
  },
  setup() {
    const personal = ref('')
    const typeUser = ref('')
    const email = ref('')
    const password = ref('')

    return {
      personal,
      typeUser,
      email,
      password,
    }
  },
  watch: {
    alertSuccess(val) {
      if (val) {
        setTimeout(() => { this.alertSuccess = false }, 2500)
      }
    },
    alertErrors(val) {
      if (val) {
        setTimeout(() => { this.alertErrors = false }, 3000)
      }
    },
  },
  methods: {
    validate() {
      const validation = this.$refs.form.validate()
      if (validation) {
        this.alertSuccess = true
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>
