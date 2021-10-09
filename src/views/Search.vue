<template>
  <div class="search">
    <b-form
      class="w-100 mb-5 d-flex justify-content-center"
      @submit.prevent="runSearch"
      inline
    >
      <b-form-input
        id="withoutBorder"
        required
        class="w-75 mr-sm-2"
        placeholder="Search pkgs"
        v-model="query"
      ></b-form-input>
      <b-button squared class="my-2 my-sm-0" type="submit">
        Search
      </b-button>
    </b-form>
    <div class="loader" v-show="getLoading">
      <ScaleLoader color="#222222"></ScaleLoader>
    </div>
    <div v-show="!getLoading" v-if="getTotalPkgs !== 0">
      <b-row>
        <p class="mx-3">
          Found {{ getTotalPkgs }}
          {{ getTotalPkgs === 1 ? "package" : "packages" }}
        </p>
        <PackagesList class="mb-3"></PackagesList>
      </b-row>
      <b-row
        v-if="getTotalPkgs > perPage"
        class="d-flex justify-content-center"
      >
        <b-pagination
          v-model="currentPage"
          :total-rows="getTotalPkgs"
          :per-page="perPage"
          limit="7"
          first-number
          last-number
          @input="paginate(currentPage)"
        ></b-pagination>
      </b-row>
    </div>
    <div class="empty" v-else>
      <img src="@/assets/package.png" alt="Empty package" />
      <p>Search for packages</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PackagesList from "@/components/PackagesList";
import ScaleLoader from "vue-spinner/src/ScaleLoader";

export default {
  components: {
    PackagesList,
    ScaleLoader
  },
  data() {
    return {
      perPage: 10
    };
  },
  computed: {
    ...mapGetters(["getQuery", "getTotalPkgs", "getLoading", "getCurrentPage"]),
    currentPage: {
      get() {
        return this.$store.state.currentPage;
      },
      set(newPage) {
        return this.$store.commit("SET_CURRENT_PAGE", newPage);
      }
    },
    query: {
      get() {
        return this.$store.state.query;
      },
      set(newQuery) {
        return this.$store.commit("SET_QUERY", newQuery);
      }
    }
  },
  mounted() {
    if (this.$route.query.q) {
      this.$store.dispatch("fetchPkgs", { query: this.$route.query.q });
    } else {
      this.$store.commit("RESET");
    }
  },
  methods: {
    async runSearch() {
      // Because npm registry search returns package data instead of searching
      if (this.query.length === 1) {
        return;
      }

      history.pushState({}, null, `${this.$route.path}?q=${this.query}`);
      await this.$store.dispatch("paginate", {
        query: this.query,
        currentPage: 1
      });
    },
    paginate(currentPage) {
      this.$store.dispatch("paginate", {
        query: this.getQuery,
        currentPage,
        perPage: this.perPage
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.search {
  height: 100%;

  // Dirty hack to remove border radius on search input
  input#withoutBorder.form-control {
    border-radius: 0 !important;
  }

  .loader {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .empty {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      max-width: 300px;
    }

    p {
      font-size: 2rem;
      font-weight: 700;
    }
  }
}
</style>
