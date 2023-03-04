<script>
export default {
  data() {
    return {
      errors: {
        title: []
      },
      newCategory: {
        title: "",
      },
    };
  },
  methods: {  
    async handleCreateCategory() {
      this.errors.title = [];
      if(this.newCategory.title == ""){
        this.errors.title.push("Title is required")
        return;
      }
      if(this.newCategory.title.length < 3){
        this.errors.title.push("Title should be at least 3 characters")
        return;
      }
      this.$store.dispatch("category/createCategory", { ...this.newCategory });
      this.newCategory.title = "";
      this.$router.push('/category')
    },
  },
};
</script>

<template>
  <div class="p-0 sm:p-12 min-h-[79vh]">
    <div
      class="
        mx-auto
        max-w-md
        mt-8
        px-6
        py-12
        bg-gray-50
        dark:bg-gray-900
        border-0
        shadow-lg
        sm:rounded-3xl
      "
    >
      <h1 class="text-2xl font-bold mb-8 text-zinc-700 dark:text-zinc-300">
        Add a new category
      </h1>
      <form @submit.prevent="handleCreateCategory">
        <div class="relative z-0 w-full mb-5">
          <input
            type="text"
            placeholder=" "
            id="title"
            v-model="newCategory.title"
            required
            class="
              pt-3
              pb-2
              block
              w-full
              px-0
              mt-0
              bg-transparent
              border-0 border-b-2 border-zinc-400
              appearance-none
              focus:outline-none focus:ring-0 focus:border-blue-400
              text-zinc-700
              dark:text-zinc-300
            "
          />
          <label
            class="
              absolute
              duration-300
              top-3
              -z-1
              origin-0
              text-zinc-700
              dark:text-zinc-300
            "
            >Enter category name</label
          >
          <span v-show="errors.title.length > 0" class="text-red-500" v-for="(error, idx) in errors.title" :key="idx">
            {{ error }}
          </span>
        </div>

        <div class="flex justify-between">
          <router-link
            class="
              hvr-icon-back
              px-4
              py-2.5
              mt-3
              text-md text-white
              transition-all
              duration-150
              ease-linear
              rounded-lg
              shadow
              outline-none
              bg-gray-500
              hover:bg-gray-700 hover:shadow-lg
              focus:outline-none
            "
            :to="{name: 'categories-list'}"
          >
            <i class="fa-solid fa-angle-left hvr-icon mr-2"></i>
            Back to list
          </router-link>

          <button
            type="submit"
            id="submitBtn"
            class="
              px-6
              py-3
              mt-3
              text-md text-white
              transition-all
              duration-150
              ease-linear
              rounded-lg
              shadow
              outline-none
              bg-blue-600
              hover:bg-blue-700 hover:shadow-lg
              focus:outline-none
            "
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
