<template>
<v-card>
  <v-dialog
    v-model="dialog"
    width="70%"
  >
    <template
      v-slot:activator="{ on, attrs }"
    >
      <v-img
        :src="`${host_props}?post_idx=${post_idx_props}`"
        :lazy-src="`${host_props}?post_idx=${post_idx_props}`"
        :class="`${filter_props} white--text`"
        max-width="400"
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-card
      class="pa-0 ma-0"
    >
      <v-card-title>
        Origin Picture
      </v-card-title>

      <v-img
        :src="`${host_props}?post_idx=${post_idx_props}`"
        :lazy-src="`${host_props}?post_idx=${post_idx_props}`"
        :class="`${filter_props} white--text`"
      />
      <v-card-actions>
        <v-btn
          color="primary"
          text
          @click="dialog=false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-card>
</template>
<script>
export default {
  props: {
    post_idx_props: Number,
    filter_props: String,
    host_props: String,
  },
  data () {
    return {
      dialog: false,
    }
  },
}
</script>
<style></style>
