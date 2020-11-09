<template>
 
 <v-container fluid grid-list-sm>
   <div></div>
    <v-row no-gutters>
      <v-col cols="12" lg="8" xs="12" class="pr-1">
       
        <v-row no-gutters>
          <v-col 
            class="pa-0"
            cols="12"
            lg="6"
            xs="12">
          <h4>Основные параметры трансформатора</h4>
          </v-col>
          <v-col
            class="pa-0"
            cols="12"
            lg="3"
            xs="12"
            v-for="param in get_comParams"
            :key="param.name"
          >
            <v-text-field
              background-color="#E3F2FD"
              v-model="param.value"
              v-if="param.type == 'input'"
              outlined
              dense
              :value="param.value"
              :rules="[(v) => inputRule.test(v) || v == null || '']"
              :label="labelValidate(param)"
              :suffix="param.suffix"
              @change="setComParams(param.name, param.value)"
            ></v-text-field>
            <v-select
            background-color="#E3F2FD"
              v-model="param.value"
              v-if="param.type == 'select'"
              outlined
              dense
              :items="param.select"
              :label="param.title"
              :suffix="param.suffix"
              @change="setComParams(param.name, param.value)"
            ></v-select>
          </v-col>
        </v-row>
      
        <v-row no-gutters>
          <v-col 
            class="pa-0"
           cols="12"
            lg="3"
            xs="12">
          <h4 class="pa-0">Параметры для расчета</h4>
          </v-col>
          <v-col
            class="pa-0"
            cols="12"
            lg="3"
            xs="12"
            v-for="param in get_addParams"
            :key="param.name"
          >
            <v-text-field
            background-color="#e0f7fa"
              v-model="param.value"
              v-if="param.type == 'input'"
              outlined
              dense
              :rules="[(v) => inputRule.test(v) || v == null || '']"
              :label="labelValidate(param)"
              :suffix="param.suffix"
              @change="setAddParams(param.name, param.value)"
            ></v-text-field>
            <v-select
            background-color="#e0f7fa"
              v-model="param.value"
              v-if="param.type == 'select'"
              outlined
              dense
              :items="param.select"
              :label="param.title"
              :suffix="param.suffix"
              @change="setAddParams(param.name, param.value)"
            ></v-select>
          </v-col>
        </v-row>
       
        <v-row no-gutters>
          <v-col 
          class="pa-0"
          cols="12"
            lg="9"
            xs="12">
          <h4>Параметры магнитопровода</h4>
          </v-col>
          <v-col
          class="pa-0"
            cols="12"
            lg="3"
            xs="12"
            v-for="param in get_magcoreParams"
            :key="param.name"
          >
            <v-text-field
            background-color="#e8f5e9"
              v-model="param.value"
              v-if="param.type == 'input'"
              outlined
              dense
              :rules="[(v) => inputRule.test(v) || v == null || '']"
              :label="labelValidate(param)"
              :suffix="param.suffix"
              @change="setMagCoreParams(param.name, param.value)"
            ></v-text-field>
            <v-select
            background-color="#e8f5e9"
              v-model="param.value"
              v-if="param.type == 'select'"
              outlined
              dense
              :items="param.select"
              :label="param.title"
              :suffix="param.suffix"
              @change="setMagCoreParams(param.name, param.value)"
            ></v-select>
          </v-col>
        </v-row>
        <v-row no-gutters justify-lg ="space-between">
         
          <v-col 
          class="pa-0"           
            lg="2"
            sm="12"
            cols="12"
            v-for="(bparam, i) of stepsParamsForTemplate1_5"
            :key="`get_stepsParams${i}`"
          >
            <v-row v-for="param in bparam" :key="param.name" no-gutters >
              <v-text-field
              background-color="#e8f5e9"
                v-model="param.value"
                v-if="param.type == 'input'"
                outlined
                dense
                :rules="[(v) => inputRule.test(v) || v == null || '']"
                :label="labelValidate(param)"
                :suffix="param.suffix"
                @change="setStepsParams(param.name, param.value)"
              ></v-text-field>
               
            </v-row>
          </v-col>
          </v-row>
         <v-row no-gutters justify ="space-between">
          
            <v-col 
            class="pa-0"
          
            
            lg="2"
            cols="12"
            v-for="(bparam, i) of stepsParamsForTemplate6_10"
            :key="`get_stepsParams${i}`"
          >
            <v-row v-for="param in bparam" :key="param.name" no-gutters>
              <v-text-field
              background-color="#e8f5e9"
                v-model="param.value"
                v-if="param.type == 'input'"
                outlined
                dense
                :rules="[(v) => inputRule.test(v) || v == null || '']"
                :label="labelValidate(param)"
                :suffix="param.suffix"
                @change="setStepsParams(param.name, param.value)"
              ></v-text-field>
               
            </v-row>
          
          </v-col>
          
        </v-row>
       
      </v-col>
      <v-col class="pa-0" cols="12" lg="4" xs="12">
        <h4>Номенклатура и наличие провода на складе</h4>
        <wire-list></wire-list>
      </v-col>
    </v-row>
    
 </v-container>
