<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-form v-model="valid" ref="form">
          <v-card-title class="headline">
            Login
          </v-card-title>
          <v-card-text>
            <v-alert v-if="error" :type="error.type">
              {{ error.message }}
            </v-alert>
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
              required
              type="password"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              nuxt
              @click="validate"
            >
              Login
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
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'Email harus diisi',
        v => /.+@.+/.test(v) || 'Eamil tidak valid'
      ],
      passwordRules: [
        v => !!v || 'Password harus diisi'
      ],
      error: null
    }
  },
  methods: {
    async validate () {
      if (this.$refs.form.validate()) {
        try {
          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          })
          console.log('berhasil login')
          console.log(this.$auth.user);
        } catch (error) {
          console.log(error)
          this.error = {
            type: 'error',
            message: error.response
          }
        }
      }else{
        console.log('not validate');
      }
    }
  }
}
</script>
