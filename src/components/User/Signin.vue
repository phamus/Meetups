<template>
  <v-container circle style="padding:0px">
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <img
          src="https://freelancer-free.johnleider.com/img/aboutme.f240a572.png"
          alt="image"
          width="100%"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-row no-gutters class="pa-2">
          <v-col cols="12" md="8" offset-md="2">
            <div v-if="error">
              <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </div>
            <h3 class="mt-4 mb-4">SignIn Form</h3>
            <v-form @submit.prevent="onSignIn">
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

              <v-btn class="primary" :loading="loading" :disabled="loading" type="submit">
                Signin
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
                </template>
              </v-btn>
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
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onSignIn() {
      this.$store.dispatch("signIn", {
        email: this.email,
        password: this.password
      });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
};
</script>

