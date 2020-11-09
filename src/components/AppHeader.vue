<template>
  <div>
    <v-navigation-drawer
      absolute
      temporary
      v-model="drawer"
      class="hidden-lg-and-up"
    >
      <v-list>
        <v-list-item v-for="(item, i) in menuItems" :key="`navdrawer${i}`"  :to="item.route" @click="item.click">
          <v-list-item-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app dark class="primary" id="appheader">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-lg-and-up"
      ></v-app-bar-nav-icon>
      <router-link to="/" tag="span" style="cursor: pointer">
        <v-toolbar-title v-text="'TransformerCalc'"></v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="(item, i) in menuItems"
          text
          :key="`menuitem${i}`"
          :to="item.route"
          @click="item.click"
        >
          <v-icon left v-html="item.icon"></v-icon>
          {{ item.title }}
        </v-btn>
       <!--  <v-btn text v-if="isUserAuthenticated" @click.prevent="signout">
          <v-icon>mdi-exit-to-app</v-icon>
          Выход
        </v-btn> -->
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        drawer: false
      }
    },
    computed:{
      isUserAuthenticated(){
        return this.$store.getters.isUserAuthenticated

      },
      menuItems(){
        return this.isUserAuthenticated
         ? 
         [
          {
            icon:'mdi-file-document-edit-outline',
            title:'Данные для расчета',
            route:'/input',
            click: this.loop,
          },
          {
            icon:'mdi-cogs',
            title:'Расчет параметров',
            route:'/calculation',
            click: this.loop,
          },
          {
            icon:'mdi-file-eye-outline',
            title:'Результат расчета',
            route:'/results',
            click: this.loop,
          },
           {
            icon:'mdi-exit-to-app',
            title:'Выход',
            route:'',
            click: this.signout,
           }
        ]
        :
        [
         {
            icon:'mdi-account',
            title:'Регистрация',
            route:'/signup',
            click: this.loop,
          },
          {
            icon:'mdi-account',
            title:'Вход',
            route:'/signin',
            click: this.loop,
          } 
        ];
      }
    },
    methods:{
      signout(){
        this.$confirm('Уже уходите?').then(res => {
          if(res)
          this.$store.dispatch('SIGN_OUT')
          if(this.$route.path != '/'){
          this.$router.push('/')
          }
        })
      },
      loop(){

      }
    }
  }
</script>
<style scoped>
</style>