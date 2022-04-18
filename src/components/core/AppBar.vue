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

        <v-btn
          class="hidden-sm-and-down"
          outlined
          text
          @click="logout"
        >
          Logout
        </v-btn>

        <v-spacer />
{{isLogined}}
{{user_idx}}
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

      check_login(loginchker){
        if(loginchker > 0){
          this.isLogined = true
        }
      },

      logout(){
        this.$cookies.remove("user_idx");
        this.$router.push("/")
      }

    },

    mounted() {
      this.check_login(this.user_idx)
    }
  }
</script>

<style>
a {
  text-decoration: none;
}
</style>
