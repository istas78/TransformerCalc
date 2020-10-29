<template>
  <v-container fluid grid-list-sm>
    <v-layout row align-left>
      <v-flex md2>
        <v-layout column>
          <v-btn @click="calcResult"> Расчет</v-btn>
          <v-flex
            class="pa-1"
            v-for="param in get_calcmagcoreParams"
            :key="param.name"
          >
            <v-text-field
              v-model="param.value"
              outlined
              dense
              :label="param.title"
              :suffix="param.unit"
            ></v-text-field>
          </v-flex>

          <v-flex
            class="pa-1"
            v-for="param in get_calcTransParams"
            :key="param.name"
          >
            <v-text-field
              v-model="param.value"
              outlined
              dense
              :label="param.title"
              :suffix="param.unit"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md2>
        <v-layout column>
          <v-flex
            class="pa-1"
            v-for="param in get_calcRimParams"
            :key="param.name"
          >
            <v-text-field
              v-model="param.value"
              outlined
              dense
              :label="param.title"
              :suffix="param.unit"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>
</style>

<script>
import { mapGetters, mapMutations } from "vuex";
import * as calcCoilLV from "../calcscripts/calcCoilLv";
import * as calcCoilHV from "../calcscripts/calcCoilHv";
import * as variantFilter from "../calcscripts/variantFilter";

