<template>
  <div class="min-h-[79vh]">
    <div class="flex flex-col md:flex-row p-3 ml-8 justify-evenly">
      <div class="max-w-3xl w-full dark:shadow-none shadow-lg overflow-hidden">
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
            <p class="text-zinc-400 dark:text-zinc-500 mt-2">{{ post.category }}</p>
            <p class="text-zinc-400 dark:text-zinc-500 mt-2">{{ post.created_at }}</p>
          </div>
        </div>
      </div>
      <aside class="w-full md:w-1/4 px-4">
        <h2
          class="text-2xl text-center dark:text-zinc-100 dark:hover:text-white p-4"
        >
          Similar Stories
        </h2>
        <ul class="mt-4 px-4 sm:px-0">
          <li class="py-2 border-b border-gray-700">
            <a class="dark:text-zinc-100 dark:hover:text-white" href="#"
              >Story 1</a
            >
          </li>
          <li class="py-2 border-b border-gray-700">
            <a class="dark:text-zinc-100 dark:hover:text-white" href="#"
              >Story 2</a
            >
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>
  
<script>
import { mapGetters } from "vuex";
import axios from 'axios';

export default {
  computed: {
    ...mapGetters({
        post: 'post/post',
        isLoading: 'post/isLoading',
    }),
  },
  async created(){
    try {
        // Increment the clicks for this post
        await axios.put(`${process.env.VUE_APP_API}posts/${this.$route.params.id}/incrementClicks`);
      } catch (error) {
        console.error(error);
      }
  },
  mounted() {
    this.$store.dispatch("post/getById", this.$route.params.id);
  },
};
</script>

  