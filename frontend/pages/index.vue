<template>
  <v-container>
    <v-row>
      <v-col md="6">
        <v-card>
          <v-card-title>
            <div class="text-h3 text-center mb-3">
              Selamat datang
            </div>
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-center">
              <v-btn color="primary" to="/login">
                Login
              </v-btn>
              <v-btn color="secondary" class="ml-3" to="/register">
                Register
              </v-btn>
            </div>
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