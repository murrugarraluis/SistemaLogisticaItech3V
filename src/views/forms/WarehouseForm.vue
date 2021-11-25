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
import api from '@/api'

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
  created() {
    console.log('Form Creado')
  },
  methods: {
    // Metodo para validar campos y enviar datos via http
    async validate() {
      const url = `${this.$URL_SERVE}/warehouses`
      const validation = this.$refs.form.validate()
      if (validation) {
        // Construccion de JSON
        const json = {
          name: this.name,
          description: this.description,
        }
        const response = await api.save(url, json)
        if (response.status === 201) {
          this.reset()
          this.$root.$emit('setData-Table', response.data)
          this.$swal('Registrado!!!', response.message, 'success')
        } else {
          const errorsArray = Object.values(response.errors)
          const errors = errorsArray.join('\n')
          this.$swal('Algo no salió bien !!!', errors, 'error')
        }
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
