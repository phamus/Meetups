import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import routes from "./router";
import { store } from "./store";
import DateFilter from "./filters/date";
import * as firebase from "firebase";
import Alert from "./components/shared/Alert";

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: "history",
});
Vue.component("app-alert", Alert);
Vue.filter("date", DateFilter);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  store.dispatch("clearError");
  store.dispatch("stopLoading");
  next();
});

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyCwsADngsRWM-9NDcH3JiL3vX1IC1UqmrI",
      authDomain: "storyblog.firebaseapp.com",
      databaseURL: "https://storyblog.firebaseio.com",
      projectId: "storyblog",
      storageBucket: "gs://storyblog.appspot.com",
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        return this.$store.dispatch("autoSignin", user);
      }
    });

    this.$store.dispatch("loadMeetups");
  },
}).$mount("#app");
