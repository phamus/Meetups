<template>
  <v-container>
    <v-row v-if="loading">
      <v-col cols="12">
        <div class="text-center pa-12 mt-10 mt-10" v-if="loading">
          <v-progress-circular :size="100" :width="10" indeterminate color="primary"></v-progress-circular>
        </div>
      </v-col>
    </v-row>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h5 class="primary--text">{{ meetup.title }}</h5>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
            </template>
          </v-card-title>
          <v-img :src="meetup.imageUrl" height="400px"></v-img>
          <v-card-text>
            <h4 class="primary--text">{{ meetup.date | date }} -- {{meetup.location}}</h4>
            <div>
              <app-edit-meetup-date-dialog :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-date-dialog>
              <app-edit-meetup-time-dialog :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-time-dialog>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-register-for-meetup :meetupId="meetup.id"></app-register-for-meetup>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creator;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>
