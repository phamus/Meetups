<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs10 sm6 md3 offset-xs1>
        <v-card>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>
          <v-card-title>My Meetup</v-card-title>
          <v-card-subtitle>12th June, 2020</v-card-subtitle>
          <v-card-actions class="mb-5">
            <v-btn text to="/meetups/2">
              <v-icon left>arrow_forward</v-icon>View Meetup
            </v-btn>
          </v-card-actions>
          <v-spacer></v-spacer>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