export default {
  computed: {
    ...mapGetters([
      "get_comParams",
      "get_addParams",
      "get_magcoreParams",
      "get_magcoreParamsValues",
      "get_stepsParams",
      "get_calcmagcoreParams",
      "get_calcTransParams",
      "get_comParamsValues",
      "get_calcmagcoreParamsValue",
      "get_calcRimParams",
      "get_calcRimParamsValue",
      "get_calcTrParamsValue",
      "get_addParamsValues",
      "getWires",
      "getVariantsLV",
      "getVariantsHV",
      "getGoodVariants",
      "getLowStorVariants",
      "get_calcCoilParamsValue",
      "get_calcCoilParams",
    ]),
  },
  methods: {
    ...mapMutations([
      "set_com_par_val",
      "set_add_par_val",
      "set_magcore_par_val",
      "set_steps_par_val",
      "set_calc_magcore_par_val",
      "set_calc_trans_par_val",
      "set_calc_rim_par_val",
      "set_calc_coil_par_val",
      "SET_VARIANTSLV",
      "SET_VARIANTSHV",
      "SET_WIRES",
      "NULL_WIRES",
      "SET_GLSVARIANTS"
    ]),
    calcResult() {
      this.wireSort();
      this.calcMagCorePar();
      this.calcTransPar();
      this.calcRimPar();
      this.calcColiPar();
      this.SET_VARIANTSLV(
        calcCoilLV.calcCoilLV(
          this.get_calcTrParamsValue("nominalCurrentLV")[0].value,
          this.get_addParamsValues("currentDensityMaxLV")[0].value,
          this.get_addParamsValues("currentDensityMinLV")[0].value,
          this.getWires,
          this.get_addParamsValues("maxWireInLayerNumLV")[0].value,
          this.get_addParamsValues("maxLayersNumLV")[0].value,
          this.get_calcTrParamsValue("turnNumLV")[0].value,
          this.get_calcRimParamsValue("rimH")[0].value,
          this.get_calcRimParamsValue("rimD")[0].value,
          this.get_calcRimParamsValue("rimL")[0].value,
          this.get_addParamsValues("rimCoilHeightDif")[0].value,
          this.get_addParamsValues("isThickLV")[0].value,
          this.get_addParamsValues("cardboardThick")[0].value,
          this.get_addParamsValues("paperThick")[0].value,
          this.get_addParamsValues("wireDensity")[0].value,
          this.get_addParamsValues("wireResistance")[0].value,
          this.get_calcCoilParamsValue("cbLayersOnRim")[0].value,
          this.get_addParamsValues("channalThick")[0].value,
        )
      );
      this.SET_VARIANTSHV(
        calcCoilHV.calcCoilHV(
          this.get_calcTrParamsValue("nominalCurrentHV")[0].value,
          this.get_addParamsValues("currentDensityMaxHV")[0].value,
          this.get_addParamsValues("currentDensityMinHV")[0].value,
          this.getWires,
          this.get_addParamsValues("maxWireInLayerNumHV")[0].value,
          this.get_calcTrParamsValue("turnNumHV")[0].value,
          this.get_calcRimParamsValue("rimH")[0].value,
          this.get_calcRimParamsValue("rimL")[0].value,
          this.get_addParamsValues("rimCoilHeightDif")[0].value,
          this.get_addParamsValues("isThickHV")[0].value,
          this.get_addParamsValues("cardboardThick")[0].value,
          this.get_addParamsValues("paperThick")[0].value,
          this.get_addParamsValues("wireDensity")[0].value,
          this.get_addParamsValues("wireResistance")[0].value,
          this.getVariantsLV,
          this.get_addParamsValues("channalThick")[0].value,
          this.get_addParamsValues("numSemiChannals")[0].value
        )
      );
      this.SET_GLSVARIANTS(variantFilter.variantFilter(
        this.getVariantsHV,
        this.get_magcoreParamsValues("windowWidth")[0].value,
        this.get_magcoreParamsValues("limbWidth")[0].value,
        this.get_comParamsValues("power")[0].value,
        this.get_comParamsValues("scheemHV")[0].value,
        this.get_comParamsValues("scheemLV")[0].value,
        this.get_calcTrParamsValue("nominalCurrentLV")[0].value,
        this.get_calcTrParamsValue("nominalCurrentHV")[0].value,
        this.get_addParamsValues("coilCoilClearance")[0].value,
        this.get_addParamsValues("currentDensityAllMin")[0].value,
        this.get_addParamsValues("currentDensityAllMax")[0].value
      ));
      //console.log(this.getGoodVariants);
      //console.log(this.getLowStorVariants);
    },
    calcTransPar() {
      let UfHV;
      if (this.get_comParamsValues("scheemHV")[0].value != "Треугольник") {
        UfHV = Number(this.get_comParamsValues("ulineHV")[0].value) / 1.732;
      } else {
        UfHV = Number(this.get_comParamsValues("ulineHV")[0].value);
      }
      this.set_calc_trans_par_val({
        name: "UfHV",
        value: Number(UfHV).toFixed(1),
      });
      let UfLV;
      if (this.get_comParamsValues("scheemLV")[0].value != "Треугольник") {
        UfLV = Number(this.get_comParamsValues("ulineLV")[0].value) / 1.732;
      } else {
        UfLV = Number(this.get_comParamsValues("ulineLV")[0].value);
      }
      this.set_calc_trans_par_val({
        name: "UfLV",
        value: Number(UfLV).toFixed(1),
      });
      let transformRatio = Number(UfHV / UfLV).toFixed(2);
      this.set_calc_trans_par_val({
        name: "transformRatio",
        value: Number(transformRatio).toFixed(1),
      });

      let voltsByTurnCalc;
      if (this.get_magcoreParamsValues("voltsByTurn")[0].value) {
        voltsByTurnCalc = Number(
          this.get_magcoreParamsValues("voltsByTurn")[0].value
        );
      } else {
        voltsByTurnCalc = Number(
          222 *
            this.get_comParamsValues("frecuency")[0].value *
            this.get_comParamsValues("iduction")[0].value *
            this.get_calcmagcoreParamsValue("mcSquare")[0].value *
            1e-4
        );
      }
      this.set_calc_trans_par_val({
        name: "voltsByTurnCalc",
        value: Number(voltsByTurnCalc).toFixed(1),
      });
      let turnNumLV;
      if (this.get_magcoreParamsValues("turnNumLVExp")[0].value) {
        turnNumLV = Number(
          this.get_magcoreParamsValues("turnNumLVExp")[0].value
        );
      } else {
        turnNumLV = Math.ceil(
          Number(
            10840 /
              (this.get_comParamsValues("iduction")[0].value *
                this.get_calcmagcoreParamsValue("mcSquare")[0].value)
          )
        );
      }
      this.set_calc_trans_par_val({
        name: "turnNumLV",
        value: Number(turnNumLV).toFixed(0),
      });
      let turnNumHV = Math.ceil(turnNumLV * transformRatio);
      let turnNumHVPBV = [];
      let brunchNum =
        this.get_comParamsValues("regVoltageregion")[0].value /
        this.get_comParamsValues("regVoltageStep")[0].value;
     // let turnNumHVPBVRegin =
        (turnNumHV * this.get_comParamsValues("regVoltageregion")[0].value) /
        100;
     // let turnNumHVPBVStep = Math.ceil(turnNumHVPBVRegin / brunchNum);
      for (let i = -1 * Math.floor(brunchNum); i <= Math.floor(brunchNum); i++) {
        turnNumHVPBV.push(Math.round(turnNumHV + i *Number(this.get_comParamsValues("regVoltageStep")[0].value)/100*turnNumHV));
      }
      this.set_calc_trans_par_val({
        name: "turnNumHV",
        value: turnNumHVPBV,
      });
      let nominalCurrentLV =
        (this.get_comParamsValues("power")[0].value * 1000) / 3 / UfLV;
      if (this.get_comParamsValues("scheemLV")[0].value === "Треугольник") {
        nominalCurrentLV = nominalCurrentLV * 1.732;
      }
      this.set_calc_trans_par_val({
        name: "nominalCurrentLV",
        value: Number(nominalCurrentLV).toFixed(1),
      });
      let nominalCurrentHV =
        (this.get_comParamsValues("power")[0].value * 1000) / 3 / UfHV;
      if (this.get_comParamsValues("scheemLV")[0].value === "Треугольник") {
        nominalCurrentHV = nominalCurrentHV * 1.732;
      }
      this.set_calc_trans_par_val({
        name: "nominalCurrentHV",
        value: Number(nominalCurrentHV).toFixed(1),
      });
    },
    calcRimPar() {
      let rimH;
       if(this.get_addParamsValues("rimH")[0].value){
          rimH=this.get_addParamsValues("rimH")[0].value;
      }else{
      if (this.get_comParamsValues("power")[0].value <= 630) {
        rimH = this.get_magcoreParamsValues("windowHeigth")[0].value - 20;
      } else {
        rimH = this.get_magcoreParamsValues("windowHeigth")[0].value - 30;
      }
      }
      this.set_calc_rim_par_val({
        name: "rimH",
        value: Number(rimH).toFixed(0),
      });
      let rimD;
      if(this.get_addParamsValues("rimD")[0].value){
          rimD=this.get_addParamsValues("rimD")[0].value;
      }else{
      
     rimD =
        2 *
        (Number(this.get_stepsParams[0][0].value) / 2 +
          Number(this.get_addParamsValues("rodRimClearance")[0].value));
      }
      this.set_calc_rim_par_val({
        name: "rimD",
        value: Number(rimD).toFixed(0),
      });
      let rimL;
      if(this.get_addParamsValues("rimL")[0].value){
          rimL=this.get_addParamsValues("rimL")[0].value;
      }else{
      rimL =
        this.get_calcmagcoreParamsValue("mcProfileMaxRad")[0].value - rimD;
      if (rimL < 0) {
        rimL = 0;
      }
      }
      this.set_calc_rim_par_val({
        name: "rimL",
        value: Number(rimL).toFixed(0),
      });
    },
    calcMagCorePar() {
      let mcSquare = 0;
      let mcProfileMaxRad = 0;
      let heigthSum = 0;
      for (var step of this.get_stepsParams) {
        let heigth = step[1].value;
        let width = step[0].value;
        heigthSum += heigth / 2;
        let radius = Math.sqrt(heigthSum * heigthSum + (width * width) / 4) * 2;
        if (radius > mcProfileMaxRad) {
          mcProfileMaxRad = radius;
        }
        mcSquare += heigth * width;
      }
      this.set_calc_magcore_par_val({
        name: "mcSquare",
        value: Number(mcSquare/100).toFixed(0),
      });
      this.set_calc_magcore_par_val({
        name: "mcProfileMaxRad",
        value: Number(mcProfileMaxRad).toFixed(0),
      });
      let mcVolume =
        ((Number(mcSquare) / 1e6) *
          (Number(this.get_magcoreParamsValues("windowHeigth")[0].value)/1000 +
            2 * Number(this.get_magcoreParamsValues("yokeHeigth")[0].value)/1000) *
          3);
      this.set_calc_magcore_par_val({
        name: "mcVolume",
        value: Number(mcVolume).toFixed(3),
      });
      let yokesVolume =
        (this.get_magcoreParamsValues("yokeHeigth")[0].value *
          this.get_magcoreParamsValues("yokeWidth")[0].value *
          this.get_magcoreParamsValues("yokeDepth")[0].value *
          4) /
        1e9;
      this.set_calc_magcore_par_val({
        name: "yokesVolume",
        value: Number(yokesVolume).toFixed(3),
      });
      this.set_calc_magcore_par_val({
        name: "mcSumVolume",
        value: Number(yokesVolume + mcVolume).toFixed(3),
      });
      this.set_calc_magcore_par_val({
        name: "mcSumMass",
        value:
          (Number(Number(yokesVolume) + Number(mcVolume)) *
          Number(this.get_magcoreParamsValues("ferrSteelDensity")[0].value)).toFixed(0),
      });
    },
    wireSort() {
      let tmp = [];
      let i = 0;
      for (let wire of this.getWires) {
       tmp.push(Object.assign({}, wire));
        i++;
      }
      tmp.sort(function (a, b) {
        return a.wname.localeCompare(b.wname);
      });
      var goodWiresDf = [];
      i = 0;
      for (; i < tmp.length - 1; i++) {
        if (tmp[i].wname != tmp[i + 1].wname) {
          goodWiresDf.push(tmp[i]);
        } else {
          tmp[i + 1].wquantity = tmp[i+1].wquantity + tmp[i].wquantity;
        }
      }
      goodWiresDf.push(tmp[i]);
      this.NULL_WIRES();
      this.SET_WIRES(goodWiresDf);
    },
    calcColiPar() {
      if(this.get_comParamsValues("ulineHV")[0].value<= 6000){
        this.set_calc_coil_par_val({
        name: "cbLayersOnRim",
        value: 4
        });
      }else if(this.get_comParamsValues("ulineHV")[0].value<= 10000){
        this.set_calc_coil_par_val({
        name: "cbLayersOnRim",
        value: 6
        });
      }else if(this.get_comParamsValues("ulineHV")[0].value<=15000){
        this.set_calc_coil_par_val({
        name: "cbLayersOnRim",
        value: 8
        });
      }
    }
  },
};
</script>