<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 md3 v-for="meetup in meetups" :key="meetup.id">
        <v-card max-width="280" class="mx-auto">
          <v-img :src="meetup.imageUrl" height="200px"></v-img>
          <v-card-title>{{ meetup.title }}</v-card-title>
          <v-card-subtitle>{{ meetup.date | date}}</v-card-subtitle>
          <v-card-actions class="mb-5">
            <v-btn text :to="'/meetups/' + meetup.id">
              <v-icon left>arrow_forward</v-icon>View Meetup
            </v-btn>
          </v-card-actions>
          <v-spacer></v-spacer>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups;
    }
  }
};
</script>
