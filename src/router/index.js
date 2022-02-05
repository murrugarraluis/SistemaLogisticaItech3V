import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/typography',
    name: 'typography',
    component: () => import('@/views/typography/Typography.vue'),
  },
  {
    path: '/icons',
    name: 'icons',
    component: () => import('@/views/icons/Icons.vue'),
  },
  {
    path: '/cards',
    name: 'cards',
    component: () => import('@/views/cards/Card.vue'),
  },
  {
    path: '/simple-table',
    name: 'simple-table',
    component: () => import('@/views/simple-table/SimpleTable.vue'),
  },
  {
    path: '/form-layouts',
    name: 'form-layouts',
    component: () => import('@/views/form-layouts/FormLayouts.vue'),
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/register',
    name: 'pages-register',
    component: () => import('@/views/pages/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: () => import('@/views/manteiners/UserMantainer.vue'),
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('@/views/simple-table/demos/PersonalTable.vue'),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/materiales',
    name: 'materiales',
    component: () => import('@/views/manteiners/MaterialMantainer.vue'),

    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/proveedores',
    name: 'proveedores',
    component: () => import('@/views/simple-table/demos/SupplierTable.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/compras',
    name: 'compras',
    component: () => import('@/views/manteiners/PurchaseMantainer.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/almacenes',
    name: 'almacenes',
    component: () => import('@/views/manteiners/WarehouseMantainer.vue'),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/requerimientos',
    name: 'requerimientos',
    component: () => import('@/views/manteiners/RequestMantainer.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/ordenes-compra',
    name: 'ordenes-compra',
    component: () => import('@/views/manteiners/PurchaseOrderMantainer.vue'),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/notas-ingreso',
    name: 'notas-ingreso',
    component: () => import('@/views/manteiners/EntryNoteMantainer.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/notas-salida',
    name: 'notas-salida',
    component: () => import('@/views/manteiners/ExitNoteMantainer.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/cotizaciones',
    name: 'cotizaciones',
    component: () => import('@/views/manteiners/QuotationMantainer.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/configuracion',
    name: 'configuracion',
    component: () => import('@/views/simple-table/demos/DemoSimpleTableDense.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/categorias',
    name: 'categorias',
    component: () => import('@/views/manteiners/CategoryMantainer.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/marcas',
    name: 'marcas',
    component: () => import('@/views/manteiners/MarkMantainer.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/unidades-medida',
    name: 'unidades-medida',
    component: () => import('@/views/manteiners/MeasureUnitMantainer.vue'),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/reportes-requerimiento',
    name: 'reportes-requerimiento',
    component: () => import('@/views/manteiners/ReportRequestMantainer.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/reportes-compra',
    name: 'reportes-compra',
    component: () => import('@/views/manteiners/ReportPurchaseMantainer.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/ayuda',
    name: 'ayuda',
    component: () => import('@/views/manteiners/HelpMantainer.vue'),
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },

  {
    path: '/page-not-authorized',
    name: 'page-not-authorized',
    component: () => import('@/views/PageNotAuthorized.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
function hasAccess(name) {
  const permissions = localStorage.getItem('permissions')

  switch (name) {
    case 'dashboard':
      return true

    case 'materiales':
      return permissions.includes('view materials')

    case 'categorias':
      return permissions.includes('view categories')

    case 'marcas':
      return permissions.includes('view marks')

    case 'unidades-medida':
      return permissions.includes('view measure units')

    case 'almacenes':
      return permissions.includes('view warehouses')

    case 'proveedores':
      return permissions.includes('view suppliers')

    case 'requerimientos':
      return permissions.includes('view requests')

    case 'cotizaciones':
      return permissions.includes('view quotes')

    case 'ordenes-compra':
      return permissions.includes('view orders purchase')

    case 'compras':
      return permissions.includes('view purchases')

    case 'notas-ingreso':
      return permissions.includes('view entry notes')

    case 'notas-salida':
      return permissions.includes('view exit notes')

    case 'reportes-requerimiento':
      return permissions.includes('view reports')
    case 'reportes-compra':
      return permissions.includes('view reports')

    default:
      return false
  }
}
router.beforeEach((to, from, next) => {
  // A Logged-in user can't go to login page again
  if (to.name === 'login' && localStorage.getItem('token')) {
    next('dashboard')

    // the route requires authentication
  } else if (to.meta.requiresAuth) {
    if (!localStorage.getItem('token')) {
      // user not logged in, send them to login page
      next('login')
    } else if (!hasAccess(to.name)) {
      next('page-not-authorized')
    }
  }
  next()
})
export default router
