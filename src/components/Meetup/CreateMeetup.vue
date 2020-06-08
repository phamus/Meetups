<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Create New Meetup</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-form lazy-validation @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                :rules="rules.name"
                label="Title"
                id="title"
                outlined
                v-model="title"
                dense
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                :rules="rules.name"
                label="Location"
                id="location"
                outlined
                v-model="location"
                dense
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="imageUrl"
                :rules="rules.name"
                label="Image Url"
                id="imageUrl"
                v-model="imageUrl"
                outlined
                dense
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="150" />
            </v-flex>
            <v-flex xs12 sm6 offset-sm3>
              <v-textarea
                outlined
                name="description"
                label="Description"
                :rules="rules.name"
                v-model="description"
                dense
                value
              ></v-textarea>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" :disabled="!formIsValid" type="submit">CREATE MEETUP</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    title: "",
    location: "",
    imageUrl: "",
    description: "",
    rules: {
      name: [val => (val || "").length > 0 || "This field is required"]
    }
  }),
  computed: {
    formIsValid() {
      return (
        this.title !== " " &&
        this.location !== "" &&
        this.imageUrl !== "" &&
        this.description !== ""
      );
    }
  },
  methods: {
    onCreateMeetup() {
      const meetUpData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: new Date()
      };

      this.$store.dispatch("createMeetup", meetUpData);
    }
  }
};
</script>