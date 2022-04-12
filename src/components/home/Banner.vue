<template>
  <base-card dark>
    <v-img
      :src="require('@/assets/articles/blurcamera.jpg')"
      class="grey lighten-2"
      height="400"
      width="100%"
    >
      <v-row
        class="fill-height pa-3"
        align="center"
      >
        <v-col
          cols="12"
          md="7"
          offset-md="5"
        >
        <v-img
          :src="require('@/assets/logo.png')"
          class="ma-5"
          contain
          height="90"
          width="90"
        />
          <h1 class="display-3 font-weight-light">
            Pinstagram
          </h1>

          <div class="subheading text-uppercase pl-2 mb-4 mt-3">
            Finding Beauty, One Click at a time
          </div>
<!-- 
          <v-btn
            color="primary"
            depressed
          >
            Subscribe
          </v-btn> -->
        </v-col>
      </v-row>
    </v-img>
  </base-card>
</template>

<script>
  export default {
    name: 'HomeBanner',
  }
</script>
