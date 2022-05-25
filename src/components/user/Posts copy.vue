<template>
  <div
    class="mt-4 my-6"
  >
    <v-row
      justify="start"
    >
      <v-col
      >
        <v-card
          v-for="(data, i) in items "
          :key="i"
          :value="data"
          class=" d-flex child-flex pa-2"
          max-width="400"
          contain
        >
            <v-img
              :src="`${IMG_HOST}?post_idx=${data.idx}`"
              :lazy-src="`${IMG_HOST}?post_idx=${data.idx}`"
              class="white--text"
              max-width="400"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
              <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
            </v-img>

            <v-card-subtitle class="pb-0">
              {{ data.c_date }}
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>Likes : {{ data.likes }}</div>

              <div>{{ data.content }}</div>
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
import axios from 'axios'
export default {
  data () {
    return {
      IMG_HOST: this.$store.state.IMG_URL,
      items : [],
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    getPosts () {
        
        var headers = {
          "Content-Type": "application/json",
          // 'Content-type': 'application/x-www-form-urlencoded',
        }

        var hosts = `${process.env.VUE_APP_API_URL}/posts/list`

        axios.get(hosts)
          .then(res => {
            // console.log(res.data)
            // var itemArr = []
            // for(var i = 0; i < res.data; i++) {
            //   itemArr.push({
            //     idx: res.data[i].idx,
            //     filter: res.data[i].filter,
            //     user_idx: res.data[i].user_idx,
            //   })
            // }
            this.items = res.data
            // console.log(itemArr)

          })
          .catch(error => {
            this.registState = 3
            console.log(error.response.data.message)
          })


    },
  },

}
</script>

<style>

</style>