<template>
  <v-app>
    <core-app-bar />

    <core-drawer />

    <transition name="fade">
    <core-view />
    </transition>

    <core-footer />

  </v-app>
</template>

<script>
  export default {
    name: 'App',

    components: {
      CoreDrawer: () => import('@/components/core/Drawer'),
      CoreFooter: () => import('@/components/core/Footer'),
      CoreAppBar: () => import('@/components/core/AppBar'),
      CoreView: () => import('@/components/core/View'),
    },
  }
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s easy-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
