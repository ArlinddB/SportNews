<template>
  <div class="min-h-screen dark:bg-gray-800">
    <section class="mx-auto py-10">
      <div class="flex flex-col lg:flex-row p-3 m-4">
        <main class="w-full lg:pr-4">
          <h2 class="text-2xl dark:text-zinc-100 dark:hover:text-white p-4">
            Latest Headlines
          </h2>
          <div class="flex flex-wrap">
            <post-item v-for="post in posts" :postData="post" :key="post._id" />
          </div>
        </main>
        <div class="w-full lg:w-1/4 px-4" v-if="mostClicked">
          <h2
            class="text-2xl text-center dark:text-zinc-100 dark:hover:text-white p-4"
          >
            Top Posts
          </h2>
          <aside-posts v-for="post in mostClicked" :key="post._id" :postData="post" />
        </div>
      </div>
    </section>
  </div>      
</template>

<script>
import { mapGetters } from "vuex";
import PostItem from '../components/reusable/PostItem.vue';
import AsidePosts from "../components/reusable/AsidePosts.vue";

export default {
  components: {
    'post-item': PostItem,
    'aside-posts': AsidePosts
  },  
  computed: {
    ...mapGetters({
      posts: "post/allPosts",
      mostClicked: "post/mostClicked"
    }),
  },
  mounted() {
    this.$store.dispatch("post/fetchAllPosts");
    this.$store.dispatch("post/mostClicked");
  },
};
</script>
