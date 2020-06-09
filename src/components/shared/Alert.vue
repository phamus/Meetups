<template>
  <v-alert type="error" dismissible @input="onClose" :value="true">I'm an info alert.</v-alert>
</template>
<script>
export default {
  methods: {
    onClose() {
      this.$emit("dismissed");
    }
  }
};
</script>