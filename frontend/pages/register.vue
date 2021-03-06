<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-form ref="form" v-model="valid">
          <v-card-title class="headline">
            Register
          </v-card-title>
          <v-card-text>
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
              required
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              nuxt
              @click="validate"
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
      ]
    }
  },
  methods: {
    async validate () {
      if (this.$refs.form.validate()) {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
      } else {
        console.log('not validate');
      }
    }
  }
}
</script>
