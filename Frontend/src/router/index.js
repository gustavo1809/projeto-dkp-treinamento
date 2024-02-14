import Vue from 'vue'
import VueRouter from 'vue-router'
import Dependente from '../views/DependenteView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dependente',
    name: 'dependente',
    component: Dependente
  },
  {
    path: '/',
    name: 'funcionario',
    
    component: () => import(/* webpackChunkName: "funcionario" */ '../views/FuncionarioView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
