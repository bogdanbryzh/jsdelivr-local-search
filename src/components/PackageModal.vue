<template>
  <div>
    <p>
      <span @click="reset" class="curp" style="font-weight:bold"
        >{{ name }}@{{ this.version }}</span
      ><span
        @click="goToPath(breadcrumbs, index)"
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="breadcrumb"
        ><span v-if="index !== breadcrumbs.length" style="padding: 0 3px"
          >/</span
        ><span class="curp">{{ breadcrumb }}</span></span
      >
    </p>
    <div
      v-for="entry in filesToShow"
      class="entry curp"
      :key="entry.name + Math.random()"
    >
      <div @click="goDeeper(entry)" v-if="entry.type === 'directory'">
        <b-icon-folder-fill></b-icon-folder-fill>
        {{ entry.name }}
      </div>
      <div v-if="entry.type === 'file'" class="d-flex justify-content-between">
        <p>
          <b-icon-file-earmark-fill></b-icon-file-earmark-fill> {{ entry.name }}
        </p>
        <CopyIcon class="controls" @copy="copy(entry.name)"></CopyIcon>
      </div>
    </div>
  </div>
</template>

<script>
import CopyIcon from "@/components/CopyIcon";
import { cancelToken } from "@/api/config";
import { fetch } from "@/api/fetch";
import { copyTextToClipboard } from "@/utils/copyToClipboard";

export default {
  components: { CopyIcon },
  props: {
    name: String,
    version: String
  },
  data() {
    return {
      files: [],
      filesToShow: [],
      breadcrumbs: []
    };
  },
  async created() {
    const data = await fetch(
      { name: this.name, version: this.version },
      cancelToken
    );

    this.files = data.files;
    this.filesToShow = this.files;
  },
  methods: {
    goDeeper(entry) {
      this.breadcrumbs = [...this.breadcrumbs, entry.name];
      this.filesToShow = entry.files;
    },
    goToPath(breadcrumbs, index) {
      let files = [...this.files];
      let depth = 0;

      do {
        files = files.filter(file => file.name === breadcrumbs[depth])[0].files;
        depth += 1;
      } while (depth <= index);

      this.filesToShow = [...files];
      this.breadcrumbs = this.breadcrumbs.slice(0, index + 1);
    },
    reset() {
      this.filesToShow = this.files;
      this.breadcrumbs = [];
    },
    copy(text) {
      copyTextToClipboard(
        `https://cdn.jsdelivr.net/npm/${this.name}@${this.version}/${
          this.breadcrumbs.length === 0 ? "" : this.breadcrumbs.join("/") + "/"
        }${text}`
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.curp {
  cursor: pointer;
}
.entry > div {
  padding: 5px;
  &:hover {
    padding: 6px;
    padding-left: 8px;
    .controls {
      display: flex;
    }
  }
  .controls {
    display: none;
    align-items: center;
  }
  p {
    margin: 0;
  }
}
</style>
