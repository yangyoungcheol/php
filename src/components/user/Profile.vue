<template>
    <v-card
    class="mx-auto pa-5 mt-2"
    max-width="600"
  >
      <v-card-title class="text-h5">
          Profile
      </v-card-title>

        <v-card
          class="pa-2 d-inline-flex justify-space-between"
          width="100%"
          outlined
        >
          <v-card-text>
            <h2># {{ name }}</h2>
            <div class="pt-2"><h4># {{ email }}</h4></div>
          </v-card-text>
          <v-card-text
            v-if="!itsMe"
            class="text-end"
          >
            <v-btn
              v-if="!is_follow"
            >
              <v-icon>
                mdi-plus
              </v-icon>
              Follow
            </v-btn>

            <v-btn
              v-else
              class="red"
            >
              <v-icon>
                mdi-minus
              </v-icon>
              Unfollow
            </v-btn>
            
          </v-card-text>
        </v-card>

        <v-card
          class="mt-4"
          flat
          text
        >
          <v-row>
            <v-col>
              <v-card>
                <v-card-title>
                  Posts
                </v-card-title>
                <v-divider />
                <v-card-text
                  class="text-center text-h6"
                >
                  {{ postCount }}
                </v-card-text>
              </v-card>
            </v-col>
            <v-col>
              <v-card>
                <v-card-title>
                  Follower
                </v-card-title>
                <v-divider />
                <v-card-text
                  class="text-center text-h6"
                >
                  {{ follower }}
                </v-card-text>
              </v-card>
            </v-col>
            <v-col>
              <v-card>
                <v-card-title>
                  Following
                </v-card-title>
                <v-divider />
                <v-card-text
                  class="text-center text-h6"
                >
                  {{ following }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
    </v-card>
</template>

<script>
import axios from 'axios'
const _hosts = `${process.env.VUE_APP_API_URL}`

export default {
  data() {
    return {
      target_idx: this.$route.params.user_idx,
      user_idx: this.$store.state.user_idx,
      valid: true,
      email: '',
      name: '',
      postCount: 0,
      following: 0,
      follower: 0,
      requireRuls: [
        v => !!v || '패스워드는 필수입력입니다',
      ],
      email: '',
      emailRules: [
        v => !!v || '이메일은 필수입력입니다.',
        v => /.+@.+\..+/.test(v) || '유효한 이메일이 아닙니다',
      ],
      passwd: '',
      show1: false,
      checkbox: false,

      itsMe: false,
      is_follow : false,
    }
  },

  props: {
  },

  mounted () {
    this.getUserInfo()
      .then(() => {
        this.setFollowBtn()
      })
  },

  methods: {
    setFollowBtn () {
      if (this.user_idx !== this.target_idx) {
        axios.get(_hosts + '/follow/check?user_idx=' + this.user_idx + '&target_idx=' + this.target_idx)
          .then(res => {
            // console.log(res)
            if (res.data.isFollow > 0) {
              this.is_follow = true
              this.itsMe = false
            } else {
              this.is_follow = false
              this.itsMe = false
            }
          })
      } else {
        this.itsMe = true
        this.is_follow = false
      }
    },

    async getUserInfo () {
      console.log('start')
      if (this.target_idx > 0) {
        await axios.get(_hosts + '/user/info?user_idx=' + this.target_idx)
          .then(res => {
            // console.log(res)
            this.email = res.data.email
            this.name = res.data.name
            this.postCount = res.data.post_count
            this.follower = res.data.follower
            this.following = res.data.following
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
  },
}
</script>

<style>

</style>