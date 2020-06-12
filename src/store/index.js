import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [],
    user: null,
    loading: false,
    error: null,
  },
  mutations: {
    registerUserForMeetup(state, payload) {
      const id = payload.id;
      if (
        state.user.registeredMeetups.findIndex((meetup) => meetup.id === id) >=
        0
      ) {
        return;
      }
      state.user.registeredMeetups.push(id);
      state.user.fbKeys[id] = payload.fbKey;
    },

    unregisterUserFromMeetup(state, payload) {
      const registeredMeetups = state.user.registeredMeetups;
      registeredMeetups.slice(
        registeredMeetups.findIndex((meetup) => meetup.id === payload.id),
        1
      );
      Reflect.deleteProperty(state.user.fbKeys, payload);
    },
    loadMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    updateMeetup(state, payload) {
      const meetup = state.loadedMeetups.find((meetup) => {
        return meetup.id === payload.id;
      });
      if (payload.title) {
        meetup.title = payload.title;
      }
      if (payload.description) {
        meetup.description = payload.description;
      }
      if (payload.date) {
        meetup.date = payload.date;
      }
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    registerUserForMeetup({ commit, getters }, payload) {
      commit("setLoading", true);
      const user = getters.user;
      firebase
        .database()
        .ref("/users/" + user.id)
        .child("/registration/")
        .push(payload)
        .then((data) => {
          commit("setLoading", false);
          commit("registerUserForMeetup", {
            id: payload,
            fbKey: data.key,
          });
        })
        .catch((error) => {
          commit("setLoading", false);
          console.log(error);
        });
    },
    unregisterUserFromMeetup({ commit, getters }, payload) {
      commit("setLoading", true);
      const user = getters.user;
      if (!user.fbKeys) {
        return;
      }
      const fbKey = user.fdKeys[payload];
      firebase
        .database()
        .ref("/users/" + user.id + "/registration/")
        .child(fbKey)
        .remove()
        .then(() => {
          commit("setLoading", false);
          commit("unregisterUserFromMeetup", payload);
        })
        .catch((error) => {
          commit("setLoading", false);
          console.log(error);
        });
    },
    loadMeetups({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("meetups")
        .once("value")
        .then((data) => {
          const meetups = [];
          const obj = data.val();
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              imageUrl: obj[key].imageUrl,
              description: obj[key].description,
              date: obj[key].date,
              location: obj[key].location,
              creator: obj[key].creator,
            });
          }
          commit("loadMeetups", meetups);
          commit("setLoading", false);
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", true);
        });
    },
    createMeetup({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creator: getters.user.id,
      };
      let key;
      let imageUrl;
      firebase
        .database()
        .ref("meetups")
        .push(meetup)
        .then((data) => {
          key = data.key;

          return key;
        })
        .then((key) => {
          const fileName = payload.image.name;
          const ext = fileName.slice(fileName.lastIndexOf("."));
          return firebase
            .storage()
            .ref("meetups/" + key + "." + ext)
            .put(payload.image);
        })
        .then((fileData) => {
          return fileData.ref.getDownloadURL();
        })
        .then((data) => {
          imageUrl = data;
          return firebase
            .database()
            .ref("meetups")
            .child(key)
            .update({ imageUrl: data });
        })
        .then(() => {
          commit("createMeetup", {
            ...meetup,
            imageUrl,
            id: key,
          });
        })
        .catch((error) => console.log(error));
    },
    updateMeetupData({ commit }, payload) {
      commit("setLoading", true);
      const updateObj = {};
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.description) {
        updateObj.description = payload.title;
      }
      if (payload.date) {
        updateObj.date = payload.date.toISOString();
      }
      firebase
        .database()
        .ref("meetups")
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit("setLoading", false);
          commit("updateMeetup", {
            id: payload.id,
            title: updateObj.title,
            description: updateObj.description,
            date: updateObj.date,
          });
        })
        .catch((error) => {
          commit("setLoading", false);
          console.log(error);
        });
    },
    signUp({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((data) => {
          commit("setLoading", false);

          const newUser = {
            id: data.user.uid,
            registeredMeetups: [],
            fbKeys: {},
          };
          commit("setUser", newUser);
        })
        .catch((error) => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },

    signIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((data) => {
          commit("setLoading", false);
          const newUser = {
            id: data.user.uid,
            registeredMeetups: [],
            fbKeys: {},
          };
          commit("setUser", newUser);
        })
        .catch((error) => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    autoSignin({ commit }, payload) {
      commit("setUser", { id: payload.uid, registeredMeetups: [], fbKeys: {} });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    },
    clearError({ commit }) {
      commit("clearError");
    },
    stopLoading({ commit }) {
      commit("setLoading", false);
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
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
  },
});
