<template>
  
    <profile />

</template>

<script>
  export default {
    name: 'cprofile',

    components: {
      Profile: () => import('@/components/user/Profile'),
    },
  }
</script>

<style>

</style>