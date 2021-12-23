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

    // meta: {
    //   requiresAuth: true,
    // },
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
    component: () => import('@/views/simple-table/demos/PurcharseTable.vue'),
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
    component: () => import('@/views/simple-table/demos/PurcharseOrderTable.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/notas-ingreso',
    name: 'notas-ingreso',
    component: () => import('@/views/simple-table/demos/EntryNoteTable.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/notas-salida',
    name: 'notas-salida',
    component: () => import('@/views/simple-table/demos/ExitNoteTable.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/cotizaciones',
    name: 'cotizaciones',
    component: () => import('@/views/simple-table/demos/QuotationTable.vue'),
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
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next('login')
    }
  } else {
    if (to.name === 'login' && localStorage.getItem('token')) {
      next('dashboard')
    }
    next()
  }
})

export default router
