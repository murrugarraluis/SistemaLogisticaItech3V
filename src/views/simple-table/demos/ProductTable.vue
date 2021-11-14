<template>
  <div>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>
          <h3>Productos</h3>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div>
          <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
              >
                Agregar
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5 font-weight-bold">Agregar Usuario</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        label="DNI"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        label="Apellidos"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Email"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Password"
                        type="password"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-select
                        :items="['0-17', '18-29', '30-54', '54+']"
                        label="Edad"
                        required
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-autocomplete
                        :items="['Administrador', 'Jefe Logistica', 'Jefe Almacen', 'Operario', 'Otro']"
                        label="Roles"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-container>
                <small></small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog = false"
                >
                  Cerrar
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="dialog = false"
                >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-toolbar>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
      ></v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      search: '',
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 12159,
          fat: 63.0,
          carbs: 244,
          protein: 4.50,
          iron: '15%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 2397,
          fat: 98.0,
          carbs: 378,
          protein: 47.3,
          iron: '16%',
        },
        {
          name: 'Eclair',
          calories: 2672,
          fat: 167.0,
          carbs: 823,
          protein: 96.0,
          iron: '87%',
        },
        {
          name: 'Cupcake',
          calories: 3805,
          fat: 38.7,
          carbs: 677,
          protein: 47.3,
          iron: '87%',
        },
        {
          name: 'Gingerbread',
          calories: 3756,
          fat: 516.0,
          carbs: 459,
          protein: 3.39,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 3715,
          fat: 0.0,
          carbs: 914,
          protein: 20.0,
          iron: '10%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 22,
          iron: '22%',
        },
        {
          name: 'Honeycomb',
          calories: 4018,
          fat: 23.2,
          carbs: 827,
          protein: 26.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 4252,
          fat: 2522.0,
          carbs: 512,
          protein: 344.9,
          iron: '422%',
        },
        {
          name: 'KitKat',
          calories: 5518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ],
    }
  },
}
</script>
