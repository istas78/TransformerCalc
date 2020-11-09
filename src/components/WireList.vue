<template>
  <div>
    <v-file-input
      v-model="files"
      accept=".xls, .xlsx"
      @change="onchange"
      @click:clear="null_wires"
      label="Загрузука файла выгруженного из 1С"
      placeholder="Выберите файл *.xls"
      prepend-icon="mdi-paperclip"
      outlined
      dense
      truncate-length="30"
      :show-size="1000"
    ></v-file-input>
    <!-- <br/>
		<button type="button" id="export-table" style="visibility:hidden" @click="onexport">Export to XLSX</button>
		<br/> -->
    <div>
      <v-data-table
        :headers="headers"
        :items="this.getWires"
        :search="search"
         class="elevation-1"
        :items-per-page="5"
      ></v-data-table>
      <!-- <div class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
      </div> -->
    </div>
  </div>
</template>

<style>
</style>

<script>
import { mapGetters, mapMutations } from "vuex";
import XLSX from "xlsx";

export default {
  data() {
    return {
      datajson: [],
      search: "",
      pagination: {},
      selected: [],
      headers: [
        {
          text: "Наименование",
          align: "left",
          sortable: false,
          value: "wname",
        },
        { text: "Сечение", value: "wprofile" },
        { text: "Высота, мм", value: "wprofileHeigth" },
        { text: "Ширина, мм", value: "wprofileWidth" },
        { text: "Диаметр, мм", value: "wdiameter" },
        { text: "S сеч.", value: "wsquare" },
        { text: "Толщина изоляции, мм", value: "wisThick" },
        { text: "Склад", value: "wstor" },
        { text: "кол-во", value: "wquantity" },
        { text: "ед.", value: "wunit" },
      ],
    };
  },
  computed: {
    files: {
      get(){
        return this.getFiles;
      },
      set(value){
        this.SET_FILES(value);
      }
      
    },
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    },
    SheetJSFT() {
      return '.xlsx, .xls'
    },
    ...mapGetters(["getJsondata", "getWires", "getFiles"]),
  },
  methods: {
    ...mapMutations(["SET_JSONDATA", "PUSH_WIRES", "NULL_WIRES", "SET_FILES"]),
    jsonparse: function() {
      this.NULL_WIRES();
      var json = this.getJsondata;
      var storage = null;
      var noStrIndexes = true;
      let nameIndex=0;
      let unitIndex=0;
      let quantityIndex=0;
      //var rowsnum = json.length;
      //console.log(json);
      for (let row of json) {
        //console.log(row);
        if (row[0] && row[0].indexOf("Итого") != "-1") {
          storage = null;
        }
        if (storage) {
          if(noStrIndexes){
            let rowLength=row.length;
            for (let i=0; i<rowLength;i++){
              if(row[i] && nameIndex==0){
                nameIndex=i;
                continue;
              }
               if(row[i] && unitIndex==0){
                unitIndex=i;
                continue;
              }
               if(row[i] && quantityIndex==0){
                quantityIndex=i;
                noStrIndexes=false;
                continue;
              }
            }
          }
          var unit = row[unitIndex];
          var name = row[nameIndex];
          if (unit == "кг" && ( name.indexOf('АПБ')!=-1 || name.indexOf('ПЭЭА')!=-1)) {
            //var name = row[3];
            var quantity = row[quantityIndex];
            var profile = this.nameParse("profile", name);
            var profileHeigth = this.nameParse("Heigth", name);
            var profileWidth = this.nameParse("Width", name);
            var diameter = this.nameParse("diameter", name);
            var square = this.nameParse("square", name);
            var isolationThick = this.nameParse("isThick", name);
            this.PUSH_WIRES({
              wstor: storage,
              wname: name,
              wunit: unit,
              wquantity: quantity,
              wprofile: profile,
              wprofileHeigth: profileHeigth,
              wprofileWidth: profileWidth,
              wdiameter: diameter,
              wsquare: square,
              wisThick: isolationThick,
            });
          }
        }
        if (row[0]) {
          if (row[0].endsWith("склад")) {
            // console.log(row[0]);
            storage = row[0];
          }
        }
        //for (var rowitem of row) {
        //console.log(rowitem);
        //for (var rowitemitem in rowitem) {
        //console.log(rowitemitem);
        //}
        //}
      }
      //console.log(this.wiresThis);
    },
    nameParse: function (item, nameStr) {
      var wordStr = nameStr.split(" ");
      var profileStr = wordStr[2];
      var str1;
      var profileHeigth;
      var profileWidth;
      var profile;
      var square;
      var isolationThick;
      var str;
      if (profileStr.indexOf("x") != -1 || profileStr.indexOf("х") != -1) {
        profile = "квадрат";
        if (profileStr.indexOf("/") != -1) {
          str = profileStr.split("/");
          isolationThick = str[1];
          if (isolationThick.indexOf(".") ==-1 && isolationThick.indexOf(",") == -1){
            isolationThick = String(Number(isolationThick)/100);
          }
          if (str[0].indexOf("x") != -1) {
            str1 = str[0].split("x");
          } else {
            str1 = str[0].split("х");
          }
          str1[1] = str1[1].trim();

          if (str1[1].endsWith(",") || str1[1].endsWith(",")) {
            str1[1] = str1[1].slice(0, -1);
          }
          //console.log(Number(str1[1].replace(",",".")), Number(str1[0].replace(",",".")));
          if (
            Number(str1[1].replace(",", ".")) >
            Number(str1[0].replace(",", "."))
          ) {
            profileHeigth = Number(str1[0].replace(",", "."));
            profileWidth = Number(str1[1].replace(",", "."));
          } else {
            profileHeigth = Number(str1[1].replace(",", "."));
            profileWidth = Number(str1[0].replace(",", "."));
          }
        } else {
          str = profileStr;
          //console.log(str, str[0]);
          isolationThick = null;
          if (str.indexOf("x") != -1) {
            str1 = str.split("x");
          } else {
            str1 = str.split("х");
          }

          str1[1] = str1[1].trim();

          if (str1[1].endsWith(",") || str1[1].endsWith(",")) {
            str1[1] = str1[1].slice(0, -1);
          }
          // console.log(Number(str1[1].replace(",",".")), Number(str1[0].replace(",",".")));
          if (
            Number(str1[1].replace(",", ".")) >
            Number(str1[0].replace(",", "."))
          ) {
            profileHeigth = Number(str1[0].replace(",", "."));
            profileWidth = Number(str1[1].replace(",", "."));
          } else {
            profileHeigth = Number(str1[1].replace(",", "."));
            profileWidth = Number(str1[0].replace(",", "."));
          }
        }
        square = profileHeigth * profileWidth;
        square = Number(square.toFixed(2));
      } else {
        profile = "круг";
        var diameter = Number(profileStr.replace(",", "."));
        square =3.14*diameter*diameter/4;
        square = Number(square.toFixed(2));
        isolationThick = null;
      }
      switch (item) {
        case "profile":
          return profile;
        case "Heigth":
          return profileHeigth;
        case "Width":
          return profileWidth;
        case "diameter":
          return diameter;
        case "square":
          return square;
        case "isThick":
          return null;
          //return isolationThick;
        default:
          return null;
      }
    },
    onchange: function () {
      if ( this.files ) {
        this._file(this.files);
      }
    },
    _file(file) {
      /* Boilerplate to set up FileReader */
      const reader = new FileReader();
      reader.onload = (e) => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        /* Update state */
        this.$store.dispatch("commitJsonData",data);
        this.jsonparse();
        //console.log('this data',this.data);
        //console.log('data',data);
        //this.cols = make_cols(ws['!ref']);
      };
      reader.readAsBinaryString(file);
    },
    null_wires(){
      this.NULL_WIRES();
    }
  },
};
</script>