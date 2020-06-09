import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        id: "1wefgyuiiuytre",
        title: "Lagos",
        imageUrl:
          "https://cdn.cfr.org/sites/default/files/styles/article_header_l_16x9_600px/public/image/2019/08/Nigeria-Lagos-Victoria-Island-Urbanization.jpg?h=49d06cac",
        date: new Date(),
        location: "Lagos",
        description: "Its Lagos",
      },
      {
        id: "1wefgy6tgygytre",
        title: "Abuja",
        imageUrl:
          "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2018/4/9/9dc3087797834cbdb39040a7d1e564c2_18.jpg",
        date: new Date(),
        location: "Abuja",
        description: "Its Abuja",
      },
    ],
    user: null,
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    createMeetup({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: "123eft6tgy",
      };
      commit("createMeetup", meetup);
    },
    signUp({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((data) => {
          console.log(data.user);
          const newUser = {
            id: data.user.uid,
            registeredMeetups: [],
          };
          commit("setUser", newUser);
        })
        .catch((error) => console.log(error));
    },
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId;
        });
      };
    },
    user(state) {
      return state.user;
    },
  },
});
