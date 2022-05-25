<template>
    <v-card
    class="mx-auto pa-5 mt-10"
    max-width="600"
  >
    <v-card-title class="text-h5">
        Post Upload
    </v-card-title>
    <v-divider class="mb-4" />
      <v-card
        v-if="registState == 1"
        flat
        class="ma-0 pa-0"
      >
        <v-card
        flat
        class="ma-0 pa-0"
        >
          <v-file-input
          v-model="upload_file"
          filled
          prepend-icon="mdi-camera"
          accept="image/*"
          placeholder="클릭해서 파일을 선택해 주세요"
          @change="preview"
          :rules="noDataRuls"
          :show-size="1000"
          >
          <template v-slot:selection="{ text }">
            <v-chip
              v-if="text"
              color="deep-purple accent-4"
              dark
              label
              small
            >
              {{ text }}
            </v-chip>
          </template>
          </v-file-input>

            <v-img
              :lazy-src="upload_img"
              :src="upload_img"
              :class="preview_filter"
              max-width="570"
            ></v-img>
        </v-card>


        <div class=" mt-5" v-if="upload_img">필터</div>
        <div class="filters" v-if="upload_img">
          <div
          v-for="filter in filters" :key="filter" :class="`${filter} filter-item`" :style="`cursor:pointer;background-image:url(${upload_img})`"
          @click="changeFilter(filter)"
          >
            {{filter}}
          </div> 
        </div>

        <v-card
          flat
          tile
        >
          <v-textarea
            v-model="content"
            clearable
            clear-icon="mdi-close-circle"
            label="내용"
            :rules="noDataRuls"
            value=""
          ></v-textarea>
        </v-card>
        <div class="py-5">

            <v-btn
              block
              class="primary"
              @click="upload"
            >
              등록하기
            </v-btn>

        </div>

      </v-card>

      <v-card
        v-else-if="registState == 2"
        flat
        class="ma-0 pa-0"
      >
        <v-alert
          type="success"
        >
        이미지가 업로드 되었습니다.
        </v-alert>
        <v-btn
          block
          @click="$router.push('/posts')"
        >
          리스트로 이동하기
        </v-btn>
      </v-card>
      

      <v-card
        v-else-if="registState == 3"
        flat
        class="ma-0 pa-0"
      >
        <v-alert
          type="error"
        >
        이미지가 업로드가 실패하였습니다.
        </v-alert>

        <v-btn
          block
          @click="registState=1"
        >
          다시 입력하기
        </v-btn>
      </v-card>


    </v-card>
</template>

<script>
import axios from 'axios'
export default {
    data() {
      return {
        upload_img : "",
        upload_file : null,
        filter_bg : '',
        filters : [ "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson", "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua", "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"],
        preview_filter: '',
        content : '',
        noDataRuls: [
          v => !!v || '필수 입력 입니다.',
        ],
        user_idx: this.$cookies.get('user_idx'),
        registState: 1,
      }
    },

    methods: {
      preview(){
        // console.log(this.upload_file.size)
        if (this.upload_file) {
          let url = URL.createObjectURL(this.upload_file)
          this.upload_img = url
        } else {
          this.upload_img = ''
        }

      },
      changeFilter(filter){
        this.preview_filter = filter
      },
      upload(){
        const senddata = new FormData()
        senddata.append('user_idx',this.user_idx)
        senddata.append('upload_img',this.upload_file)
        senddata.append('img_filter',this.preview_filter)
        senddata.append('content',this.content)
        
        var headers = {
          "Content-Type": "multipart/form-data",
          // 'Content-type': 'application/x-www-form-urlencoded',
        }

        var hosts = `${process.env.VUE_APP_API_URL}/posts/upload`

        axios.post(hosts, senddata, headers)
          .then(res => {
            // console.log(res)
            this.registState = 2

          })
          .catch(error => {
            this.registState = 3
            console.log(error.response.data.message)
          })

      },
    },
  }
</script>

<style scoped>
.filters{
overflow-x:scroll;
white-space: nowrap;
}
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color : white;
  background-size: cover;
  background-position : center;
}
</style>