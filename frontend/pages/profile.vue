<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card :loading="isLoading">
        <v-form ref="form" v-model="valid">
          <v-card-title class="headline">
            Akun
          </v-card-title>
          <v-card-text>
            <v-alert v-if="error" :type="error.type" dismissible>
              {{ error.message }}
            </v-alert>
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              label="Username"
              required
            />
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              required
            />
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              type="password"
            />
          </v-card-text>
          <v-card-actions>
            <nuxt-link to="/">Kembali ke Home</nuxt-link>
            <v-spacer />
            <v-btn
              color="primary"
              nuxt
              @click="validate"
            >
              Simpan
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default {
  middleware: ['auth'],
  data () {
    return {
      valid: false,
      username: this.$auth.user.username,
      email: this.$auth.user.email,
      password: '',
      emailRules: [
        v => !!v || 'Email harus diisi',
        v => /.+@.+/.test(v) || 'Eamil tidak valid'
      ],
      usernameRules: [
        v => !!v || 'Username harus diisi'
      ],
      error: null,
      isLoading: false
    }
  },
  methods: {
    async validate () {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        try {
          const dataUpdate = {
            id: this.$auth.user.id,
            username: this.username,
            email: this.email
          }
          if (this.password) {
            dataUpdate.password = this.password
          }
          const res = await this.$axios.$post('/users/me', dataUpdate)
          console.log(res);
          this.error = {
            type: 'success',
            message: 'Berhasil disimpan'
          }
          setTimeout(() => {
            this.error = null
          }, 3000);
        } catch (error) {
          console.log(error);
          this.error = {
            type: 'error',
            message: error.response.data.error.message ?? 'Error tidak diketahui'
          }
        }
        this.isLoading = false
      } else {
        console.log('not validate');
      }
    }
  }
}
</script>
