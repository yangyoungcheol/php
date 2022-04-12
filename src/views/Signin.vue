<template>
  
    <signin />

</template>

<script>
  export default {
    name: 'cSignin',

    components: {
      Signin: () => import('@/components/user/Signin'),
    },
  }
</script>

<style>

</style>