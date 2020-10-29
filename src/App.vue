<template>
  <v-app>
    <app-header></app-header>
    <v-main>
      <router-view/>
    </v-main>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';

export default {
    components: {
    AppHeader,
    AppFooter

  }
};
</script>
