<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="this.goodVariants"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Варианты с проводом в наличии</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogShow" max-width="1000px">
            <v-card>
              <v-container id="printMe" fluid>
                <v-row justify="space-between" no-gutters>
                  <v-col align="center">
                    <h4>{{ showedItem.trName }}</h4>
                  </v-col>
                  <v-col cols="4" align="right">
                    {{ date }}
                  </v-col>
                 
                </v-row>
                <v-row justify="space-around" no-gutters>
                  
                  <hr width="100%" color="black" height="2"/>
                  
                </v-row >
                <v-row no-gutters justify-sm="space-between" class="px-8">
                  <v-col cols="12" sm="5" >
                    <h4> {{showedItem.ferrName}} </h4>
                    
                   <h4>{{showedItem.mcSquare}} </h4>
                    
                  
                   
                      <svg
                        width="280"
                        height="200"
                        viewBox="-2 -2 142 104" 
                        vector-effect="non-scaling-stroke"
                        preserveAspectRatio="xMinYMin meet"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline
                          points="0,0 0,100 120,100 120,0 100,0 100,80 70,80 70,0 50,0 50,80 20,80 20,0 0,0"
                          fill=none
                          stroke="black"
                          stroke-width="1px"
                          vector-effect="non-scaling-stroke">
                        </polyline>
                        <line x1="20" y1="20" x2="50" y2="20" stroke="black" stroke-width="1px" vector-effect="non-scaling-stroke" />
                        <line x1="20" y1="20" x2="23" y2="23" stroke="black" stroke-width="1px" vector-effect="non-scaling-stroke" />
                        <line x1="20" y1="20" x2="23" y2="17" stroke="black" stroke-width="1px" vector-effect="non-scaling-stroke" />
                        <line x1="50" y1="20" x2="47" y2="17" stroke="black" stroke-width="1px" vector-effect="non-scaling-stroke" />
                        <line x1="50" y1="20" x2="47" y2="23" stroke="black" stroke-width="1px" vector-effect="non-scaling-stroke" />

                        <line x1="50" y1="60" x2="70" y2="60" stroke="black" stroke-width="1px" vector-effect="non-scaling-stroke" />
                        <line x1="50" y1="60" x2="53" y2="63" stroke="black" stroke-width="1px" vector-effect="non-scaling-stroke" />
                        <line x1="50" y1="60" x2="53" y2="57" stroke="black" stroke-width="1px" vector-effect="non-scaling-stroke" />
                        <line x1="70" y1="60" x2="67" y2="57" stroke="black" stroke-width="1px" vector-effect="non-scaling-stroke" />
                        <line x1="70" y1="60" x2="67" y2="63" stroke="black" stroke-width="1px" vector-effect="non-scaling-stroke" />

                        <line x1="120" y1="0" x2="150" y2="0" stroke="black" stroke-width="1px" vector-effect="non-scaling-stroke" />
                        <line x1="70" y1="20" x2="150" y2="20" stroke="black" stroke-width="1px" vector-effect="non-scaling-stroke" />
                        <line x1="74" y1="20" x2="74" y2="80" stroke="black" stroke-width="1px" vector-effect="non-scaling-stroke" />
                        <line x1="74" y1="20" x2="71" y2="23" stroke="black" stroke-width="1px" vector-effect="non-scaling-stroke" />
                        <line x1="74" y1="20" x2="77" y2="23" stroke="black" stroke-width="1px" vector-effect="non-scaling-stroke" />
                        <line x1="74" y1="80" x2="71" y2="77" stroke="black" stroke-width="1px" vector-effect="non-scaling-stroke" />
                        <line x1="74" y1="80" x2="77" y2="77" stroke="black" stroke-width="1px" vector-effect="non-scaling-stroke" />

                        <line x1="124" y1="0" x2="124" y2="20" stroke="black" stroke-width="1px" vector-effect="non-scaling-stroke" />
                        <line x1="124" y1="0" x2="121" y2="3" stroke="black" stroke-width="1px" vector-effect="non-scaling-stroke" />
                        <line x1="124" y1="0" x2="127" y2="3" stroke="black" stroke-width="1px" vector-effect="non-scaling-stroke" />
                        <line
                          x1="124"
                          y1="20"
                          x2="121"
                          y2="17"
                          stroke="black" stroke-width="1px" vector-effect="non-scaling-stroke"
                        />
                        <line
                          x1="124"
                          y1="20"
                          x2="127"
                          y2="17"
                          stroke="black" stroke-width="1px" vector-effect="non-scaling-stroke"
                        />

                        <text x="25" y="15" class="small">
                          {{ showedItem.windowWidth }}
                        </text>
                        <text x="53" y="58" class="small">
                          {{ showedItem.limbWidth }}
                        </text>
                        <text x="77" y="60" class="small">
                          {{ showedItem.windowHeigth }}
                        </text>
                        <text x="127" y="15" class="small">
                          {{ showedItem.yokeHeigth }}
                        </text>
                      </svg>
                 
                  </v-col>
                  <v-col sm="2"></v-col>
                  <v-col sm="5" cols="12" > 
                    <h4>{{showedItem.rimType}}</h4>
                    <h4>{{showedItem.rimH}}</h4>
                    <h4>{{showedItem.rimD}}</h4>
                    <h4>{{showedItem.rimL}}</h4>
                  </v-col>
                </v-row>
                <v-row no-gutters justify-sm="space-between" class="px-8 mb-4">
                  <v-col cols="12" sm="5">
                    <v-row no-gutters justify-sm="space-between"> 
                      <v-col align="left" cols="6" sm="9"> 
                        
                         <h4> {{ showedItem.turnNumLV }}</h4>
                       
                      </v-col>
                      <v-col align="right" cols="6" sm="3">
                        
                         <h4> {{ showedItem.currentDensity }}</h4>
                        
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <table width="600" class="table">
                        <tr>
                          <td>Lw2</td>

                          <td colspan="2">Косые</td>
                        </tr>

                        <tr>
                          <td></td>
                          <td>{{ showedItem.minSkew }}</td>
                          <td>{{ showedItem.maxSkew }}</td>
                        </tr>
                        <tr>
                          <td>{{ showedItem.firstCoilLength }}</td>
                          <td colspan="2">{{ showedItem.skewThickLV }}</td>
                        </tr>
                        <tr>
                          <td>{{ showedItem.lastCoilLength }}</td>
                          <td colspan="2">{{ showedItem.skewThickLV }}</td>
                        </tr>
                      </table>
                    </v-row>
                    <br/>
                    <v-row no-gutters>
                      <table width="600" class="table">
                        <tr>
                          <td>Lср=</td>
                          <td>{{ showedItem.midCoilLength }}</td>
                          <td></td>
                          <td></td>
                        </tr>

                        <tr>
                          <td>Lпр=</td>
                          <td>{{ showedItem.wireLength }}</td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Pпр=</td>
                          <td>{{ showedItem.wireWeigth }}</td>
                          <td class="active">3фазы</td>
                          <td class="active">
                            {{ showedItem.wireWeigth3fLV }}
                          </td>
                        </tr>
                        <tr>
                          <td>Pкз=</td>
                          <td>{{ showedItem.lossSC }}</td>
                          <td class="active">3фазы</td>
                          <td class="active">{{ showedItem.lossSC3fLV }}</td>
                        </tr>
                      </table>
                    </v-row>
                  </v-col>
                  <v-col sm="2"/>
                  <v-col cols="12" sm="5">
                   
                        <h4 align="justify"> {{ showedItem.noteLV }}</h4>
                    
                  </v-col>
                </v-row>
                
                <!-- ВН часть -->
                <v-row no-gutters justify-sm="space-between" class="px-8">
                  <v-col cols="12" sm="5">
                    <v-row no-gutters justify="space-between" >
                      <v-col align="left" cols="6" sm="9">
                        
                        <h4>  {{ showedItem.turnNumHV }} </h4>
                        
                      </v-col>
                      <v-col align="right" cols="6" sm="3">
                        
                        <h4>  {{ showedItem.currentDensityHV }} </h4>
                       
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <table width="600" class="table">
                        <tr>
                          <td>Lw1</td>

                          <td colspan="2">Косые</td>
                        </tr>

                        <tr>
                          <td></td>
                          <td>{{ showedItem.minSkewHV }}</td>
                          <td>{{ showedItem.maxSkewHV }}</td>
                        </tr>
                        <tr>
                          <td>{{ showedItem.firstCoilLengthHV }}</td>
                          <td colspan="2">{{ showedItem.skewThickHV }}</td>
                        </tr>
                        <tr>
                          <td>{{ showedItem.lastCoilLengthHV }}</td>
                          <td colspan="2">{{ showedItem.skewThickHV }}</td>
                        </tr>
                      </table>
                    </v-row>
                    <br/>
                    <v-row no-gutters>
                      <table width="600" class="table">
                        <tr>
                          <td>Lср=</td>
                          <td>{{ showedItem.midCoilLengthHV }}</td>
                          <td></td>
                          <td></td>
                        </tr>

                        <tr>
                          <td>Lпр=</td>
                          <td>{{ showedItem.wireLengthHV }}</td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Pпр=</td>
                          <td>{{ showedItem.wireWeigthHV }}</td>
                          <td class="active">3фазы</td>
                          <td class="active">
                            {{ showedItem.wireWeigth3fLVHV }}
                          </td>
                        </tr>
                        <tr>
                          <td>Pкз=</td>
                          <td>{{ showedItem.lossSCHV }}</td>
                          <td class="active">3фазы</td>
                          <td class="active">{{ showedItem.lossSC3fLVHV }}</td>
                        </tr>
                      </table>
                    </v-row>
                  </v-col>
                   <v-col sm="2"/>
                  <v-col cols="12" sm="5">
                    
                     
                   <h4 align="justify">     {{ showedItem.noteHV }}</h4>
                     
                    
                  </v-col>
                </v-row>
               <v-row justify="space-around" no-gutters >
                 
                    <hr width="100%" color="black" height="2" />
                 
                </v-row >
                <v-row no-gutters justify="center" align="center"> 
                  <v-col sm="4"/>
                  <v-col sm="4" cols="10" align="center">
                    <table width="600" class="table" align="center">
                      <tr>
                        <td>ΣPкз=</td>
                        <td>{{ showedItem.lossSC3fAll }}</td>
                      </tr>

                      <tr>
                        <td>Вес 1 кат=</td>
                        <td>{{ showedItem.wireWeigthOneCoil }}</td>
                      </tr>
                      <tr>
                        <td>Вместимость:</td>
                        <td>{{ showedItem.capacity }}</td>
                      </tr>
                    </table>
                  </v-col>
                  <v-col sm="4"/>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeShow"
                  >ОТМЕНА</v-btn
                >
                <v-btn color="blue darken-1" text v-print="printObj"
                  >ПЕЧАТЬ</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="showItem(item, 'good')"> mdi-eye-outline </v-icon>
      </template>
      <template v-slot:no-data>
        <v-card color="#fb8c00"> Нет вариантов </v-card>
      </template>
    </v-data-table>
    <v-data-table
      :headers="headers"
      :items="this.lowStorVariants"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Варианты с недостатком провода</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="showItem(item, 'lowStotr')">
          mdi-eye-outline
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-card color="#fb8c00"> Нет вариантов </v-card>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import * as variantFilter from "../calcscripts/variantFilter";
import print from "vue-print-nb";
import numeralize from "numeralize-ru";

