import * as firebase from "firebase";
export default {
  state: {
    user: null,
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

      registeredMeetups.splice(
        registeredMeetups.findIndex((meetup) => meetup === payload)
      );
      Reflect.deleteProperty(state.user.fbKeys, payload);
    },
    setUser(state, payload) {
      state.user = payload;
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

      const fbKey = user.fbKeys[payload];
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
    fetchUserData({ commit, getters }) {
      commit("setLoading", true);
      const user = getters.user;
      firebase
        .database()
        .ref("/users/" + user.id + "/registration/")
        .once("value")
        .then((data) => {
          const dataPairs = data.val();
          let registeredMeetups = [];
          let swappedPairs = {};
          for (let key in dataPairs) {
            registeredMeetups.push(dataPairs[key]);
            swappedPairs[dataPairs[key]] = key;
          }

          const updatedUser = {
            id: user.id,
            registeredMeetups: registeredMeetups,
            fbKeys: swappedPairs,
          };

          commit("setLoading", false);
          commit("setUser", updatedUser);
        })
        .catch((error) => {
          commit("setLoading", false);
          console.log(error);
        });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
