<template>
  <div>
    <b-list-group-item>
      <h4 v-b-modal="pkg.name">
        {{ pkg.name }}
      </h4>
      <p>{{ pkg.description }}</p>
      <b-button
        @click="onKeywordClick(keyword)"
        size="sm"
        squared
        variant="outline-dark"
        class="mr-3 mb-3"
        v-for="keyword in keywords"
        :key="keyword + Math.random()"
      >
        {{ keyword }}
      </b-button>

      <p class="m-0">
        <span class="pub" @click="onPubClick(pkg.publisher.username)">
          {{ pkg.publisher.username }}
        </span>
        published
        {{ pkg.version }} |
        {{ pkg.date }}
      </p>
    </b-list-group-item>
    <b-modal :id="pkg.name" :title="pkg.name + '@' + pkg.version" size="lg">
      <PackageModal :name="pkg.name" :version="pkg.version"></PackageModal>
    </b-modal>
  </div>
</template>

<script>
import PackageModal from "@/components/PackageModal";
export default {
  components: {
    PackageModal
  },
  props: {
    pkg: Object
  },
  computed: {
    // Some packages have 1000+ keywords. I dunno for what reason
    keywords: {
      get() {
        if (this.pkg.keywords) {
          return this.pkg.keywords.slice(0, 14);
        }
        return [];
      }
    }
  },
  methods: {
    onKeywordClick(keyword) {
      history.pushState({}, null, `${this.$route.path}?q=keywords:${keyword}`);
      this.$store.dispatch("fetchPkgs", { query: `keywords:${keyword}` });
    },
    onPubClick(username) {
      history.pushState({}, null, `${this.$route.path}?q=author:${username}`);
      this.$store.dispatch("fetchPkgs", { query: `author:${username}` });
    }
  }
};
</script>

<style lang="scss" scoped>
.pub {
  cursor: pointer;
  font-weight: bold;
}
</style>
