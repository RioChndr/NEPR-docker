<template>
  <v-container>
    <v-row justify="center">
      <v-col md="6">
        <v-card>
          <v-card-title class="text-center">
            <div class="text-h3 text-center mb-3">
              Selamat datang
            </div>
            <div v-if="$auth.user" class="text-left">
              Anda sudah login. Halo {{ $auth.user.username }} <br>
              <nuxt-link to="/profile">
                Edit profil anda
              </nuxt-link> <br>
              <nuxt-link to="/private">
                Private Page
              </nuxt-link> <br>
            </div>
          </v-card-title>
          <v-card-text>
            <div v-if="!$auth.user" class="d-flex justify-center">
              <v-btn color="primary" to="/login">
                Login
              </v-btn>
              <v-btn color="secondary" class="ml-3" to="/register">
                Register
              </v-btn>
            </div>
            <v-btn v-else color="secondary" to="/logout" small>
              Logout
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
