<template ref="123">
   
    <div :onresize="myEventHandler">
      <v-img
      src="@/assets/s1200.jpg"
      :aspect-ratio="16/9"
      :height="imgHeight - minusHeight"
      :key="imgkey"
      ></v-img>
    </div>
  
</template>

<script>
export default {
   data() {
    return {
      imgHeight: window.innerHeight,
      minusHeight: 100,
      imgkey: 1
    };
  },
  mounted(){
    this.myEventHandler();
  },
  created(){
  },
 updated(){
    window.addEventListener("resize", this.myEventHandler);
  },
  methods:{
    myEventHandler(){
      this.imgHeight = window.innerHeight;
      this.minusHeight= document.getElementById("appheader").clientHeight + document.getElementById("appfooter").clientHeight;
      this.imgkey++;
    }
  }
}
</script>

<style>

</style>