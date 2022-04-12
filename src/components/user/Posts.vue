<template>
<div
  class="mt-4"
>
<v-row>
  <v-col
    v-for="i in items "
    :key="i"
  >
    <v-card
        class="mx-auto"
        max-width="400"
      >
        <v-img
          class="d-inline-flex white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          lazy-src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
        </v-img>

        <v-card-subtitle class="pb-0">
          Number 10
        </v-card-subtitle>

        <v-card-text class="text--primary">
          <div>Whitehaven Beach</div>

          <div>Whitsunday Island, Whitsunday Islands</div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            class="white--text"
            color="red accent-2"
          >
            <v-icon>mdi-thumb-up</v-icon>
            좋아요
          </v-btn>
        </v-card-actions>
      </v-card>

  </v-col>
</v-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      items : [1,2,3,4,5,6,7,8,9,10]
    }
  }

}
</script>

<style>

</style>