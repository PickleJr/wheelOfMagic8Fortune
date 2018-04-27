<template lang="pug">
div
    h1 {{ greeting }} World!
    p {{ message }}
</template>


<script>
export default {
  data() {
      return {
          greeting: 'Hello, Vue',
          message: 'View is awesome!'
      }
  }
}
</script>

<style lang="scss" scoped>
</style>