<template>
  
    <login />

</template>

<script>
  export default {
    name: 'clogin',

    components: {
      Login: () => import('@/components/user/Login'),
    },
  }
</script>

<style>

</style>