<template>
  <div
    class="mt-4 my-6 pl-4"
    align="start"
  >
    <v-card
      v-for="(data, i) in items "
      :key="i"
      :value="data"
      class="mx-8 my-6 d-inline-flex child-flex"
      elevation="9"
    >
      <v-card
        class="pa-2"
        width="350"
        contain
      >
        <v-img
          :src="`${IMG_HOST}?post_idx=${data.idx}`"
          :lazy-src="`${IMG_HOST}?post_idx=${data.idx}`"
          :class="`${data.filter_name} white--text`"
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
          {{ data.name }}
        </v-card-subtitle>
        <v-card-subtitle class="pb-0">
          {{ data.c_date }}
        </v-card-subtitle>

        <v-card
          flat
          tile
          width="100%"
          class="text--primary pa-1 d-inline-flex justify-space-between"
        >

          <div
            width="100%"
          >
            <router-link
              :to="`/profile/${data.user_idx}`"
            >
              <v-btn
                small
                class="blue-grey lighten-5 ml-2"
              >
                {{ data.user_name }}
              </v-btn>
            </router-link>
          </div>
          
          <div
            width="100%"
          >
            <span
              class="mr-3"
            >Likes</span> {{ data.likes }}
          </div>
        </v-card>

        <v-card-text class="text--primary">
          <div
            class="text-subtitle-1"
          >
            {{ data.content }}
          </div>
        </v-card-text>

        <v-card-actions
          v-if="user_idx"
        >
          <v-btn
            class="white--text"
            color="red accent-2"
            @click="likesProc(data.idx, i)"
          >
            <v-icon>mdi-thumb-up</v-icon>
            좋아요
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
const _hosts = `${process.env.VUE_APP_API_URL}`

export default {
  data () {
    return {
      IMG_HOST: this.$store.state.IMG_URL,
      user_idx : cookies.get('user_idx'),
      items : [],
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    likesProc (postIdx, index) {
      console.log(_hosts)
      if(postIdx && this.user_idx) {
        axios.get(_hosts + "/posts/likes?post_idx=" + postIdx + "&user_idx=" + this.user_idx)
          .then(res => {
            // console.log(res)
            if (res.data.result == 'plus') {
              this.items[index].likes ++
            }else{
              this.items[index].likes --
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    getPosts () {
      var headers = {
        "Content-Type": "application/json",
        // 'Content-type': 'application/x-www-form-urlencoded',
      }

      axios.get(_hosts + '/posts/list')
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
          // console.log(res.data)

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