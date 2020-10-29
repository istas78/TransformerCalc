import Vue from 'vue'
import VueRouter from 'vue-router'
import InputParams from '@/views/InputParams.vue'
import Calculation from '@/views/Calculation.vue'
import CalcResults from '@/views/CalcResults.vue'
import Signup from '@/views/Signup.vue'
import Signin from '@/views/Signin.vue'
import Home from '@/views/Home.vue'
import Store from '../store'

Vue.use(VueRouter)



const router = new VueRouter({
  routes:[
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/input',
      name: 'input',
      component: InputParams,
      beforeEnter: AuthGuard
    },
    {
      path: '/calculation',
      name: 'calculation',
      component: Calculation,
      beforeEnter: AuthGuard
    },
    {
      path: '/results',
      name: 'results',
      component: CalcResults,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ],
  mode: 'history'
  
})

function AuthGuard(from, to, next){
  if(Store.getters.isUserAuthenticated){
    next();
  }else{
    next('/signin');
  }
  }

export default router
