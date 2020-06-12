<template>
  <v-dialog persistent max-width="290" v-model="registerDialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="primary"
        accent
        v-bind="attrs"
        v-on="on"
      >{{userIsRegistered ? 'Unregister' : 'Register'}}</v-btn>
    </template>
    <v-card>
      <v-row no-gutters>
        <v-col cols="12">
          <v-card-title v-if="userIsRegistered">Unregister from meetup</v-card-title>
          <v-card-title v-else>Register for meetup</v-card-title>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col cols="12">
          <v-card-text>You can always change you decission anytime</v-card-text>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <v-card-actions>
            <v-btn text class="red--text darken-1" @click="registerDialog =false">Cancel</v-btn>
            <v-btn text class="primary--text" @click="onAgree">Confirm</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["meetupId"],
  data() {
    return {
      registerDialog: false
    };
  },
  computed: {
    userIsRegistered() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
          return meetupId === this.meetupId;
        }) >= 0
      );
    }
  },
  methods: {
    onAgree() {
      if (this.userIsRegistered) {
        this.$store.dispatch("unregisterUserFromMeetup", this.meetupId);
      } else {
        this.$store.dispatch("registerUserForMeetup", this.meetupId);
      }
    }
  }
};
</script>