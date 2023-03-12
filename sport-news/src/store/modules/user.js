import apiRequest from "../../utility/apiRequest";
import axios from "axios";
import logInUser from "@/firebase/user/logInUser";



export default {
  namespaced: true,
  state: {
    user: null,
    isLoading: null,
  },
  getters: {
    user: (state) => state.user,
    isLoading: (state) => state.isLoading,
  },
  actions: {
    async logInUser({ commit, dispatch }, payload) {
      const user = await logInUser(payload);
      commit("setUser", user);
    },

    async registerUser({ commit }, payload) {
      await apiRequest.registerUser(payload);
    },

    async userById({ commit }, id) {
      const res = await axios.get(`${process.env.VUE_APP_API}users/${id}`);

      const { data } = res;

      console.log(data);

      commit("setUser", data);
    },

  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
};
