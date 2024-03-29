<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link
            to="/"
            class="d-flex align-center"
          >
            <v-img
              :src="require('@/assets/images/logos/logo.png')"
              max-height="30px"
              max-width="30px"
              alt="logo"
              contain
              class="me-3"
            ></v-img>

            <h2 class="text-2xl font-weight-semibold">
              ITECH 3V
            </h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Bienvenido a Itech 3V! 👋🏻
          </p>
          <p class="mb-2">
            Inicie sesión en su cuenta y comience la aventura
          </p>
        </v-card-text>
        <!-- login form -->
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              outlined
              label="Email"
              placeholder="john@example.com"
              hide-details
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <!-- <v-checkbox
                label="Remember Me"
                hide-details
                class="me-3 mt-1"
              >
              </v-checkbox> -->

              <!-- forgot link -->
              <!-- <a
                href="javascript:void(0)"
                class="mt-1"
              > Forgot Password? </a> -->
            </div>

            <v-btn
              block
              color="primary"
              class="mt-6"
              @click="onSubmit"
            >
              Acceder
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <!-- <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2"> New on our platform? </span>
          <router-link :to="{ name: 'pages-register' }">
            Create an account
          </router-link>
        </v-card-text> -->

        <!-- divider -->
        <!-- <v-card-text class="d-flex align-center mt-2">
          <v-divider></v-divider>
          <span class="mx-5">or</span>
          <v-divider></v-divider>
        </v-card-text> -->

        <!-- social links -->
        <!-- <v-card-actions class="d-flex justify-center">
          <v-btn
            v-for="link in socialLink"
            :key="link.icon"
            icon
            class="ms-1"
          >
            <v-icon :color="$vuetify.theme.dark ? link.colorInDark : link.color">
              {{ link.icon }}
            </v-icon>
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)"
    />

    <!-- tree -->
    <v-img
      class="auth-tree"
      width="247"
      height="185"
      src="@/assets/images/misc/tree.png"
    ></v-img>

    <!-- tree  -->
    <v-img
      class="auth-tree-3"
      width="377"
      height="289"
      src="@/assets/images/misc/tree-3.png"
    ></v-img>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiFacebook, mdiTwitter, mdiGithub, mdiGoogle, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import axios from 'axios'
import api from '@/api'

export default {
  setup() {
    const isPasswordVisible = ref(false)
    const email = ref('')
    const password = ref('')
    const socialLink = [
      {
        icon: mdiFacebook,
        color: '#4267b2',
        colorInDark: '#4267b2',
      },
      {
        icon: mdiTwitter,
        color: '#1da1f2',
        colorInDark: '#1da1f2',
      },
      {
        icon: mdiGithub,
        color: '#272727',
        colorInDark: '#fff',
      },
      {
        icon: mdiGoogle,
        color: '#db4437',
        colorInDark: '#db4437',
      },
    ]

    return {
      isPasswordVisible,
      email,
      password,
      socialLink,

      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
      editedItem: {
        email,
        password,
      },
    }
  },
  methods: {
    async onSubmit() {
      try {
        const url = `${this.$URL_SERVE}/login`
        this.editedItem.email = this.email
        this.editedItem.password = this.password
        const data = this.editedItem
        const response = await api.login(url, data)
        if (response.status === 200) {
          const user = {}
          user.email = this.email
          user.token = response.token

          await this.$store.dispatch('doLogin', user)
          localStorage.setItem('token', user.token)
          const token = localStorage.getItem('token')
          if (token) {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
          }

          // Asuminedo que un usuario solo puede tener 1 rol
          const listPermissions = []
          const userId = response.info.data.data[0].id
          const { username } = response.info.data.data[0]
          const roles = response.info.data.data[0].roles[0].name
          const { permissions } = response.info.data.data[0].roles[0]
          permissions.forEach(permission => {
            listPermissions.push(permission.name)
          })
          localStorage.setItem('user_id', userId)
          localStorage.setItem('username', username)
          localStorage.setItem('roles', roles)
          localStorage.setItem('permissions', listPermissions)
          this.$router.push({ name: 'dashboard' })
        } else {
          this.showErrors(response.errors)
        }
      } catch (error) {
        console.error(error)
      }
    },
    showErrors(errors) {
      const errorsArray = Object.values(errors.data.errors)
      const errosList = errorsArray.join('\n')
      this.$toast.error(errosList)
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
