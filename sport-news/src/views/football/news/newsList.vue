<template>
  <div class="min-h-screen dark:bg-gray-800">
    <section class="mx-auto py-10">
      <div class="flex flex-col md:flex-row">
        <main class="w-full px-4">
          <h2 class="text-2xl dark:text-zinc-100 dark:hover:text-white p-4">
            Latest Headlines
          </h2>
          <div class="flex flex-wrap">
            <post-item v-for="post in posts" :postData="post" :key="post._id"/>
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
import PostItem from '../../../components/reusable/PostItem.vue';

export default {
  components: {
    'post-item': PostItem
  },
  data() {
    return {
      category: "Football",
    };
  },
  computed: {
    ...mapGetters({
      posts: "post/postsByCategory",
    }),
  },
  mounted() {
    this.$store.dispatch("post/postsByCategory", this.category);
  },
};
</script>
