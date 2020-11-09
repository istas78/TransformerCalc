export default {
  state: {
    magCoreParams: [
      {
        name: 'windowWidth',
        title: 'Ширина Окна',
        value: 250,
        select: null,
        type: 'input',
        suffix: 'мм'
      },     
      {
        name: 'yokeWidth',
        title: 'Ширина ярма',
        value: 0,
        select: null,
        type: 'input',
        suffix: 'мм'
      },
      {
        name: 'yokeHeigth',
        title: 'Высота ярма',
        value: 0,
        select: null,
        type: 'input',
        suffix: 'мм'
      },
      {
        name: 'yokeDepth',
        title: 'Глубина ярма',
        value: 0,
        select: null,
        type: 'input',
        suffix: 'мм'
      },
      {
        name: 'windowHeigth',
        title: 'Высота Окна',
        value: 640,
        select: null,
        type: 'input',
        suffix: 'мм'
      },
      {
        name: 'ferrSteelDensity',
        title: 'плотность стали магнитопровода',
        value: '7650',
        select: null,
        type: 'input',
        suffix: 'кг/м^3'
      },
      {
        name: 'voltsByTurn',
        title: 'Вольт на виток',
        value: 9.8,
        select: null,
        type: 'input',
        suffix: 'В'
      },
      {
        name: 'turnNumLVExp',
        title: 'Число витков НН экспериментальное',
        value: 24,
        select: null,
        type: 'input',
        suffix: 'В',
      },     
      {
        name: 'limbWidth',
        title: 'Ширина стержня',
        value: 195,
        select: null,
        type: 'input',
        suffix: 'мм'
      },
      {
        name: 'stepsNum',
        title: 'Число ступеней в сечении стержня',
        value: 6,
        select: null,
        type: 'hidden',
        suffix: ''
      },
    ],
    stepsParams: [
      [
        {
          name: 'b1Length',
          title: 'Длина пакета 1',
          value: 195,
          select: null,
          type: 'input',
          suffix: 'мм'
        },
        {
          name: 'b1Width',
          title: 'Ширина пакета 1',
          value: 84,
          select: null,
          type: 'input',
          suffix: 'мм'
        },
      ],
      [
        {
          name: 'b2Length',
          title: 'Длина пакета 2',
          value: 175,
          select: null,
          type: 'input',
          suffix: 'мм'
        },
        {
          name: 'b2Width',
          title: 'Ширина пакета 2',
          value: 38,
          select: null,
          type: 'input',
          suffix: 'мм'
        },
      ],
      [
        {
          name: 'b3Length',
          title: 'Длина пакета 3',
          value: 145,
          select: null,
          type: 'input',
          suffix: 'мм'
        },
        {
          name: 'b3Width',
          title: 'Ширина пакета 3',
          value: 34,
          select: null,
          type: 'input',
          suffix: 'мм'
        },
      ],
      [
        {
          name: 'b4Length',
          title: 'Длина пакета 4',
          value: 120,
          select: null,
          type: 'input',
          suffix: 'мм'
        },
        {
          name: 'b4Width',
          title: 'Ширина пакета 4',
          value: 22,
          select: null,
          type: 'input',
          suffix: 'мм'
        },
      ],
      [
        {
          name: 'b5Length',
          title: 'Длина пакета 5',
          value: 92,
          select: null,
          type: 'input',
          suffix: 'мм'
        },
        {
          name: 'b5Width',
          title: 'Ширина пакета 5',
          value: 20,
          select: null,
          type: 'input',
          suffix: 'мм'
        },
      ],
      [
        {
          name: 'b6Length',
          title: 'Длина пакета 6',
          value: 60,
          select: null,
          type: 'input',
          suffix: 'мм'
        },
        {
          name: 'b6Width',
          title: 'Ширина пакета 6',
          value: 16,
          select: null,
          type: 'input',
          suffix: 'мм'
        },
      ],
      [
        {
          name: 'b7Length',
          title: 'Длина пакета 7',
          value: 0,
          select: null,
          type: 'input',
          suffix: 'мм'
        },
        {
          name: 'b7Width',
          title: 'Ширина пакета 7',
          value: 0,
          select: null,
          type: 'input',
          suffix: 'мм'
        },
      ],
      [
        {
          name: 'b8Length',
          title: 'Длина пакета 8',
          value: 0,
          select: null,
          type: 'input',
          suffix: 'мм'
        },
        {
          name: 'b8Width',
          title: 'Ширина пакета 8',
          value: 0,
          select: null,
          type: 'input',
          suffix: 'мм'
        },
      ],
      [
        {
          name: 'b9Length',
          title: 'Длина пакета 9',
          value: 0,
          select: null,
          type: 'input',
          suffix: 'мм'
        },
        {
          name: 'b9Width',
          title: 'Ширина пакета 9',
          value: 0,
          select: null,
          type: 'input',
          suffix: 'мм'
        },
      ],
      [
        {
          name: 'b10Length',
          title: 'Длина пакета 10',
          value: 0,
          select: null,
          type: 'input',
          suffix: 'мм'
        },
        {
          name: 'b10Width',
          title: 'Ширина пакета 10',
          value: 0,
          select: null,
          type: 'input',
          suffix: 'мм'
        },
      ],

    ]

  },
  mutations: {
    set_magcore_par_val(state, payload) {
      const index = state.magCoreParams.findIndex(_ => _.name === payload.name)
      state.magCoreParams[index].value = payload.value
    },
    set_steps_par_val(state, payload) {
      const index = state.stepsParams.findIndex(_ => _.name === payload.name)
      state.stepsParams[index].value = payload.value
    }
    // set_params_value(state, payload){
    //   const index = state.params.findIndex(_ => _.name === payload.name)
    //   state.params[index].value = payload.value
    // }
  },
  getters: {
    get_magcoreParams: (state) => state.magCoreParams,
    get_magcoreParamsValues(state) {
      return keyword => state.magCoreParams.filter(item =>{
        return item.name === keyword
      });
    },
    get_stepsParams: (state) => state.stepsParams
  },
  actions: {

  }
}
