<template>
  <div class="mb-5">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-container>
        <b-navbar-brand href="/">JSDelivr Search</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse class="justify-content-end" id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/search" @click="reset">Search</b-nav-item>
            <b-nav-item to="/about">About</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    reset() {
      this.$store.commit("RESET");
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar-dark .navbar-nav a.router-link-exact-active {
  color: white;
}
</style>
