<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn accent v-bind="attrs" v-on="on">Edit Time</v-btn>
    </template>
    <v-card>
      <v-row>
        <v-col cols="12">
          <v-card-title>Edit Meetup TIme</v-card-title>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12">
          <v-time-picker v-model="editableTime" style="..." format="24hr" actions>
            <template>
              <v-btn class="primary--text" @click="editDialog=false">close</v-btn>
              <v-btn class="primary--text" @click="onSaveChanges">Save</v-btn>
            </template>
          </v-time-picker>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["meetup"],
  data() {
    return {
      editableTime: null,
      editDialog: false
    };
  },
  methods: {
    onSaveChanges() {
      console.log(this.editableTime);
      const newDate = new Date(this.meetup.date);
      const hours = this.editableTime.match(/^(\d+)/)[1];
      const minutes = this.editableTime.match(/:(\d+)/)[1];
      newDate.setHours(hours);
      newDate.setMinutes(minutes);

      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: newDate
      });
    }
  },
  created() {
    console.log(new Date(this.meetup.date).toTimeString());
    this.editableTime = new Date(this.meetup.date).toTimeString().substr(0, 9);
  }
};
</script>