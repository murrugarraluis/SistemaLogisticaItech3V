<template>
  <v-row class-name="match-height">
    <!-- Multiple Column -->
    <v-col cols="12">
      <v-card>
        <v-card-text>
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
                {{ alertSuccessText }}
              </v-alert>
              <v-alert
                type="error"
                :value="alertErrors"
                text
              >
                {{ alertErrorsText }}
              </v-alert>
            </div>
            <!--    Columnas de Inputs-->
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="name"
                  label="Nombre"
                  outlined
                  dense
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-textarea
                  v-model="description"
                  outlined
                  dense
                  label="Descripcion"
                ></v-textarea>
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
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { ref } from '@vue/composition-api'
import axios from 'axios'

export default {
  data() {
    return {

      valid: true,

      // variables para el uso de alertas
      alertSuccess: false,
      alertErrors: false,
      alertSuccessText: '',
      alertErrorsText: '',

      // Reglas de Validacion
      nameRules: [
        v => !!v || 'Nombre es obligatorio',
      ],
    }
  },
  setup() {
    const name = ref('')
    const description = ref('')

    return {
      name,
      description,
    }
  },
  watch: {
    // Muestra una alerta por un tiempo,segun su cambio de estado (true or false)
    alertSuccess(val) {
      if (val) {
        setTimeout(() => { this.alertSuccess = false }, 3000)
      }
    },
    alertErrors(val) {
      if (val) {
        setTimeout(() => { this.alertErrors = false }, 3500)
      }
    },
  },
  methods: {

    // Metodo para validar campos y enviar datos via http
    validate() {
      const url = `${this.$URL_SERVE}/warehouses`
      const validation = this.$refs.form.validate()
      if (validation) {
        // Construccion de JSON
        const json = {
          name: this.name,
          description: this.description,
        }

        // Peticion Http
        axios.post(url, json).then(result => {
          const { message } = result.data
          this.alertSuccess = true
          this.alertSuccessText = message
          this.reset()
        }).catch(error => {
          if (error.response) {
            const message = error.response.data.errors.name[0]
            this.alertErrors = true
            this.alertErrorsText = message
          }
        })
      }
    },

    // Metodo para limpiar reseatear formulario (limpiar campos)
    reset() {
      this.$refs.form.reset()
    },

    // Metodo para limpiar validaciones
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>
