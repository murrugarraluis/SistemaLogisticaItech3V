import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
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
    path: '/pages/login',
    name: 'pages-login',
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
    component: () => import('@/views/manteiners/User.vue'),
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('@/views/simple-table/demos/PersonalTable.vue'),
  },
  {
    path: '/productos',
    name: 'productos',
    component: () => import('@/views/simple-table/demos/ProductTable.vue'),
  },
  {
    path: '/proveedores',
    name: 'proveedores',
    component: () => import('@/views/simple-table/demos/SupplierTable.vue'),
  },
  {
    path: '/compras',
    name: 'compras',
    component: () => import('@/views/simple-table/demos/PurcharseTable.vue'),
  },
  {
    path: '/almacenes',
    name: 'almacenes',
    component: () => import('@/views/simple-table/demos/WarehouseTable.vue'),
  },
  {
    path: '/requerimientos',
    name: 'requerimientos',
    component: () => import('@/views/simple-table/demos/RequirementTable.vue'),
  },
  {
    path: '/ordenes-compra',
    name: 'ordenes-compra',
    component: () => import('@/views/simple-table/demos/PurcharseOrderTable.vue'),
  },
  {
    path: '/notas-ingreso',
    name: 'notas-ingreso',
    component: () => import('@/views/simple-table/demos/EntryNoteTable.vue'),
  },
  {
    path: '/notas-salida',
    name: 'notas-salida',
    component: () => import('@/views/simple-table/demos/ExitNoteTable.vue'),
  },
  {
    path: '/cotizaciones',
    name: 'cotizaciones',
    component: () => import('@/views/simple-table/demos/QuotationTable.vue'),
  },
  {
    path: '/configuracion',
    name: 'configuracion',
    component: () => import('@/views/simple-table/demos/DemoSimpleTableDense.vue'),
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

export default router
