import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import routes from "./router";
import { store } from "./store";
import DateFilter from "./filters/date";
import * as firebase from "firebase";

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: "history",
});

Vue.filter("date", DateFilter);
Vue.config.productionTip = false;

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
      storageBucket: "storyblog.appspot.com",
    });
  },
}).$mount("#app");
