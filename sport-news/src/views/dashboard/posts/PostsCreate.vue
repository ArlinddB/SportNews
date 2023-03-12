<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      errors: {
        title: [],
        content: [],
        img: [],
      },
      newPost: {
        title: "",
        content: "",
        img: "",
        category: "",
      },
      selectedOption: "Select a category",
    };
  },
  computed: {
    ...mapGetters({
      allCategories: "category/allCategories",
    }),
  },
  methods: {
    async handleCreatePost() {
      this.errors.title = [];
      if (this.newPost.title == "") {
        this.errors.title.push("Title is required");
        return;
      }
      if (this.newPost.title.length < 5) {
        this.errors.title.push("Title should be at least 5 characters");
        return;
      }

      this.errors.content = [];
      if (this.newPost.content == "") {
        this.errors.content.push("Content is required");
        return;
      }

      this.errors.img = [];
      if (this.newPost.img == "") {
        this.errors.img.push("Image is required");
        return;
      }

      this.newPost.category = this.selectedOption.title;

      this.$store.dispatch("post/createPost", { ...this.newPost });

      this.$router.push("/dashboard/posts/");
    },
  },
  mounted() {
    this.$store.dispatch("category/fetchAllCategories");
  },
};
</script>

<template>
  <div class="p-0 sm:p-12 min-h-[79vh]">
    <div
      class="mx-auto max-w-md mt-8 px-6 py-12 bg-gray-50 dark:bg-[#17191f] border-0 shadow-lg sm:rounded-3xl"
    >
      <h1 class="text-2xl font-bold mb-8 text-zinc-700 dark:text-zinc-300">
        Add a new Post
      </h1>
      <form @submit.prevent="handleCreatePost">
        <div class="relative z-0 w-full mb-5">
          <input
            type="text"
            placeholder=" "
            id="title"
            v-model="newPost.title"
            required
            class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 border-zinc-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-400 text-zinc-700 dark:text-zinc-300"
          />
          <label
            class="absolute duration-300 top-3 -z-1 origin-0 text-zinc-700 dark:text-zinc-300"
            >Enter post title</label
          >
          <span
            v-show="errors.title.length > 0"
            class="text-red-500"
            v-for="(error, idx) in errors.title"
            :key="idx"
          >
            {{ error }}
          </span>
        </div>

        <div class="relative z-0 w-full mb-5">
          <textarea
            type="text"
            placeholder=" "
            id="content"
            v-model="newPost.content"
            required
            class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 border-zinc-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-400 text-zinc-700 dark:text-zinc-300"
          ></textarea>
          <label
            class="absolute duration-300 top-3 -z-1 origin-0 text-zinc-700 dark:text-zinc-300"
            >Enter post content</label
          >
          <span
            v-show="errors.content.length > 0"
            class="text-red-500"
            v-for="(error, idx) in errors.content"
            :key="idx"
          >
            {{ error }}
          </span>
        </div>

        <div class="relative z-0 w-full mb-5">
          <input
            type="text"
            placeholder=" "
            id="img"
            v-model="newPost.img"
            required
            class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 border-zinc-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-400 text-zinc-700 dark:text-zinc-300"
          />
          <label
            class="absolute duration-300 top-3 -z-1 origin-0 text-zinc-700 dark:text-zinc-300"
            >Enter post image</label
          >
          <span
            v-show="errors.img.length > 0"
            class="text-red-500"
            v-for="(error, idx) in errors.img"
            :key="idx"
          >
            {{ error }}
          </span>
        </div>

        <div class="z-0 w-full mb-5">
          <!-- <select
            class="pt-3 pb-2 block w-full px-0 mt-0 one-select bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:bg-transparent active:bg-transparent border-gray-200 text-zinc-700 dark:text-zinc-300"
            v-model="newPost.category"
          >
            <option value="" disabled>Select a Category</option>
            <option
              v-for="category in allCategories"
              :key="category._id"
              :value="category.title"
            >
              {{ category.title }}
            </option>
          </select> -->

          <v-select
            v-model="selectedOption"
            :options="allCategories"
            :searchable="true"
            label="title"
            class="text-zinc-700 dark:text-zinc-300 select-dropdown"
          />            

        </div>

        <div class="flex justify-between">
          <router-link
            class="hvr-icon-back px-4 py-2.5 mt-3 text-md text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-gray-500 hover:bg-gray-700 hover:shadow-lg focus:outline-none"
            to="/dashboard/posts"
          >
            <i class="fa-solid fa-angle-left hvr-icon mr-2"></i>
            Back to list
          </router-link>

          <button
            type="submit"
            id="submitBtn"
            class="px-6 py-3 mt-3 text-md text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-blue-600 hover:bg-blue-700 hover:shadow-lg focus:outline-none"
          >
            Add Post
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
@import "vue-select/dist/vue-select.css";
</style>