import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/user'
import generalModule from './modules/general'
import paramsModule from './modules/params'
import magCoreParamsModule from './modules/magcoreparams'
import wiresModule from './modules/wires'
import calcModule from './modules/calc'

Vue.use(Vuex)

export default new Vuex.Store({
 
  modules: {
    generalModule,
    userModule,
    paramsModule,
    magCoreParamsModule,
    wiresModule,
    calcModule
  }
})
