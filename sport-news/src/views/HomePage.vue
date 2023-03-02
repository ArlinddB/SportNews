<template>
  <div class="min-h-screen dark:bg-gray-800">
    <section class="mx-auto py-10">
      <div class="flex flex-col md:flex-row">
        <main class="w-full px-4">
          <h2 class="text-2xl dark:text-zinc-100 dark:hover:text-white p-4">
            Latest Headlines
          </h2>
          <div class="flex flex-wrap">
            <article
              class="w-full md:w-2/4 lg:w-2/6 p-4"
              v-for="post in posts"
              :key="post._id"
            >
              <div
                class="bg-slate-100 dark:bg-gray-900 rounded-lg shadow-lg p-6"
              >
                <h3
                  class="text-xl font-bold dark:text-zinc-100 dark:hover:text- mb-3"
                  style="
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                  "
                >
                  {{ post.title }}
                </h3>
                <span class="text-zinc-400 dark:text-zinc-500">{{post.category}}</span>
                <p
                  class="text-gray-700 mt-4 dark:text-zinc-100 dark:hover:text-white"
                  style="
                    display: -webkit-box;
                    -webkit-line-clamp: 5;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                  "
                >
                  {{ post.content }}
                </p>
                <div class="mt-5">
                  <router-link
                    class="bg-blue-500 text-white dark:text-zinc-100 dark:hover:text-white px-4 py-2 rounded-full hover:bg-blue-600"
                    :to="`/posts/${post._id}`"
                    >Read More</router-link
                  >
                </div>
              </div>
            </article>
          </div>
        </main>
        <aside class="w-full md:w-1/4 px-4">
          <h2
            class="text-2xl text-center dark:text-zinc-100 dark:hover:text-white p-4"
          >
            Top Stories
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
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  // name: "HelloWorld",
  computed: {
    ...mapGetters({
      posts: "post/allPosts",
    }),
  },
  mounted() {
    this.$store.dispatch("post/fetchAllPosts");
  },
};
</script>
