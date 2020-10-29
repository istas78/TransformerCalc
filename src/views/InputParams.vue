<template>
  <v-container fluid grid-list-sm>
    <v-layout row>
      <v-flex md4
        ><h3>Основные параметры трансформатора</h3>
        <v-layout align-start justify-space-between row>
          <v-flex>
            <v-layout row class="pa-1">
              <v-flex
                md6
                class="pa-1"
                v-for="param in get_comParams"
                :key="param.name"
              >
                <v-text-field
                  v-model="param.value"
                  v-if="param.type == 'input'"
                  outlined
                  dense
                  :label="param.title"
                  :suffix="param.suffix"
                  @change="setComParams(param.name, param.value)"
                ></v-text-field>
                <v-select
                  v-model="param.value"
                  v-if="param.type == 'select'"
                  outlined
                  dense
                  :items="param.select"
                  :label="param.title"
                  :suffix="param.suffix"
                  @change="setComParams(param.name, param.value)"
                ></v-select>
              </v-flex>
            </v-layout>
            <h3>Параметры для расчета</h3>
            <v-layout row class="pa-1">
              <v-flex
                md6
                class="pa-1"
                v-for="param in get_addParams"
                :key="param.name"
              >
                <v-text-field
                  v-model="param.value"
                  v-if="param.type == 'input'"
                  outlined
                  dense
                  :label="param.title"
                  :suffix="param.suffix"
                  @change="setAddParams(param.name, param.value)"
                ></v-text-field>
                <v-select
                  v-model="param.value"
                  v-if="param.type == 'select'"
                  outlined
                  dense
                  :items="param.select"
                  :label="param.title"
                  :suffix="param.suffix"
                  @change="setAddParams(param.name, param.value)"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md4
        ><h3>Параметры магнитопровода</h3>
        <v-layout align-start justify-start row fill-height>
          <v-flex md6>
            <v-layout column class="pa-1">
              <v-flex
                md6
                class="pa-1"
                v-for="param in get_magcoreParams"
                :key="param.name"
              >
                <v-text-field
                  v-model="param.value"
                  v-if="param.type == 'input'"
                  outlined
                  dense
                  :label="param.title"
                  :suffix="param.suffix"
                  @change="setMagCoreParams(param.name, param.value)"
                ></v-text-field>
                <v-select
                  v-model="param.value"
                  v-if="param.type == 'select'"
                  outlined
                  dense
                  :items="param.select"
                  :label="param.title"
                  :suffix="param.suffix"
                  @change="setMagCoreParams(param.name, param.value)"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex md6>
            <v-layout column class="pa-1">
              <v-flex
                class="pa-1"
                v-for="(bparam, i) of get_stepsParams"
                :key="`get_stepsParams${i}`"
              >
                <v-layout row>
                  <v-flex
                    md6
                    class="pa-1"
                    v-for="param in bparam"
                    :key="param.name"
                  >
                    <v-text-field
                      v-model="param.value"
                      v-if="param.type == 'input'"
                      outlined
                      dense
                      :label="param.title"
                      :suffix="param.suffix"
                      @change="setStepsParams(param.name, param.value)"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md4>
        <h3>Номенклатура и наличие провода на складе</h3>
        <wire-list></wire-list>
      </v-flex>
    </v-layout>
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
  },
  methods: {
    ...mapMutations([
      "set_com_par_val",
      "set_add_par_val",
      "set_magcore_par_val",
      "set_steps_par_val",
    ]),
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
        (turnNumLVExp === 'Infinity' ) ? turnNumLVExp='': '';
        this.set_magcore_par_val({
        name: 'turnNumLVExp',
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
        (voltsByTurn === 'Infinity' ) ? voltsByTurn='': '';
        this.set_magcore_par_val({
        name: 'voltsByTurn',
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