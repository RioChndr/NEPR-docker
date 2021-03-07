<template>
  <v-container class="text-center">
    <v-progress-circular
      indeterminate
      color="primary"
    />
    <br>
    Loading to logout..
  </v-container>
</template>

<script>
export default {
  mounted () {
    this.logout()
  },
  methods: {
    logout () {
      this.$auth.logout()
      this.$auth.setUser(null)
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>