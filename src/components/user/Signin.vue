<template>
    <v-card
    class="mx-auto pa-5 mt-10"
    max-width="600"
  >
    <v-card-title class="text-h5">
        Signin 
    </v-card-title>

        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-text-field
            v-model="name"
            ref="name"
            label="이름"
            :rules="requireRuls"
            required
            ></v-text-field>

            <v-text-field
            v-model="email"
            ref="email"
            :rules="emailRules"
            label="E-mail"
            required
            ></v-text-field>


            <v-text-field
            v-model="passwd"
            ref="passwd"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            :rules="requireRuls"
            label="Password"
            required
            @click:append="show1 = !show1"
            ></v-text-field>

            <v-text-field
            v-model="re_passwd"
            ref="re_passwd"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            :rules="requireRuls"
            label="Re-Password"
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
            :loading="btn_loading"
            color="success"
            class="mr-4"
            @click="submit"
            >
            Submit
            </v-btn>
        </v-form>
    </v-card>
</template>

<script>
import axios from 'axios'

export default {
    data() {
      return {
        valid: true,
        name: '',
        requireRuls: [
          v => !!v || '필수입력 사항 입니다',
        ],
        email: '',
        emailRules: [
          v => !!v || '이메일은 필수입력입니다.',
          v => /.+@.+\..+/.test(v) || '유효한 이메일이 아닙니다',
        ],
        passwd: '',
        show1: false,
        checkbox: false,
        re_passwd : '',
        btn_loading:false,
      }
    },

    methods: {
      
      submit(){
        if(!this.validate()){
          return false;
        }
        const headers = {
          'Content-type': 'json',
        }
        var data = {
          name : this.name,
          email : this.email,
          passwd : this.passwd,
        }
        this.btn_loading = true
        axios.post(`${process.env.VUE_APP_API_URL}/signin`, data, headers)
        .then(res => {
          console.log(res)
          if(res.data.result == 'OK'){
            axios.post(`${process.env.VUE_APP_API_URL}/login`, {email:this.email, passwd:this.passwd}, headers)
            .then(res => {
              if(res.data.result == 'OK'){
                this.$cookies.set("user_idx", res.data.user_idx);
                // this.$cookies.remove("user_idx");

                //this.$router.push("/")
                location.replace("/")
              }else{
                location.replace("/login")
              }
            })
          }
        })
      },
      validate () {
        if(!this.$refs.name.validate()){
          this.$refs.name.focus();
          return false;
        }
        if(!this.$refs.email.validate()){
          this.$refs.email.focus();
          return false;
        }
        if(!this.$refs.passwd.validate()){
          this.$refs.passwd.focus();
          return false;
        }
        if(!this.$refs.re_passwd.validate()){
          this.$refs.re_passwd.focus();
          return false;
        }
        return true;
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