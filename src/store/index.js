import Vue from "vue";
import Vuex from "vuex";
import { nanoid } from "nanoid";
import { cancelToken } from "@/api/config.js";
import { search } from "@/api/search.js";
import { getTimeAgo } from "@/utils/getTimeAgo";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    query: "",
    pkgs: [],
    totalPkgs: 0,
    loading: false,
    currentPage: 1
  },
  mutations: {
    SET_QUERY(state, query) {
      state.query = query;
    },
    SET_PKGS(state, pkgs) {
      state.pkgs = pkgs;
    },
    SET_TOTAL_PKGS(state, totalPkgs) {
      state.totalPkgs = totalPkgs;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },
    RESET(state) {
      state.pkgs = [];
      state.totalPkgs = 0;
      state.query = "";
    }
  },
  actions: {
    async fetchPkgs({ commit }, queryParams) {
      commit("SET_LOADING", true);
      try {
        commit("SET_QUERY", queryParams.query);
        const data = await search(queryParams, cancelToken);
        const pkgs = data.objects.map(pkg => {
          const {
            name,
            description,
            links,
            publisher,
            date,
            version,
            keywords
          } = pkg.package;

          return {
            id: nanoid(),
            name,
            description,
            links,
            publisher,
            date: getTimeAgo(date),
            version,
            keywords
          };
        });
        commit("SET_TOTAL_PKGS", data.total);
        commit("SET_PKGS", pkgs);
      } catch (error) {
        commit("SET_LOADING", false);
      }
      commit("SET_LOADING", false);
    },
    paginate({ commit, dispatch }, { query, currentPage, perPage = 10 }) {
      commit("SET_CURRENT_PAGE", currentPage);
      const from = (currentPage - 1) * perPage;
      dispatch("fetchPkgs", { query, from: from });
    }
  },
  getters: {
    getQuery(state) {
      return state.query;
    },
    getPkgs(state) {
      return state.pkgs;
    },
    getTotalPkgs(state) {
      return state.totalPkgs;
    },
    getCurrentPage(state) {
      return state.currentPage;
    },
    getLoading(state) {
      return state.loading;
    }
  },
  modules: {}
});
