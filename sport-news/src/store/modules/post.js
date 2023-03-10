import axios from "axios";
import moment from "moment/moment";

export default {
  namespaced: true,
  state: {
    post: [],
    allPosts: [],
    paginatedPosts: [],
    postsByCategory: [],
    mostClicked: [],
    isLoading: null,
  },

  getters: {
    post: (state) => {
      const post = state.post
      if(post){
        post.created_at = moment(post.created_at).format('MMM DD YYYY')
        post.updated_at = moment(post.updated_at).format('MMM DD YYYY')
      }
      return post;
    },
    allPosts: (state) => state.allPosts,
    paginatedPosts: (state) => state.paginatedPosts,
    isLoading: (state) => state.isLoading,
    postsByCategory:(state) => state.postsByCategory ,
    mostClicked: (state) => {
      const mostClicked = state.mostClicked;
      if (mostClicked && mostClicked.length) {
        return mostClicked.map(post => {
          post.created_at = moment(post.created_at).format('MMM DD YYYY');
          post.updated_at = moment(post.updated_at).format('MMM DD YYYY');
          return post;
        });
      }
      return mostClicked;
    }
  },

  actions: {
    async fetchPosts({ commit }, params) {
      commit("setIsLoading", true);

      const response = await axios.get(
        `${process.env.VUE_APP_API}posts?page=${params.page}&limit=${params.size}`
      );
      const paginatedPosts = response.data.list;

      commit("setPaginatedPosts", paginatedPosts);

      commit("setIsLoading", false);
    },
    async fetchAllPosts( { commit } ){
      const all = await axios.get(`${process.env.VUE_APP_API}posts?limit=0`);
      const allPosts = all.data.list;

      commit("setAllPosts", allPosts);
    },
    async getById({ commit }, id) {
      commit("setIsLoading", true);

      const response = await axios.get(`${process.env.VUE_APP_API}posts/${id}`);
      const post = response.data;

      commit("setPost", post);

      commit("setIsLoading", false);
    },
    async createPost({ commit }, post) {

      const res = await axios.post(`${process.env.VUE_APP_API}posts`, post);

      const newPost = await res.data;
      commit("addPost", newPost);
    },
    async editPost({ commit }, post) {
      const res = await axios.put(
        `${process.env.VUE_APP_API}posts/${post._id}`,
        post
      );

      const newPost = await res.data;
      commit("updatePost", newPost);
    },
    async deletePost({ commit }, postId) {
      await axios.delete(`${process.env.VUE_APP_API}posts/${postId}`);

      commit("removePostById", postId);
    },
    async postsByCategory({ commit }, category){
      commit('setIsLoading', true);

      const res = await axios.get(`${process.env.VUE_APP_API}posts/postByCategory/${category}`)

      const { data } = res;

      commit('setPostsByCategory', data)

      commit('setIsLoading', false)

    },
    async mostClicked({ commit }){
      const res = await axios.get(`${process.env.VUE_APP_API}posts/mostClicked`);

      const { data } = res;

      commit('setMostClicked', data);
    }
  },

  mutations: {
    setPaginatedPosts(state, paginatedPosts) {
      state.paginatedPosts = paginatedPosts;
    },
    setAllPosts(state, allPosts) {
      state.allPosts = allPosts;
    },
    setPost(state, post) {
      state.post = post;
    },
    addPost(state, post) {
      state.paginatedPosts.push(post);
    },
    updatePost(state, post) {
      let c = state.paginatedPosts.find((v) => v._id == post._id);
      c = post;
    },
    removePostById(state, postId) {
      state.paginatedPosts = state.paginatedPosts.filter(
        (post) => post._id !== postId
      );
      state.allPosts = state.allPosts.filter((post) => post._id !== postId);
    },
    setPostsByCategory(state, posts){
      state.postsByCategory = posts;
    },
    setMostClicked(state, posts){
      state.mostClicked = posts
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
};
