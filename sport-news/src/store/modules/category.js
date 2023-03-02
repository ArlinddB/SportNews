import axios from "axios";

export default {
  namespaced: true,
  state: {
    paginatedCategories: [],
    allCategories: [],
    category: [],
    isLoading: null,
  },

  getters: {
    paginatedCategories: (state) => state.paginatedCategories,
    allCategories: (state) => state.allCategories,
    category: (state) => state.category,
    isLoading: (state) => state.isLoading,
  },

  actions: {
    async fetchCategories({ commit }, params) {
      commit("setIsLoading", true);

      const res = await axios.get(
        `${process.env.VUE_APP_API}categories?page=${params.page}&limit=${params.size}`
      );
      const paginatedCategories = await res.data.list;

      commit("setPaginatedCategories", paginatedCategories);

      commit("setIsLoading", false);
    },
    async fetchAllCategories({ commit }){

      const res = await axios.get(
        `${process.env.VUE_APP_API}categories?limit=0`
      );
      const allCategories = await res.data.list;

      commit("setAllCategories", allCategories);
    },
    async getById({ commit }, id) {
      commit("setIsLoading", true);

      const res = await axios.get(`${process.env.VUE_APP_API}categories/${id}`);
      const category = await res.data;

      commit("setCategory", category);

      commit("setIsLoading", false);
    },
    async createCategory({ commit }, categoryData) {
      const res = await axios.post(
        `${process.env.VUE_APP_API}categories`,
        categoryData
      );

      const newCategory = await res.data;
      commit("addCategory", newCategory);
    },
    async editCategory({ commit }, categoryData) {
      const res = await axios.put(
        `${process.env.VUE_APP_API}categories/${categoryData._id}`,
        categoryData
      );

      const newCategory = await res.data;
      commit("updateCategory", newCategory);
    },
    async deleteCategory({ commit }, categoryId) {
      await axios.delete(`${process.env.VUE_APP_API}categories/${categoryId}`);

      commit("removeCategoryById", categoryId);
    },
  },

  mutations: {
    setPaginatedCategories(state, paginatedCategories) {
      state.paginatedCategories = paginatedCategories;
    },
    setAllCategories(state, allCategories) {
      state.allCategories = allCategories;
    },
    setCategory(state, category) {
      state.category = category;
    },
    addCategory(state, category) {
      state.paginatedCategories.push(category);
    },
    updateCategory(state, category) {
      let c = state.paginatedCategories.find((v) => v._id == category._id);
      c = category;
    },
    removeCategoryById(state, categoryId) {
      state.paginatedCategories = state.paginatedCategories.filter(
        (category) => category._id !== categoryId
      );
      state.allCategories = state.allCategories.filter(
        (category) => category._id !== categoryId
      );
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
};