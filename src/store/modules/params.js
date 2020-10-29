export default {
  state: {
    comParams:[
      {
        name: 'power',
        title: 'Мощность',
        value: 630,
        select: null,
        type: 'input',
        suffix: 'кВа'
      },
      {
        name: 'ulineHV',
        title: 'UлВН',
        value: 10000,
        select: null,
        type: 'input',
        suffix: 'В'
      },
      {
        name: 'ulineLV',
        title: 'UлНН',
        value: 400,
        select: null,
        type: 'input',
        suffix: 'В'
      },
      {
        name: 'frecuency',
        title: 'Часота сети',
        value: 50,
        select: null,
        type: 'input',
        suffix: 'Гц'
      },
      {
        name: 'iduction',
        title: 'Индукция',
        value: null,
        select: null,
        type: 'input',
        suffix: 'Тл'
      },
      {
        name: 'scheemLV',
        title: 'Схема соединения НН',
        value: 'Звезда',
        select: ['Треугольник','Звезда','Зигзаг'],
        type: 'select',
        suffix: null
      },
      {
        name: 'scheemHV',
        title: 'Схема соединения ВН',
        value: 'Звезда',
        select: ['Треугольник','Звезда','Зигзаг'],
        type: 'select',
        suffix: null
      },
      {
        name: 'transformerType',
        title: 'Тип трансформатора',
        value: 'ТМГ',
        select: ['ТО','ТР','ОР','ТМГ','ТМ','ОМ'],
        type: 'select',
        suffix: null
      },
      {
        name: 'regVoltageregion',
        title: 'ПБВ/РПН макс. отклонение',
        value: '5',
        select: ['0','2','5','10','20'],
        type: 'select',
        suffix: '%'
      },
      {
        name: 'regVoltageStep',
        title: 'ПБВ/РПН шаг',
        value: '2.5',
        select: ['1','2.5','5','10'],
        type: 'select',
        suffix: '%'
      }
    ],
    addParams: [
     
      {
        name: 'currentDensityMinLV',
        title: 'Плотность тока НН мин.',
        value: '1.4',
        select: null,
        type: 'input',
        suffix: 'А/мм^2'
      },
      {
        name: 'currentDensityMaxLV',
        title: 'Плотность тока НН макс.',
        value: '1.7',
        select: null,
        type: 'input',
        suffix: 'А/мм^2'
      },
      {
        name: 'currentDensityMinHV',
        title: 'Плотность тока ВН мин.',
        value: '1.2',
        select: null,
        type: 'input',
        suffix: 'А/мм^2'
      },
      {
        name: 'currentDensityMaxHV',
        title: 'Плотность тока ВН макс.',
        value: '1.8',
        select: null,
        type: 'input',
        suffix: 'А/мм^2'
      },
      {
        name: 'currentDensityAllMin',
        title: 'Плотность тока сумм. мин.',
        value: '2.6',
        select: null,
        type: 'input',
        suffix: 'А/мм^2'
      },
      {
        name: 'currentDensityAllMax',
        title: 'Плотность тока сумм. макс.',
        value: '3',
        select: null,
        type: 'input',
        suffix: 'А/мм^2'
      },
      {
        name: 'maxWireInLayerNumLV',
        title: 'Макс. кол-во жил в слое НН',
        value: '2',
        select: null,
        type: 'input',
        suffix: ''
      },
      {
        name: 'maxWireInLayerNumHV',
        title: 'Макс. кол-во жил в слое ВН',
        value: '1',
        select: null,
        type: 'input',
        suffix: ''
      },
      {
        name: 'maxLayersNumLV',
        title: 'Макс. кол-во слоев НН',
        value: '10',
        select: null,
        type: 'input',
        suffix: ''
      },
      {
        name: 'maxLayersNumHV',
        title: 'Макс. кол-во слоев ВН',
        value: '10',
        select: null,
        type: 'input',
        suffix: ''
      },
      {
        name: 'rodRimClearance',
        title: 'Зазор м/у стержнем и оправой',
        value: '5',
        select: null,
        type: 'input',
        suffix: 'мм'
      },
      {
        name: 'coilCoilClearance',
        title: 'Зазор м/у катушками мин.',
        value: '20',
        select: null,
        type: 'input',
        suffix: 'мм'
      },
      {
        name: 'rimCoilHeightDif',
        title: 'Мин. размер косой НН',
        value: '15',
        select: null,
        type: 'input',
        suffix: 'мм'
      },
      {
        name: 'isThickLV',
        title: 'Толщина изоляции провода НН',
        value: '0.45',
        select: null,
        type: 'input',
        suffix: 'мм'
      },
      {
        name: 'isThickHV',
        title: 'Толщина изоляции провода ВН',
        value: '0.45',
        select: null,
        type: 'input',
        suffix: 'мм'
      },
      {
        name: 'cardboardThick',
        title: 'Толщина картона',
        value: '0.5',
        select: null,
        type: 'input',
        suffix: 'мм'
      },
      {
        name: 'paperThick',
        title: 'Толщина бумаги',
        value: '0.12',
        select: null,
        type: 'input',
        suffix: 'мм'
      },
      {
        name: 'wireDensity',
        title: 'Плотность аллюминия с изоляцией',
        value: '2850',
        select: null,
        type: 'input',
        suffix: 'кг/м3'
      },
      {
        name: 'wireResistance',
        title: 'Удельное сопротивление аллюминия * 1,27',
        value: '0.034',
        select: null,
        type: 'input',
        suffix: 'Ом*мм2/м'
      },
      {
        name: 'channalThick',
        title: 'Толщина канала',
        value: '6',
        select: null,
        type: 'input',
        suffix: 'мм'
      },
      {
        name: 'rimD',
        title: 'Диаметр оправки',
        value: null,
        select: null,
        type: 'input',
        suffix: 'мм'
      },
      {
        name: 'rimH',
        title: 'Всота оправки',
        value: null,
        select: null,
        type: 'input',
        suffix: 'мм'
      },
      {
        name: 'rimL',
        title: 'Длина прям. уч. оправки',
        value: null,
        select: null,
        type: 'input',
        suffix: 'мм'
      },
      {
        name: 'numSemiChannals',
        title: 'Число полуканалов',
        value: '2',
        select: null,
        type: '',
        suffix: ''
      },
    ],
  },
  mutations: {
     set_com_par_val(state, payload){
      const index = state.comParams.findIndex(_ => _.name === payload.name)
      state.comParams[index].value = payload.value
    },
    set_add_par_val(state, payload){
      const index = state.addParams.findIndex(_ => _.name === payload.name)
      state.addParams[index].value = payload.value
    }
    // set_params_value(state, payload){
    //   const index = state.params.findIndex(_ => _.name === payload.name)
    //   state.params[index].value = payload.value
   // }
  },
  getters:{
    get_comParams: (state) => state.comParams,
    get_addParams: (state) => state.addParams,
    get_comParamsValues(state) {
      return keyword => state.comParams.filter(item =>{
        return item.name === keyword
      });
    },
    get_addParamsValues(state) {
      return keyword => state.addParams.filter(item =>{
        return item.name === keyword
      });
    },
  },
  actions:{
    setParams(ctx, name, valeu){
      ctx.commit('set_com_par_val', name, value)
    }

  }
}
