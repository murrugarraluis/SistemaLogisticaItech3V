<template>
  <v-row class-name="match-height">
    <v-col cols="12">
      <v-card>
        <v-card-text>
          <!-- Formulario-->
          <v-form
            ref="form"
            v-model="valid"
            class="multi-col-validation"
            lazy-validation
          >
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
                  label="Descripcion"
                  outlined
                  dense
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

      // Reglas de Validacion
      nameRules: [v => !!v || 'Nombre es obligatorio'],
    }
  },
  setup() {
    // modelos de inputs
    const name = ref('')
    const description = ref('')

    return { name, description }
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
          const { data } = result.data
          const { message } = result.data
          this.$root.$emit('setData-Table', data)
          this.reset()
          this.$swal({
            title: 'Registrado!!!', text: message, icon: 'success', confirmButtonColor: '#0d293f',
          })
        }).catch(error => {
          if (error.response) {
            const message = error.response.data.errors.name[0]
            this.$swal({
              title: 'Algo no salió bien !!!', text: message, icon: 'error', confirmButtonColor: '#0d293f',
            })
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
