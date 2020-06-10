<template>
  <v-container fluid style="padding:0px">
    <v-row no-gutters>
      <v-col cols="12" md="10" offset-md="1">
        <div class="text-center pa-12 mt-10 mt-10" v-if="loading">
          <v-progress-circular :size="100" :width="10" indeterminate color="primary"></v-progress-circular>
        </div>
        <div v-else>
          <v-carousel height="70vh">
            <v-carousel-item
              v-for="meetup in meetups"
              :key="meetup.id"
              :src="meetup.imageUrl"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" sm="6" class="text-center text-sm-right">
        <v-btn large router to="/meetups" class="primary">Explore Meetups</v-btn>
      </v-col>
      <v-col cols="12" sm="6" class="text-center text-sm-left">
        <v-btn large router to="/meetup/new" class="primary">Organise Meetups</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="text-center">Join Our Awesome Meetups</v-col>
    </v-row>
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
