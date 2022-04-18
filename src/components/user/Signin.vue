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
            :rules="requireRuls"
            label="이름"
            required
            ></v-text-field>

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

            <v-text-field
            v-model="re_passwd"
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
        re_passwd : '',
      }
    },

    methods: {

      submit(){
        const headers = {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Accept': '*/*'
        }
        var data = {
          name : this.name,
          email : this.email,
          passwd : this.passwd,
        }
        axios.post(`${process.env.VUE_APP_API_URL}/test`, data, headers)
        .then(res => {
          console.log(res)
        })
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