import apiRequest from "../../utility/apiRequest";
import axios from "axios";
import logInUser from "@/firebase/user/logInUser";

export default {
  namespaced: true,
  state: {
    user: null,
    allUsers: [],
    paginatedUsers: [],
    isLoading: null,
  },
  getters: {
    user: (state) => state.user,
    allUsers: (state) => state.allUsers,
    paginatedUsers: (state) => state.paginatedUsers,
    isLoading: (state) => state.isLoading,
  },
  actions: {
    async logInUser({ commit }, payload) {
      const user = await logInUser(payload);
      commit("setUser", user);
    },

    async registerUser({ commit }, payload) {
      await apiRequest.registerUser(payload);
    },

    async fetchUsers({ commit }, params) {
      commit("setIsLoading", true);

      const response = await axios.get(`${process.env.VUE_APP_API}users`);
      const { data } = response;

      commit("setPaginatedUsers", data);

      commit("setIsLoading", false);
    },
    async fetchAllUsers({ commit }) {
      const all = await axios.get(`${process.env.VUE_APP_API}users?limit=0`);
      const allUsers = all.data.list;

      commit("setAllUsers", allUsers);
    },
    async editUser({ commit }, user) {
      const res = await axios.put(
        `${process.env.VUE_APP_API}users/${user._id}`,
        user
      );

      const newUser = await res.data;
      commit("updateUser", newUser);
    },
    async deleteUser({ commit }, userId) {
      await axios.delete(`${process.env.VUE_APP_API}users/${userId}`);

      commit("removeUserById", userId);
    },
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setPaginatedUsers(state, paginatedUsers) {
      state.paginatedUsers = paginatedUsers;
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    removeUserById(state, userId) {
      state.paginatedUsers = state.paginatedUsers.filter(
        (user) => user._id !== userId
      );
      state.allUsers = state.allUsers.filter((user) => user._id !== userId);
    },
    updateUser(state, user) {
      let c = state.paginatedUsers.find((v) => v._id == user._id);
      c = user;
    },
    setAllUsers(state, allUsers) {
      state.allUsers = allUsers;
    },
  },
};
