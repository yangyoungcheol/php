<template>
  
    <write />

</template>

<script>
  export default {
    name: 'cwrite',

    components: {
      Write: () => import('@/components/user/Write.vue'),
    },
  }
</script>

<style>

</style>