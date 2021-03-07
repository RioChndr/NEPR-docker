<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-form ref="form" v-model="valid">
          <v-card-title class="headline">
            Register
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
              required
            />
          </v-card-text>
          <v-card-actions>
            <nuxt-link to="/login">
              Sudah punya akun ? login disini
            </nuxt-link>
            <v-spacer />
            <v-btn
              color="primary"
              nuxt
              @click="validate"
              :loading="isLoading"
            >
              Register
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default {
  data () {
    return {
      valid: false,
      username: '',
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'Email harus diisi',
        v => /.+@.+/.test(v) || 'Eamil tidak valid'
      ],
      passwordRules: [
        v => !!v || 'Password harus diisi'
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
          const res = await this.$axios.$post('/register', {
            username: this.username,
            email: this.email,
            password: this.password
          })
          console.log(res);
          this.error = {
            type: 'success',
            message: 'Berhasil register, silahkan login'
          }
        } catch (error) {
          console.log(error);
          let typeError = 'error'
          if (error.response.data.error.message.errors[0].message === 'email must be unique') {
            typeError = 'warning'
            error.response.data.error.message = 'Email sudah terdaftar, silahkan login'
          }
          this.error = {
            type: typeError,
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
