<template>
  <v-container circle style="padding:0px">
    <v-layout wrap row>
      <v-flex xs12>
        <div class="text-center pa-12 mt-10 mt-10" v-if="loading">
          <v-progress-circular :size="100" :width="10" indeterminate color="primary"></v-progress-circular>
        </div>
        <div v-else>
          <v-carousel>
            <v-carousel-item
              v-for="meetup in meetups"
              :key="meetup.id"
              :src="meetup.imageUrl"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </div>
      </v-flex>
    </v-layout>
    <v-layout wrap row class="mt-2">
      <v-flex xs12 sm6 class="text-center text-sm-right">
        <v-btn large router to="/meetups" class="primary">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-center text-sm-left">
        <v-btn large router to="/meetup/new" class="primary">Organise Meetups</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-center">Join Our Awesome Meetups</v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>
