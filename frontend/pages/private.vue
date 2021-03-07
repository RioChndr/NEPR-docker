<template>
  <v-container class='text-center'>
    this page only open by users that authenticated <br>
    Nothing here, just to test authentication <br>
    <nuxt-link to="/">Back Home</nuxt-link>
  </v-container>
</template>

<script>
export default {
  middleware: ['auth']
}
</script>

<style>

</style>