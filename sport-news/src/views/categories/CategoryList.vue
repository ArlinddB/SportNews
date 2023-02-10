<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["categories"]),
  },
  methods: {
    handleDeleteCategory(categoryId) {
      this.$store.dispatch("deleteCategory", categoryId);
    },
  },
  mounted() {
    this.$store.dispatch("fetchCategories");
  },
};
</script>

<template>
  <div class="container max-w-lg mx-auto px-4 sm:px-8 min-h-[79vh]">
    <div class="py-8 -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div class="pt-2 pb-6 flex justify-between">
        <a
          class="
            inline-block
            px-4
            py-2.5
            text-white
            font-medium
            text-sm
            leading-tight
            rounded
            shadow-md
            bg-blue-600
            hover:bg-blue-700 hover:shadow-lg
            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-700 active:shadow-lg
            transition
            duration-150
            ease-in-out
          "
          href="/category/create"
          >Add new Category</a
        >
      </div>
      <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                class="
                  px-5
                  py-3
                  border-b-2 border-zinc-400
                  bg-gray-50
                  dark:bg-gray-900
                  text-left text-xs
                  font-semibold
                  text-zinc-700 dark:text-zinc-300
                  uppercase
                  tracking-wider
                "
              >
                Title
              </th>
              <th
                class="
                  px-5
                  py-3
                  border-b-2 border-zinc-400
                  bg-gray-50
                  dark:bg-gray-900
                  text-left text-xs
                  font-semibold
                  text-zinc-700 dark:text-zinc-300
                  uppercase
                  tracking-wider
                "
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in this.categories" :key="category._id">
              <td
                class="
                  px-5
                  py-5
                  border-t border-zinc-400
                  bg-gray-50
                  dark:bg-gray-900
                  text-zinc-700 dark:text-zinc-300 text-sm
                  break-all
                "
              >
                {{ category.title }}
              </td>
              <td
                class="px-5 py-5 border-t border-zinc-400 bg-gray-50
                  dark:bg-gray-900 text-sm"
              >
                <a
                  class="
                    inline-block
                    px-4
                    py-2.5
                    bg-blue-600
                    text-white
                    font-medium
                    text-xs
                    leading-tight
                    rounded
                    shadow-md
                    hover:bg-blue-700 hover:shadow-lg
                    focus:bg-blue-700
                    focus:shadow-lg
                    focus:outline-none
                    focus:ring-0
                    active:bg-blue-800 active:shadow-lg
                    transition
                    duration-150
                    ease-in-out
                    m-1
                  "
                  
                  ><i class="fa-solid fa-pen mr-2"></i>Edit</a
                >
                <a
                  class="
                    inline-block
                    px-4
                    py-2.5
                    bg-red-600
                    text-white
                    font-medium
                    text-xs
                    leading-tight
                    rounded
                    shadow-md
                    hover:bg-red-700 hover:shadow-lg
                    focus:bg-red-700
                    focus:shadow-lg
                    focus:outline-none
                    focus:ring-0
                    active:bg-red-800 active:shadow-lg
                    my-1
                    transition
                    duration-150
                    ease-in-out
                    m-1
                  "
                  
                  ><i class="fa-solid fa-trash mr-2"></i>Delete</a
                >
                <a
                  class="
                    inline-block
                    px-4
                    py-[8px]
                    border-2 border-blue-600
                    text-zinc-700
                    dark:text-white
                    font-medium
                    text-xs
                    leading-tight
                    rounded
                    hover:bg-blue-700 hover:text-white
                    focus:outline-none focus:ring-0
                    transition
                    duration-150
                    ease-in-out
                    m-1
                  "
                  
                  ><i class="fa-solid fa-eye mr-2"></i>Details</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- <div>
    <h2>Cat list</h2>
    <div v-for="category in this.categories" :key="category._id">
      <h3>{{ category.title }}</h3>

      <p>{{ category.description }}</p>

      <button @click="handleDeleteCategory(category._id)">Delete</button>
    </div>
  </div> -->
</template>