</template>

<script>
import WireList from "@/components/WireList";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    WireList,
  },
  data() {
    return {
      value: null,
    };
  },
  computed: {
    ...mapGetters([
      "get_comParams",
      "get_addParams",
      "get_magcoreParams",
      "get_stepsParams",
      "get_comParamsValues",
    ]),
    // ...mapState(["params"])
    inputRule() {
      return /^\d+[.]?\d*$|^\d*$/;
    },
    stepsParamsForTemplate1_5() {
      let stepsParams1_5 = [];
      for (let i = 0; i < 5; i++) {
        stepsParams1_5.push(this.get_stepsParams[i]);
      }
      return stepsParams1_5;
    },
    stepsParamsForTemplate6_10() {
      let stepsParams6_10 = [];
      for (let i = 0; i < 5; i++) {
        stepsParams6_10.push(this.get_stepsParams[i + 5]);
      }
      return stepsParams6_10;
    },
  },
  methods: {
    ...mapMutations([
      "set_com_par_val",
      "set_add_par_val",
      "set_magcore_par_val",
      "set_steps_par_val",
    ]),
    labelValidate: function (item) {
      if (item.value == null) {
        return item.title;
      }
      if (this.inputRule.test(item.value)) {
        return item.title;
      } else {
        return "Только цифры и .";
      }
    },
    setComParams: function (parname, parvalue) {
      this.set_com_par_val({
        name: parname,
        value: parvalue,
      });
    },
    setAddParams: function (parname, parvalue) {
      this.set_add_par_val({
        name: parname,
        value: parvalue,
      });
    },
    setMagCoreParams: function (parname, parvalue) {
      if (parname == "voltsByTurn") {
        let UfLV;
        if (this.get_comParamsValues("scheemLV")[0].value != "Треугольник") {
          UfLV = Number(this.get_comParamsValues("ulineLV")[0].value) / 1.732;
        } else {
          UfLV = Number(this.get_comParamsValues("ulineLV")[0].value);
        }
        let turnNumLVExp = Number(UfLV / parvalue).toFixed(0);
        console.log(turnNumLVExp);
        turnNumLVExp === "Infinity" ? (turnNumLVExp = "") : "";
        this.set_magcore_par_val({
          name: "turnNumLVExp",
          value: turnNumLVExp,
        });
      }
      if (parname == "turnNumLVExp") {
        let UfLV;
        if (this.get_comParamsValues("scheemLV")[0].value != "Треугольник") {
          UfLV = Number(this.get_comParamsValues("ulineLV")[0].value) / 1.732;
        } else {
          UfLV = Number(this.get_comParamsValues("ulineLV")[0].value);
        }
        let voltsByTurn = Number(UfLV / parvalue).toFixed(1);
        voltsByTurn === "Infinity" ? (voltsByTurn = "") : "";
        this.set_magcore_par_val({
          name: "voltsByTurn",
          value: voltsByTurn,
        });
      }
      this.set_magcore_par_val({
        name: parname,
        value: parvalue,
      });
    },
    setStepsParams: function (parname, parvalue) {
      this.set_steps_par_val({
        name: parname,
        value: parvalue,
      });
    },
  },
};
</script>

<style>
.v-messages {
  flex: 1 1 auto;
  font-size: 12px;
  min-height: 0px;
  max-height: 0px;
  min-width: 1px;
  position: relative;
}
.v-text-field__details {
  display: flex;
  margin-bottom: 0px;
  flex: 1 0 auto;
  max-width: 100%;
  min-height: 0px;
  overflow: hidden;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 0px;
}
</style>