<template>
  <v-navigation-drawer
    :value="isDrawerOpen"
    app
    floating
    width="260"
    class="app-navigation-menu"
    :right="$vuetify.rtl"
    @input="val => $emit('update:is-drawer-open', val)"
  >
    <!-- Navigation Header -->
    <div class="vertical-nav-header d-flex items-center ps-6 pe-5 pt-5 pb-2">
      <router-link
        to="/"
        class="d-flex align-center text-decoration-none"
      >
        <v-img
          :src="require('@/assets/images/logos/logo.png')"
          max-height="30px"
          max-width="30px"
          alt="logo"
          contain
          eager
          class="app-logo me-3"
        ></v-img>
        <v-slide-x-transition>
          <h2 class="app-title text--primary">
            ITECH 3V
          </h2>
        </v-slide-x-transition>
      </router-link>
    </div>

    <!-- Navigation Items -->
    <v-list
      expand
      shaped
      class="vertical-nav-menu-items pr-5"
    >
      <nav-menu-link
        title="Dashboard"
        :to="{ name: 'dashboard' }"
        :icon="icons.mdiHomeOutline"
      ></nav-menu-link>
      <!-- <nav-menu-link-->
      <!--        title="Account Settings"-->
      <!--        :to="{ name: 'pages-account-settings'}"-->
      <!--        :icon="icons.mdiAccountCogOutline"-->
      <!--      ></nav-menu-link>-->
      <!--      <nav-menu-group-->
      <!--        title="Pages"-->
      <!--        :icon="icons.mdiFileOutline"-->
      <!--      >-->
      <!--        <nav-menu-link-->
      <!--          title="Login"-->
      <!--          :to="{ name: 'pages-login' }"-->
      <!--          target="_blank"-->
      <!--        ></nav-menu-link>-->
      <!--        <nav-menu-link-->
      <!--          title="Register"-->
      <!--          :to="{ name: 'pages-register' }"-->
      <!--          target="_blank"-->
      <!--        ></nav-menu-link>-->
      <!--        <nav-menu-link-->
      <!--          title="Error"-->
      <!--          :to="{ name: 'error-404' }"-->
      <!--          target="_blank"-->
      <!--        ></nav-menu-link>-->
      <!--      </nav-menu-group> -->
      <nav-menu-group
        v-if="canViewMaterials"
        title="Materiales"
        :icon="icons.mdiPackageVariantClosed"
      >
        <nav-menu-link
          title="Materiales"
          :to="{ name: 'materiales' }"
          :icon="icons.mdiPackageVariantClosed"
        ></nav-menu-link>
        <nav-menu-link
          title="Categorias"
          :to="{ name: 'categorias' }"
          :icon="icons.mdiTag"
        ></nav-menu-link>
        <nav-menu-link
          title="Marcas"
          :to="{ name: 'marcas' }"
          :icon="icons.mdiBookmark"
        ></nav-menu-link>
        <nav-menu-link
          title="Unidades de Medida"
          :to="{ name: 'unidades-medida' }"
          :icon="icons.mdiCounter"
        ></nav-menu-link>
      </nav-menu-group>
      <!-- <nav-menu-section-title title="USER INTERFACE"></nav-menu-section-title> -->
      <!-- <nav-menu-link
        title="Typography"
        :to="{ name: 'typography' }"
        :icon="icons.mdiAlphaTBoxOutline"
      ></nav-menu-link>
      <nav-menu-link
        title="Icons"
        :to="{ name: 'icons' }"
        :icon="icons.mdiEyeOutline"
      ></nav-menu-link>
      <nav-menu-link
        title="Cards"
        :to="{ name: 'cards' }"
        :icon="icons.mdiCreditCardOutline"
      ></nav-menu-link>
      <nav-menu-link
        title="Tables"
        :to="{ name: 'simple-table' }"
        :icon="icons.mdiTable"
      ></nav-menu-link>
      <nav-menu-link
        title="Form Layouts"
        :to="{ name: 'form-layouts' }"
        :icon="icons.mdiFormSelect"
      ></nav-menu-link> -->
      <!-- <nav-menu-link
        title="Usuarios"
        :to="{ name: 'usuarios' }"
        :icon="icons.mdiAccountGroup"
      ></nav-menu-link> -->
      <!-- <nav-menu-link
        title="Personal"
        :to="{ name: 'personal' }"
        :icon="icons.mdiAccount"
      ></nav-menu-link> -->
      <nav-menu-link
        v-if="canViewWarehouses"
        title="Almacen"
        :to="{ name: 'almacenes' }"
        :icon="icons.mdiStore"
      ></nav-menu-link>
      <nav-menu-link
        v-if="canViewSuppliers"
        title="Proveedores"
        :to="{ name: 'proveedores' }"
        :icon="icons.mdiAccountTie"
      ></nav-menu-link>
      <nav-menu-link
        v-if="canViewRequests"
        title="Requerimientos"
        :to="{ name: 'requerimientos' }"
        :icon="icons.mdiNotebook"
      ></nav-menu-link>
      <nav-menu-link
        v-if="canViewQuotes"
        title="Cotizaciones"
        :to="{ name: 'cotizaciones' }"
        :icon="icons.mdiCurrencyUsd"
      ></nav-menu-link>
      <nav-menu-link
        v-if="canViewOrdersPurchase"
        title="Ordenes de Compra"
        :to="{ name: 'ordenes-compra' }"
        :icon="icons.mdiNotebook"
      ></nav-menu-link>
      <nav-menu-link
        v-if="canViewPurchases"
        title="Compras"
        :to="{ name: 'compras' }"
        :icon="icons.mdiCartVariant"
      ></nav-menu-link>
      <nav-menu-link
        v-if="canViewEntryNote"
        title="Nota de Ingreso"
        :to="{ name: 'notas-ingreso' }"
        :icon="icons.mdiClipboardTextOutline"
      ></nav-menu-link>
      <nav-menu-link
        v-if="canViewExitNote"
        title="Nota de Salida"
        :to="{ name: 'notas-salida' }"
        :icon="icons.mdiClipboardTextOutline"
      ></nav-menu-link>
      <nav-menu-group
        v-if="canViewMaterials"
        title="Reportes"
        :icon="icons.mdiPackageVariantClosed"
      >
        <nav-menu-link
          title="Requerimentos"
          :to="{ name: 'reportes-requerimiento' }"
          :icon="icons.mdiPackageVariantClosed"
        ></nav-menu-link>
        <nav-menu-link
          title="Compras"
          :to="{ name: 'reportes-compra' }"
          :icon="icons.mdiCartVariant"
        ></nav-menu-link>
      </nav-menu-group>
      <nav-menu-link
          title="Ayuda"
          :to="{ name: 'ayuda' }"
          :icon="icons.mdiHelpCircleOutline "
      ></nav-menu-link>
      <!-- <nav-menu-link
        title="Configuracion"
        :to="{ name: 'configuracion' }"
        :icon="icons.mdiCog"
      ></nav-menu-link> -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
  mdiHomeOutline,
  mdiAlphaTBoxOutline,
  mdiEyeOutline,
  mdiCreditCardOutline,
  mdiTable,
  mdiFileOutline,
  mdiFormSelect,
  mdiAccountCogOutline,
  mdiAccount,
  mdiCartVariant,
  mdiClipboardTextOutline,
  mdiCog,
  mdiPackageVariantClosed,
  mdiStore,
  mdiAccountGroup,
  mdiAccountTie,
  mdiNotebook,
  mdiCurrencyUsd,
  mdiTag,
  mdiBookmark,
  mdiCounter,
  mdiHelpCircleOutline,
} from '@mdi/js'

