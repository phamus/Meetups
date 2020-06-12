<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn accent v-bind="attrs" v-on="on">Edit Date</v-btn>
    </template>
    <v-card>
      <v-row>
        <v-col cols="12">
          <v-card-title>Edit Meetup Date</v-card-title>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12">
          <v-date-picker v-model="editableDate" style="width: 100%" actions>
            <template>
              <v-btn class="primary--text" @click="editDialog=false">close</v-btn>
              <v-btn class="primary--text" @click="onSaveChanges">Save</v-btn>
            </template>
          </v-date-picker>
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
      editableDate: null,
      editDialog: false
    };
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date);
      const newDay = new Date(this.editableDate).getUTCDate();
      const newMonth = new Date(this.editableDate).getUTCMonth();
      const newYear = new Date(this.editableDate).getUTCFullYear();
      newDate.setUTCDate(newDay);
      newDate.setUTCMonth(newMonth);
      newDate.setUTCFullYear(newYear);

      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: newDate
      });
    }
  },
  created() {
    // console.log(new Date(this.meetup.date).getUTCFullYear());
    this.editableDate = new Date(this.meetup.date).toISOString().substr(0, 10);
  }
};
</script>