export default {
  data: () => ({
    dialog: false,
    dialogShow: false,
    headers: [
      {
        text: "Провод ВН",
        align: "start",
        sortable: false,
        value: "namew1",
      },
      {
        text: "Провод НН",
        align: "start",
        sortable: false,
        value: "namew2",
      },
      { text: "Просмотр", value: "actions", sortable: false, align: "end" },
    ],
    showedIndex: null,
    showedItem: {},
    printObj: {
      id: "printMe",
    },
  }),

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
      "get_calcCoilParamsValue",
      "get_addParamsValues",
      "getWires",
      "getVariantsLV",
      "getVariantsHV",
      "getGoodVariants",
      "getLowStorVariants",
    ]),
    goodVariants() {
      let variants = [];
      for (let variant of this.getGoodVariants) {
        variants.push({
          namew1: variant.wname,
          namew2: variant.variantLV.wname,
        });
      }

      return variants;
    },
    lowStorVariants() {
      let variants = [];
      for (let variant of this.getLowStorVariants) {
        variants.push({
          namew1: variant.wname,
          namew2: variant.variantLV.wname,
        });
      }

      return variants;
    },
    date() {
      let date = new Date().toISOString().substr(0, 10);
      const [year, month, day] = date.split("-");
      return `${day}.${month}.${year}`;
    },
  },

  watch: {
    dialogShow(val) {
      val || this.closeShow();
    },
  },
  directives: {
    print,
  },

  methods: {
    ...mapMutations([]),

    print() {
      this.$refs.chart.instance.print();
    },
    showItem(item, goodOrLowStor) {
      if (goodOrLowStor == "good") {
        this.showedIndex = this.goodVariants.indexOf(item);
        this.showedItemPrepare(this.showedIndex, goodOrLowStor);
        this.dialogShow = true;
      } else {
        this.showedIndex = this.lowStorVariants.indexOf(item);
        this.showedItemPrepare(this.showedIndex, goodOrLowStor);
        this.dialogShow = true;
      }
    },
    closeShow() {
      this.dialogShow = false;
    },
    getSchemmSimbol(scheem) {
      switch (scheem) {
        case "Треугольник":
          return "Д";
        case "Звезда":
          return "У";
        case "Зигзаг":
          return "Z";
        default:
          return "";
      }
    },
    showedItemPrepare(index, goodOrLowStor) {
      let getVariants;
      if (goodOrLowStor == "good") {
        getVariants = this.getGoodVariants;
      } else {
        getVariants = this.getLowStorVariants;
      }
      let symmetry;

      if (
        this.get_comParamsValues("scheemHV")[0].value ==
        this.get_comParamsValues("scheemLV")[0].value
      ) {
        symmetry = "0";
      } else {
        symmetry = "11";
      }
      let trName =
        this.get_comParamsValues("transformerType")[0].value +
        "-" +
        this.get_comParamsValues("power")[0].value +
        "/" +
        this.get_comParamsValues("ulineHV")[0].value / 1000 +
        "-" +
        this.get_comParamsValues("ulineLV")[0].value / 1000 +
        " " +
        this.getSchemmSimbol(this.get_comParamsValues("scheemHV")[0].value) +
        "/" +
        this.getSchemmSimbol(this.get_comParamsValues("scheemLV")[0].value) +
        "н-" +
        symmetry;
      this.showedItem.trName = trName;
      this.showedItem.ferrName = "Железо серое  0,35 мм прямой стык";
      this.showedItem.windowWidth = this.get_magcoreParamsValues(
        "windowWidth"
      )[0].value;
      this.showedItem.windowHeigth = this.get_magcoreParamsValues(
        "windowHeigth"
      )[0].value;
      this.showedItem.yokeHeigth = this.get_magcoreParamsValues(
        "yokeHeigth"
      )[0].value;
      this.showedItem.limbWidth = this.get_magcoreParamsValues(
        "limbWidth"
      )[0].value;
      this.showedItem.mcSquare =
        "Sмагн= " + this.get_calcmagcoreParamsValue("mcSquare")[0].value;
      let rimType;
      if (this.get_calcRimParamsValue("rimL")[0].value == 0) {
        rimType = "Оправа круг";
      } else {
        rimType = "Оправа овал";
      }
      this.showedItem.rimType = rimType;
      this.showedItem.rimH =
        "Hкат= " +
        Number(this.get_calcRimParamsValue("rimH")[0].value).toFixed(2);
      this.showedItem.rimD =
        "R= " +
        Number(this.get_calcRimParamsValue("rimD")[0].value / 2).toFixed(2);
      this.showedItem.rimL =
        "L= " + Number(this.get_calcRimParamsValue("rimL")[0].value).toFixed(2);
      //НН параметры
      this.showedItem.currentDensity =
        "  \u03B4= " +
        Number(
          this.get_calcTrParamsValue("nominalCurrentLV")[0].value /
            (getVariants[index].variantLV.wsquare *
              getVariants[index].variantLV.wiresNum)
        ).toFixed(2);
      this.showedItem.turnNumLV =
        "W2= " + this.get_calcTrParamsValue("turnNumLV")[0].value;

      //console.log(index,getVariants[index],getVariants[index].variantLV.wsquare,getVariants[index].variantLV.wiresNum);
      this.showedItem.minSkew = Number(
        getVariants[index].variantLV.minSkew
      ).toFixed(1);
      this.showedItem.maxSkew = Number(
        getVariants[index].variantLV.maxSkew
      ).toFixed(1);
      this.showedItem.firstCoilLength = Number(
        getVariants[index].variantLV.firstCoilLength
      ).toFixed(0);
      this.showedItem.lastCoilLength = Number(
        getVariants[index].variantLV.lastCoilLength
      ).toFixed(0);
      this.showedItem.midCoilLength = Number(
        getVariants[index].variantLV.midCoilLength
      ).toFixed(1);
      this.showedItem.wireLength = Number(
        getVariants[index].variantLV.wireLength
      ).toFixed(1);
      this.showedItem.wireWeigth = Number(
        getVariants[index].variantLV.wireWeigth
      ).toFixed(1);
      this.showedItem.wireWeigth3fLV = Number(
        getVariants[index].variantLV.wireWeigth3fLV
      ).toFixed(1);
      this.showedItem.lossSC = Number(
        getVariants[index].variantLV.lossSC
      ).toFixed(1);
      this.showedItem.lossSC3fLV = Number(
        getVariants[index].variantLV.lossSC3fLV
      ).toFixed(1);
      let discontinuity;
      let semiChannalsposText = this.getSemiChannalsPos(
        getVariants[index].variantLV.numSemiChannals,
        getVariants[index].variantLV.Layers
      );

      let nameStr = getVariants[index].variantLV.wname.split(" ");
      let wireProfile= (getVariants[index].variantLV.wprofile =='квадрат') ? "▭":"◯";
      let wireProfileLV='';
      for (let i=0; i<getVariants[index].variantLV.wireInLayer; i++){
        wireProfileLV= wireProfileLV + wireProfile;
      }
      wireProfileLV= ' '+ wireProfileLV+' ';
      
      if (getVariants[index].variantLV.cardboardAdding !== undefined) {
        discontinuity = "без разрыва провода";
        this.showedItem.noteLV =
          "На оправку " +
          this.get_calcCoilParamsValue("cbLayersOnRim")[0].value +
          " сл. картона " +
          this.get_addParamsValues("cardboardThick")[0].value +
          "мм.\nМотать " +
          nameStr[1] +
          " " +
          getVariants[index].variantLV.wprofileHeigth +
          "x" +
          getVariants[index].variantLV.wprofileWidth +
          wireProfileLV +
          " - в " +
          getVariants[index].variantLV.wireInLayer +
          numeralize.pluralize( getVariants[index].variantLV.wireInLayer, " провод, "," провода, "," проводов, ") +
          (getVariants[index].variantLV.Layers - 1) +
          numeralize.pluralize(getVariants[index].variantLV.Layers - 1, 
            " слой",
            " слоя",
            " слоев"
          ) +
          " по " +
          getVariants[index].variantLV.turnNuminLayerLV +
          numeralize.pluralize(getVariants[index].variantLV.turnNuminLayerLV, " витку "," витка "," витков ") +
          discontinuity +
          ", " +
          getVariants[index].variantLV.Layers +
          "  слой " +
          getVariants[index].variantLV.turnNuminLastLayerLV +
          numeralize.pluralize(getVariants[index].variantLV.turnNuminLayerLV, " виток."," витка."," витков.")+
          "\nИзоляция 2 слоя бумаги " +
          this.get_addParamsValues("paperThick")[0].value +
          " мм.\n" +
          semiChannalsposText +
          "Картон на последний слой " +
          Math.round(getVariants[index].variantLV.cardboardAdding) +
          "мм на " +
          Math.round(getVariants[index].variantLV.lastCoilLength) +
          "мм.";
        ////
      } else {
        discontinuity = "с разрывом провода";
        this.showedItem.noteLV =
          "На оправку " +
          this.get_calcCoilParamsValue("cbLayersOnRim")[0].value +
          " сл. картона " +
          this.get_addParamsValues("cardboardThick")[0].value +
          "мм.\nВ " +
          getVariants[index].variantLV.wireInLayer +
          numeralize.pluralize( getVariants[index].variantLV.wireInLayer, " провод, "," провода, "," проводов, ") +
          nameStr[1] +
          " " +
          getVariants[index].variantLV.wprofileHeigth +
          "x" +
          getVariants[index].variantLV.wprofileWidth +
          wireProfileLV +
          " - " +
          getVariants[index].variantLV.Layers +
          numeralize.pluralize(Number(getVariants[index].variantLV.Layers)," раз", " раза"," раз") +
          " по " +
          this.get_calcTrParamsValue("turnNumLV")[0].value +
          numeralize.pluralize(this.get_calcTrParamsValue("turnNumLV")[0].value, " витку "," витка "," витков ") +
          discontinuity +
          ".\nИзоляция 2 слоя бумаги " +
          this.get_addParamsValues("paperThick")[0].value +
          " мм.\n" +
          semiChannalsposText;
      }
      let wireHeigthLV =
        getVariants[index].variantLV.wprofileHeigth +
        getVariants[index].variantLV.wisThick * 2;
      let skewThickLV15 =
        Number(Math.round(wireHeigthLV / 1.5)) > 0
          ? String("1.5 - " + Math.round(wireHeigthLV / 1.5) + " шт. ")
          : "";

      let skewThickLV05 =
        Number(wireHeigthLV - Math.round(wireHeigthLV / 1.5) * 1.5) > 0
          ? String(
              "0.5 - " +
                Math.round(
                  (wireHeigthLV - Math.round(wireHeigthLV / 1.5) * 1.5) / 0.5
                ) +
                " шт. "
            )
          : "";
      this.showedItem.skewThickLV = skewThickLV15 + skewThickLV05;

      //ВН параметры
      this.showedItem.currentDensityHV =
        "  \u03B4= " +
        Number(
          this.get_calcTrParamsValue("nominalCurrentHV")[0].value /
            (getVariants[index].wsquare * getVariants[index].wiresNum)
        ).toFixed(2);
      this.showedItem.turnNumHV =
        "W1= " + this.get_calcTrParamsValue("turnNumHV")[0].value;
      //console.log(index,getVariants[index],getVariants[index].variantLV.wsquare,getVariants[index].variantLV.wiresNum);
      this.showedItem.minSkewHV = Number(getVariants[index].minSkew).toFixed(1);
      this.showedItem.maxSkewHV = Number(getVariants[index].maxSkew).toFixed(1);
      this.showedItem.firstCoilLengthHV = Number(
        getVariants[index].firstCoilLength
      ).toFixed(0);
      this.showedItem.lastCoilLengthHV = Number(
        getVariants[index].lastCoilLength
      ).toFixed(0);
      this.showedItem.midCoilLengthHV = Number(
        getVariants[index].midCoilLength
      ).toFixed(1);
      this.showedItem.wireLengthHV = Number(
        getVariants[index].wireLength
      ).toFixed(1);
      this.showedItem.wireWeigthHV = Number(
        getVariants[index].wireWeigth
      ).toFixed(1);
      this.showedItem.wireWeigth3fLVHV = Number(
        getVariants[index].wireWeigth3fHV
      ).toFixed(1);
      this.showedItem.lossSCHV = Number(getVariants[index].lossSC).toFixed(1);
      this.showedItem.lossSC3fLVHV = Number(
        getVariants[index].lossSC3fHV
      ).toFixed(1);
      let wireProfileHV= (getVariants[index].wprofile =='квадрат') ? " ▭ ":" ◯ ";
      let discontinuityHV = "без разрыва";
      let semiChannalsposHVtext = this.getSemiChannalsPos(
        getVariants[index].numSemiChannals,
        getVariants[index].Layers
      );
      let nameStrHV = getVariants[index].wname.split(" ");
      this.showedItem.noteHV =
        "После W2 -  2 слоя картона " +
        this.get_addParamsValues("cardboardThick")[0].value +
        " мм, канал 6 мм, 2 слоя картона " +
        this.get_addParamsValues("cardboardThick")[0].value +
        "мм.\nМотать " +
        nameStrHV[1] +
        " " +
        getVariants[index].wprofileHeigth +
        "x" +
        getVariants[index].wprofileWidth +
        wireProfileHV +
        " - " +
        String(getVariants[index].Layers - 1) +
        numeralize.pluralize(
          getVariants[index].Layers - 1,
          " слой",
          " слоя",
          " слоев"
        ) +
        " по " +
        getVariants[index].turnNuminLayerHV +
        numeralize.pluralize(getVariants[index].turnNuminLayerHV, " витку "," витка "," витков ") +
        discontinuityHV +
        ", " +
        getVariants[index].Layers +
        "  слой " +
        getVariants[index].turnNuminLastLayerHV +
        numeralize.pluralize(getVariants[index].turnNuminLastLayerHV, " виток"," витка"," витков") +
        ".\nИзоляция 2 слоя бумаги " +
        this.get_addParamsValues("paperThick")[0].value +
        " мм.\n" +
        semiChannalsposHVtext +
        "Картон на последний слой " +
        Math.round(getVariants[index].cardboardAdding) +
        "мм на " +
        Math.round(getVariants[index].lastCoilLength) +
        "мм.";
      this.showedItem.lossSC3fAll =
        Number(
          Number(this.showedItem.lossSC3fLV) +
            Number(this.showedItem.lossSC3fLVHV)
        ).toFixed(0) +
        " < " +
        variantFilter.getLossSCgrade(
          this.get_comParamsValues("power")[0].value,
          this.get_comParamsValues("scheemLV")[0].value,
          this.get_comParamsValues("scheemHV")[0].value
        );
      this.showedItem.wireWeigthOneCoil = Number(
        (getVariants[index].wireWeigth +
          getVariants[index].variantLV.wireWeigth) *
          1.1
      ).toFixed(1);
      this.showedItem.capacity =
        Number(getVariants[index].radDimofCoilHV * 2).toFixed(1) +
        " < " +
        (Number(this.showedItem.windowWidth) +
          Number(this.showedItem.limbWidth));
      let wireHeigthHV =
        getVariants[index].wprofileHeigth + getVariants[index].wisThick * 2;
      let skewThickHV15 =
        Number(Math.round(wireHeigthHV / 1.5)) > 0
          ? String("1.5 - " + Math.round(wireHeigthHV / 1.5) + " шт. ")
          : "";

      let skewThickHV05 =
        Number(wireHeigthHV - Math.round(wireHeigthHV / 1.5) * 1.5) > 0
          ? String(
              "0.5 - " +
                Math.round(
                  (wireHeigthHV - Math.round(wireHeigthHV / 1.5) * 1.5) / 0.5
                ) +
                " шт. "
            )
          : "";
      this.showedItem.skewThickHV = skewThickHV15 + skewThickHV05;
      //console.log(this.showedItem.noteHV);
    },
    getSemiChannalsPos: function (numSemiChannals, layers) {
      let text = "";
      switch (numSemiChannals) {
        case 1:
          switch (layers) {
            case 5:
              text = "2";
              break;
            case 6:
              text = "3";
              break;
            case 7:
              text = "4";
              break;
            case 8:
              text = "4";
              break;
          }
          break;
        case 2:
          switch (layers) {
            case 9:
              text = "3, 6";
              break;
            case 10:
              text = "4, 7";
              break;
            case 11:
              text = "4, 8";
              break;
            case 12:
              text = "4, 8";
              break;
          }
          break;
        case 3:
          switch (layers) {
            case 13:
              text = "4, 7, 10";
              break;
            case 14:
              text = "4, 8, 11";
              break;
            case 15:
              text = "4, 8, 12";
              break;
            case 16:
              text = "4, 8, 12";
              break;
          }
      }
      if (text) {
        return (
          "После " +
          text +
          " слоя полуканал " +
          this.get_addParamsValues("channalThick")[0].value +
          " мм.\n"
        );
      } else {
        return text;
      }
    },    
  },
};
</script>


<style>

hr {
  margin: 8px;
  
}
.small {
  font: 8px sans-serif;
}
.table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  font: 12px sans-serif;
  font-weight: bold;
}
.table th,
.table td {
  border: 1px solid #888;
  padding: 0px;
  text-align: center;
  vertical-align: middle;
  position: relative;
}
.active:after {
  content: "";
  position: absolute;
  top: -1px;
  right: -1px;
  bottom: -1px;
  left: -1px;
  border: 2px solid black;
}
@media print {
  body,
  .scroll-y {
    overflow: visible !important;
    height: auto !important;
  }
}
</style>
