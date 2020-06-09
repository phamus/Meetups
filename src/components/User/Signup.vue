<template>
  <v-container circle style="padding:0px">
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <img
          src="https://freelancer-free.johnleider.com/img/welcome.30b63204.png"
          alt="image"
          width="100%"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-row no-gutters class="pa-2">
          <v-col cols="12" md="8" offset-md="2">
            <h3 class="mt-4 mb-4">SignUp Form</h3>
            <v-form @submit.prevent="signUp">
              <v-text-field
                name="email"
                label="Email"
                v-model="email"
                :rules="[rules.email,rules.required]"
                id="email"
                outlined
                dense
                required
              ></v-text-field>
              <v-text-field
                name="password"
                label="Password"
                type="password"
                id="password"
                :rules="[rules.required, rules.min]"
                outlined
                dense
                required
                v-model="password"
              ></v-text-field>
              <v-text-field
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                :rules="[passwordMatch]"
                v-model="confirmPassword"
                outlined
                dense
                required
              ></v-text-field>
              <v-btn class="primary" type="submit">SignUp</v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    confirmPassword: "",
    rules: {
      required: value => !!value || "Required.",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
      min: v => v.length >= 8 || "Min 8 characters"
    }
  }),
  computed: {
    passwordMatch() {
      return this.password !== this.confirmPassword
        ? "password doesnt match"
        : true;
    }
  },
  methods: {
    signUp() {
      console.log({ email: this.email, password: this.password });
    }
  }
};
</script>
