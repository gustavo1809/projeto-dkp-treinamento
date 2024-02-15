import Vue from 'vue'
import VueRouter from 'vue-router'
import Dependente from '../views/DependenteView.vue'
import Marca from '../views/MarcaView.vue'
import Carro from '../views/CarroView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dependente',
    name: 'dependente',
    component: Dependente
  },
  {
    path: '/funcionario',
    name: 'funcionario',

    component: () => import(/* webpackChunkName: "funcionario" */ '../views/FuncionarioView.vue')
  },
  {
    path: '/carro',
    name: 'carro',
    component: Carro
  },
  {
    path: '/',
    name: 'marca',
    component: Marca
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
