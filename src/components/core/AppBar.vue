<template>
  <v-app-bar
    app
    flat
  >
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="toggleDrawer"
    />

    <v-container class="mx-auto py-0">
      <v-row align="center">
        <v-img
          :src="require('@/assets/logo.png')"
          class="mr-5"
          contain
          height="48"
          width="48"
          max-width="48"
          @click="$vuetify.goTo(0)"
        />

        <v-btn
          class="hidden-sm-and-down"
          text
        >
          <router-link to="/">Pinstagram</router-link>
        </v-btn>

        <v-btn
          class="hidden-sm-and-down"
          text
        >
          <router-link to="/posts">posts</router-link>
        </v-btn>



        <div v-if="isLogined==false">
        <v-btn
          class="hidden-sm-and-down"
          text
        >
          <router-link to="/login">Login</router-link>
        </v-btn>

        <v-btn
          class="hidden-sm-and-down"
          text
        >
          <router-link to="/signin">Signin</router-link>
        </v-btn>
        </div>



        <div v-else>
        <v-btn 
          class="hidden-sm-and-down ml-4"
          outlined
          text
          @click="logout"
        >
          Logout
        </v-btn>
        </div>

        <v-spacer />

        <div 
          v-if="isLogined"
          class="mx-auto"
          @click="$router.push('/write')"
        >
          <v-btn>POST 등록</v-btn>
        </div>

      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
  // Utilities
  import {
    mapGetters,
    mapMutations,
  } from 'vuex'

  export default {
    name: 'CoreAppBar',

    data() {
      return {
        isLogined : false,
        user_idx : this.$cookies.get('user_idx'),
      }
    },

    computed: {
      ...mapGetters(['links']),
    },

    methods: {
      ...mapMutations(['toggleDrawer']),
      onClick (e, item) {
        e.stopPropagation()

        if (item.to || !item.href) return

        this.$vuetify.goTo(item.href.endsWith('!') ? 0 : item.href)
      },

      logout(){
        this.$cookies.remove("user_idx");
        this.$router.go("/")
      },

      loginChk1(){
        console.log(this.user_idx)
        if(this.user_idx > 0)
          return true
        else
          return false
      },
      loginChk2(){
        console.log(this.user_idx)
        if(this.user_idx > 0)
          return false
        else
          return true
      },

      loginChk(){
        if(this.user_idx > 0) this.isLogined = true
        else this.isLogined = false
      }

    },

    mounted() {
      this.loginChk()
    },

  }
</script>

<style>
a {
  text-decoration: none;
}
</style>