// import NavMenuSectionTitle from './components/NavMenuSectionTitle.vue'
import NavMenuGroup from './components/NavMenuGroup.vue'
import NavMenuLink from './components/NavMenuLink.vue'

export default {
  components: {
    // NavMenuSectionTitle,
    NavMenuGroup,
    NavMenuLink,
  },
  props: {
    isDrawerOpen: {
      type: Boolean,
      default: null,
    },
  },
  setup() {
    return {
      active: 'Producto',
      icons: {
        mdiHelpCircleOutline,
        mdiHomeOutline,
        mdiAlphaTBoxOutline,
        mdiEyeOutline,
        mdiCreditCardOutline,
        mdiTable,
        mdiFileOutline,
        mdiFormSelect,
        mdiAccountCogOutline,
        mdiAccount,
        mdiCartVariant,
        mdiClipboardTextOutline,
        mdiCog,
        mdiPackageVariantClosed,
        mdiStore,
        mdiAccountGroup,
        mdiAccountTie,
        mdiNotebook,
        mdiCurrencyUsd,
        mdiTag,
        mdiBookmark,
        mdiCounter,
      },
      permissions: localStorage.getItem('permissions'),
    }
  },
  computed: {
    canViewMaterials() {
      return this.permissions.includes('view materials')
    },
    canViewWarehouses() {
      return this.permissions.includes('view warehouses')
    },
    canViewSuppliers() {
      return this.permissions.includes('view suppliers')
    },
    canViewRequests() {
      return this.permissions.includes('view requests')
    },
    canViewQuotes() {
      return this.permissions.includes('view quotes')
    },
    canViewOrdersPurchase() {
      return this.permissions.includes('view orders purchase')
    },
    canViewPurchases() {
      return this.permissions.includes('view purchases')
    },
    canViewEntryNote() {
      return this.permissions.includes('view entry notes')
    },
    canViewExitNote() {
      return this.permissions.includes('view exit notes')
    },
  },
}
</script>

<style lang="scss" scoped>
.app-title {
  font-size: 1.25rem;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
}

// ? Adjust this `translateX` value to keep logo in center when vertical nav menu is collapsed (Value depends on your logo)
.app-logo {
  transition: all 0.18s ease-in-out;
  .v-navigation-drawer--mini-variant & {
    transform: translateX(-4px);
  }
}

@include theme(app-navigation-menu) using ($material) {
  background-color: map-deep-get($material, 'background');
}

.app-navigation-menu {
  .v-list-item {
    &.vertical-nav-menu-link {
      ::v-deep .v-list-item__icon {
        .v-icon {
          transition: none !important;
        }
      }
    }
  }
}

// You can remove below style
// Upgrade Banner
.app-navigation-menu {
  .upgrade-banner {
    position: absolute;
    bottom: 13px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
