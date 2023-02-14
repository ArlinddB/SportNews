import axios from "axios";

const state = () => ({
  categories: [],
  category: [],
  isLoading: null,
});

const getters = {
  categories: (state) => state.categories,
  category: (state) => state.category,
  isLoading: (state) => state.isLoading,
};

const actions = {
  async fetchCategories({ commit }) {
    commit("setIsLoading", true);

    const res = await axios.get("http://localhost:4000/categories");
    const categories = await res.data;

    commit("setIsLoading", false);

    commit("setCategories", categories);
  },
  async getById({ commit }, id) {
    commit("setIsLoading", true);

    const res = await axios.get(`http://localhost:4000/categories/${id}`);
    const category = await res.data;

    commit("setIsLoading", false);

    commit("setCategory", category);
  },
  async createCategory({ commit }, categoryData) {
    const res = await axios.post(
      "http://localhost:4000/categories",
      categoryData
    );

    const newCategory = await res.data;
    commit("addCategory", newCategory);
  },
  async editCategory({ commit }, categoryData) {
    const res = await axios.put(
      `http://localhost:4000/categories/${categoryData._id}`,
      categoryData
    );

    const newCategory = await res.data;
    commit("updateCategory", newCategory);
  },
  async deleteCategory({ commit }, categoryId) {
    await axios.delete(`http://localhost:4000/categories/${categoryId}`);

    commit("removeCategoryById", categoryId);
  },
};

const mutations = {
  setCategories(state, categories) {
    state.categories = categories;
  },
  setCategory(state, category) {
    state.category = category;
  },
  addCategory(state, category) {
    state.categories.push(category);
  },
  updateCategory(state, category) {
    let c = state.categories.find((v) => v._id == category._id);
    c = category;
  },
  removeCategoryById(state, categoryId) {
    state.categories = state.categories.filter(
      (category) => category._id !== categoryId
    );
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
};

export default {
  getters,
  state,
  actions,
  mutations,
};
