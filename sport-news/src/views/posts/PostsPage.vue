<template>
  <div class="min-h-[79vh]">
    <div class="flex flex-col md:flex-row p-3 md:ml-8 m-4 justify-evenly">
      <div class="md:max-w-2xl w-full dark:shadow-none shadow-lg overflow-hidden mr-8">
        <img
          class="h-60 w-full object-cover"
          :src="post.img"
          alt="Post Image"
        />

        <div class="p-6">
          <h2 class="text-2xl font-bold text-zinc-700 dark:text-zinc-300">
            {{ post.title }}
          </h2>
          <div class="mt-4">
            <p class="text-zinc-700 dark:text-zinc-300">{{ post.content }}</p>
          </div>
          <div class="flex mt-4 gap-4">
            <p class="text-zinc-400 dark:text-zinc-500 mt-2">
              {{ post.category }}
            </p>
            <p class="text-zinc-400 dark:text-zinc-500 mt-2">
              {{ post.created_at }}
            </p>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/4 px-4">
        <h2
          class="text-2xl md:text-center dark:text-zinc-100 dark:hover:text-white p-4"
        >
          Similar Stories
        </h2>
        <aside-posts v-for="post in similarPosts" :key="post._id" :postData="post"/>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapGetters } from "vuex";
import axios from "axios";
import AsidePosts from "../../components/reusable/AsidePosts.vue";

export default {
  components: {
    'aside-posts': AsidePosts
  },
  computed: {
    ...mapGetters({
      post: "post/post",
      isLoading: "post/isLoading",
    }),
  },
  methods: {
    async getSimilarPosts() {
      try {
        const res = await axios.get(`${process.env.VUE_APP_API}posts/${this.$route.params.id}/similarPosts`);

        this.similarPosts = res.data

      } catch (err) {
        console.error(err.message);
      }
    },
  },
  data() {
    return {
      similarPosts: [],
    };
  },
  async created() {
    try {
      // Increment the clicks for this post
      await axios.put(`${process.env.VUE_APP_API}posts/${this.$route.params.id}/incrementClicks`);

    } catch (error) {
      console.error(error);
    }
  },
  mounted() {
    this.$store.dispatch("post/getById", this.$route.params.id);
    this.getSimilarPosts();
  },
};
</script>

  