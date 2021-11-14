<template>
  <div>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>
          <h3>Usuarios</h3>
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
          :append-icon="icons.mdiMagnify"
          label="Search"
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
import {
  mdiMagnify,
} from '@mdi/js'

export default {
  data() {
    return {
      dialog: false,
      search: '',
      icons: { mdiMagnify },
      headers: [
        { text: 'Tipo Usuario', align: 'start', value: 'type_user' },
        { text: 'Usuario', value: 'user' },
        { text: 'Nombre', value: 'full_name' },
        { text: 'Estado', value: 'status' },
      ],
      desserts: [
        {
          type_user: 'Usuario Interno',
          user: 'Sistema',
          full_name: 'Murrugarra Astolingon Luis Angel',
          status: 'Activo',
        },
        {
          type_user: 'Usuario Interno',
          user: 'Gerencia General',
          full_name: 'Murrugarra Astolingon Luis Angel',
          status: 'Activo',
        },
        {
          type_user: 'Usuario Interno',
          user: 'Gerencia Logistica',
          full_name: 'Murrugarra Astolingon Luis Angel',
          status: 'Activo',
        },
        {
          type_user: 'Usuario Interno',
          user: 'Almacen',
          full_name: 'Murrugarra Astolingon Luis Angel',
          status: 'Activo',
        },
        {
          type_user: 'Usuario Interno',
          user: 'Operaciones',
          full_name: 'Murrugarra Astolingon Luis Angel',
          status: 'Activo',
        },
        {
          type_user: 'Usuario Interno',
          user: 'Logistica',
          full_name: 'Murrugarra Astolingon Luis Angel',
          status: 'Activo',
        },
        {
          type_user: 'Usuario Interno',
          user: 'Operaciones',
          full_name: 'Murrugarra Astolingon Luis Angel',
          status: 'Activo',
        },
        {
          type_user: 'Usuario Interno',
          user: 'Operaciones',
          full_name: 'Murrugarra Astolingon Luis Angel',
          status: 'Activo',
        },
      ],
    }
  },
}
</script>
