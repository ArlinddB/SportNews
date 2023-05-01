import apiRequest from "../../utility/apiRequest";
import axios from "axios";
import logInUser from "@/firebase/user/logInUser";



export default {
  namespaced: true,
  state: {
    user: [],
    users: [],
    userById: {},
    usersByClaim: [],
    isLoading: null,
  },
  getters: {
    user: (state) => state.user,
    users: (state) => state.users,
    userById: state => {
      return state.userById
    },
    usersByClaim: (state) => state.usersByClaim,
    isLoading: (state) => state.isLoading,
  },
  actions: {
    async logInUser({ commit }, payload) {
      const user = await logInUser(payload);
      commit("setUser", user);
    },
    async allUsers({commit}){
      const res = await axios.get(`${process.env.VUE_APP_API}users/`);
      commit('setAllUsers', res.data.users)
    },
    async registerUser({ commit }, payload) {
      await apiRequest.registerUser(payload);
    },

    async userById({ commit }, id) {
      const res = await axios.get(`${process.env.VUE_APP_API}users/${id}`);

      const { data } = res;

      commit('setUserById', data);

    },
    async usersByClaim ({commit}, claim){
      const res = await axios.get(`${process.env.VUE_APP_API}users/usersByClaim/${claim}`)

      const { data } = res;
      
      commit('setUsersByClaim', data)
    },
    async editUser({commit}, user){
      console.log(user);
      const res = await axios.put(`${process.env.VUE_APP_API}users/${user.id}`, user)

      commit('updateUser', res.data)
    },
    async deleteUser({commit}, id){
      
      await axios.delete(`${process.env.VUE_APP_API}users/${id}`)

      commit('deleteUser', id)
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUserById(state, user) {
      state.userById = user;
    },
    setAllUsers(state, users) {
      state.users = users;
    },
    setUsersByClaim(state, users){
      state.usersByClaim = users;
    },
    updateUser(state, usr) {
      let c = state.users.find((v) => v.uid == usr.id);
      c = usr;
    },
    setDeleteUser(state, id){
      state.usersByClaim = state.usersByClaim.filter(
        (user) => user.uid !== id
      );
      // state.allPosts = state.allPosts.filter((post) => post._id !== postId);
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
};
