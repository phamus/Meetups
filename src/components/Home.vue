<template>
  <v-container>
    <v-layout wrap row>
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout wrap row>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetups" class="primary"
          >Explore Meetups</v-btn
        >
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/meetup/new" class="primary"
          >Organise Meetups</v-btn
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    meetups: [
      {
        id: "1wefgyuiiuytre",
        title: "Lagos",
        imageUrl:
          "https://cdn.cfr.org/sites/default/files/styles/article_header_l_16x9_600px/public/image/2019/08/Nigeria-Lagos-Victoria-Island-Urbanization.jpg?h=49d06cac",
      },
      {
        id: "1wefgy6tgygytre",
        title: "Abuja",
        imageUrl:
          "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2018/4/9/9dc3087797834cbdb39040a7d1e564c2_18.jpg",
      },
    ],
  }),
};
</script>
