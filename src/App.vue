<template>
  <div id="app">
    <Header></Header>
    <b-container>
      <router-view />
    </b-container>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss">
#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
.page-item button.page-link {
  color: #22222e;
}
.page-item.active button.page-link {
  background-color: #22222e;
  border-color: #22222e;
  color: #ffffff;
}
</style>
