<template>
  
    <posts />

</template>

<script>
  export default {
    name: 'cpost',

    components: {
      Posts: () => import('@/components/user/Posts'),
    },
  }
</script>

<style>

</style>