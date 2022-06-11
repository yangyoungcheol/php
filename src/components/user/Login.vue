<template>
    <v-card
    class="mx-auto pa-5 mt-10"
    max-width="600"
  >
    <v-card-title class="text-h5">
        Login
    </v-card-title>

        <v-slide-y-transition
          v-if="notice == true"
          tag="v-alert"
          fluid
        >
        <v-alert
          dense
          border="left"
          type="warning"
        >
          이메일 또는 패스워드가 일치하지 않습니다.
        </v-alert>
        </v-slide-y-transition>
          
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            ></v-text-field>


            <v-text-field
            v-model="passwd"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            :rules="requireRuls"
            label="Password"
            required
            @click:append="show1 = !show1"
            ></v-text-field>

            <!-- <v-select
            v-model="select"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            label="Item"
            required
            ></v-select>

            <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
            ></v-checkbox> -->

            <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="submit"
            >
            Login
            </v-btn>
<!-- 
            <v-btn
            color="error"
            class="mr-4"
            @click="reset"
            >
            Reset Form
            </v-btn>

            <v-btn
            color="warning"
            @click="resetValidation"
            >
            Reset Validation
            </v-btn> -->
        </v-form>
    </v-card>
</template>

<script>
import axios from 'axios'

export default {
    data () {
      return {
        notice : false,
        valid: true,
        name: '',
        requireRuls: [
          v => !!v || '패스워드는 필수입력입니다',
        ],
        email: 'test@test.com',
        emailRules: [
          v => !!v || '이메일은 필수입력입니다.',
          v => /.+@.+\..+/.test(v) || '유효한 이메일이 아닙니다',
        ],
        passwd: '1111',
        show1: false,
        checkbox: false,
      }
    },

    methods: {
      submit () {
        const headers = {
          'Content-type': 'application/json;',
        }
        var data = {
          email : this.email,
          passwd : this.passwd,
        }
        axios.post(`${process.env.VUE_APP_API_URL}/login`, data, headers)
        .then(res => {
          console.log(res.data.result)
          console.log(res.data)
          if(res.data.result == 'OK'){
            this.$cookies.set("user_idx", res.data.user_idx);
            // this.$cookies.remove("user_idx");

            //this.$router.push("/")
            location.replace("/")
          }else{
            this.notice = true
            var settime = setTimeout(()=> {
              this.notice=false
              clearInterval(settime)
              }, 3000)
            //clearInterval(intvalid)
          }

        })
        .catch(error => console.log(error))
      },
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },


    },
  }
</script>

<style>

</style>