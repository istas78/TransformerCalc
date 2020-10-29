export default {
    state: {
        jsondata: [],
        wires: [],
        variantsLV: [],
        variantsHV: [],
        goodVariants: [],
        lowStorVariants:[]
    },
    mutations: {
        SET_JSONDATA(state, payload){
          state.jsondata = payload
        },
        SET_VARIANTSLV(state, payload){
          state.variantsLV = payload
        },
        SET_GLSVARIANTS(state, payload){
          state.goodVariants = payload.good;
          state.lowStorVariants = payload.lowStor;
        },
        SET_WIRES(state, payload){
          state.wires = payload
        },
        SET_VARIANTSHV(state, payload){
          state.variantsHV = payload
        },
        PUSH_WIRES(state, payload){
          state.wires.push(payload)
        },
        NULL_WIRES(state){
          state.wires = [];
        }
      },
      getters:{
        getJsondata: (state) => state.jsondata,
        getWires: (state) => state.wires,
        getVariantsLV: (state) => state.variantsLV,
        getVariantsHV: (state) => state.variantsHV,
        getGoodVariants: (state) => state.goodVariants,
        getLowStorVariants: (state) => state.lowStorVariants,
      },
      actions:{
        commitJsonData({commit},payload){
          commit("SET_JSONDATA",payload);
        }

      }
    
}