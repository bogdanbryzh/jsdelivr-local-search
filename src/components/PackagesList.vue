<template>
  <b-list-group v-show="!getLoading" class="w-100">
    <PackageListItem
      v-for="pkg in getPkgs"
      :key="pkg.id"
      :pkg="pkg"
    ></PackageListItem>
  </b-list-group>
</template>

<script>
import { mapGetters } from "vuex";
import PackageListItem from "./PackageListItem";

export default {
  props: { pkgs: Array },
  computed: {
    ...mapGetters(["getPkgs", "getLoading"])
  },
  components: {
    PackageListItem
  }
};
</script>
