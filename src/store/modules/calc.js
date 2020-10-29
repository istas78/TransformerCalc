export default {
    state: {
        calcMCP: [
            {
                name: 'mcSquare',
                title: 'Площадь сечения стежня, Sмагн',
                value: null,
                unit: 'cм^2'
            },
            {
                name: 'mcProfileMaxRad',
                title: 'Максимальный радиус сечения стержня',
                value: null,
                unit: 'мм'
            },
            {
                name: 'mcVolume',
                title: 'объем стержней',
                value: null,
                unit: 'м^3'
            },
            {
                name: 'yokesVolume',
                title: 'объем ярем',
                value: null,
                unit: 'м^3'
            },
            {
                name: 'mcSumVolume',
                title: 'Общий объем магнитопровода',
                value: null,
                unit: 'м^3'
            },
            {
                name: 'mcSumMass',
                title: 'Масса магнитопровода',
                value: null,
                unit: 'кг'
            },
        ],
        calcTrPar: [
            {
                name: 'UfHV',
                title: 'Uфвн',
                value: null,
                unit: 'В'
            },
            {
                name: 'UfLV',
                title: 'Uфнн',
                value: null,
                unit: 'В'
            },
            {
                name: 'transformRatio',
                title: 'Коэффициент трансформации',
                value: null,
                unit: ''
            },
            {
                name: 'voltsByTurnCalc',
                title: 'Вольт на виток НН',
                value: null,
                unit: 'В'
            },
            {
                name: 'turnNumLV',
                title: 'Чсло витков НН, (звезда)',
                value: null,
                unit: ''
            },
            {
                name: 'turnNumHV',
                title: 'Число витковб ВН(звезда-звезда)',
                value: [],
                unit: ''
            },
            {
                name: 'nominalCurrentLV',
                title: 'Фазный ток IномНН',
                value: null,
                unit: 'А'
            },
            {
                name: 'nominalCurrentHV',
                title: 'Фазный ток IномВН',
                value: null,
                unit: 'А'
            },

        ],
        calcRimPar: [
            {
                name: 'rimH',
                title: 'Высота оправки',
                value: null,
                unit: 'мм'
            },
            {
                name: 'rimD',
                title: 'Диаметр оправки',
                value: null,
                unit: 'мм'
            },
            {
                name: 'rimL',
                title: 'Длина прямого участка',
                value: null,
                unit: 'мм'
            },

        ],
        calcCoilPar:[
            {
                name: 'cbLayersOnRim',
                title: 'Слоев картона на оправу',
                value: null,
                unit: 'сл.'
              },
        ]
    },
    mutations: {
        set_calc_trans_par_val(state, payload) {
            const index = state.calcTrPar.findIndex(_ => _.name === payload.name);
            state.calcTrPar[index].value = payload.value;
        },
        set_calc_coil_par_val(state, payload) {
            const index = state.calcCoilPar.findIndex(_ => _.name === payload.name);
            state.calcCoilPar[index].value = payload.value;
        },
        set_calc_rim_par_val(state, payload) {
            const index = state.calcRimPar.findIndex(_ => _.name === payload.name);
            state.calcRimPar[index].value = payload.value;
        },
        set_calc_magcore_par_val(state, payload) {
            const index = state.calcMCP.findIndex(_ => _.name === payload.name);
            state.calcMCP[index].value = payload.value;
        },
    },
    getters: {
        get_calcmagcoreParams: (state) => state.calcMCP,
        get_calcTransParams: (state) => state.calcTrPar,
        get_calcRimParams: (state) => state.calcRimPar,
        get_calcCoilParams: (state) => state.calcCoilPar,
        get_calcmagcoreParamsValue(state) {
            return keyword => state.calcMCP.filter(item => {
                return item.name === keyword
            });
        },
        get_calcRimParamsValue(state) {
            return keyword => state.calcRimPar.filter(item => {
                return item.name === keyword
            });
        },
        get_calcCoilParamsValue(state) {
            return keyword => state.calcCoilPar.filter(item => {
                return item.name === keyword
            });
        },
        get_calcTrParamsValue(state) {
            return keyword => state.calcTrPar.filter(item => {
                return item.name === keyword
            });
        }
    }
}