<template>
  <div>
    <b-icon-clipboard @click="copy" v-show="!copied"></b-icon-clipboard>
    <b-icon-clipboard-check v-show="copied"></b-icon-clipboard-check>
  </div>
</template>

<script>
export default {
  data() {
    return {
      copied: false
    };
  },
  methods: {
    copy() {
      this.copied = true;
      setTimeout(() => (this.copied = false), 1000);
      this.$emit("copy");
    }
  }
};
</script>
