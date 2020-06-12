<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab accent v-bind="attrs" v-on="on">
        <v-icon>edit</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card-title>Edit Meetup</v-card-title>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="editedTitle"
                :rules="rules.required"
                outlined
                dense
              ></v-text-field>

              <v-textarea
                outlined
                name="description"
                label="Description"
                v-model="editedDescription"
                :rules="rules.required"
                dense
                value
              ></v-textarea>
            </v-card-text>
          </v-col>
        </v-row>

        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-card-actions>
              <v-btn text class="primary--text" @click=" editDialog =false">close</v-btn>
              <v-btn text class="primary--text" @click="onSaveChanges">Save</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      editDialog: false,
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
      rules: {
        required: [val => (val || "").length > 0 || "This field is required"]
      }
    };
  },
  methods: {
    onSaveChanges() {
      if (
        this.editedTitle.trim() === "" ||
        this.editedDescription.trim() == ""
      ) {
        return;
      }
      this.editDialog = false;
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription
      });
    }
  }
};
</script>