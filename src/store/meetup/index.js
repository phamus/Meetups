import * as firebase from "firebase";

export default {
  state: {
    loadedMeetups: [],
  },
  mutations: {
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
  },
  actions: {
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
  },
};
