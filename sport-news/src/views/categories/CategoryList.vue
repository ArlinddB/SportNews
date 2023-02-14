<script>
import { mapGetters } from "vuex";

export default {
  data(){
    return{
      search: '',
    }
  },
  computed: {
    ...mapGetters(["categories", "isLoading"]),
    filteredList() {
      return this.categories.filter(c => c.title.toLowerCase().includes(this.search.toLowerCase()))
    }
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
  <div class="min-h-[79vh] flex justify-center items-center">
    <div v-if="isLoading">
      <span class="loader"></span>
    </div>
    <div v-if="!isLoading" class="container max-w-lg mx-auto px-4 sm:px-8">
      <div
        class="py-8 -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto"
      >
        <div class="pt-2 pb-6 flex justify-between">
          <router-link
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
            to="/category/create"
            >Add new Category
          </router-link>
          <div class="w-auto flex justify-end px-2 items-center focus:ring-0 transition duration-300 border-b-2 border-b-[#006db0]">
            <input type="search" v-model="search" placeholder="Search..." class="bg-transparent text-zinc-700 dark:text-zinc-300 border-none outline-none">
          </div>
        </div>
        <div
          class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
        >
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
                    text-zinc-700
                    dark:text-zinc-300
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
                    text-zinc-700
                    dark:text-zinc-300
                    uppercase
                    tracking-wider
                  "
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="category in this.filteredList" :key="category._id">
                <td
                  class="
                    px-5
                    py-5
                    border-t border-zinc-400
                    bg-gray-50
                    dark:bg-gray-900
                    text-zinc-700
                    dark:text-zinc-300
                    text-sm
                    break-all
                  "
                >
                  {{ category.title }}
                </td>
                <td
                  class="
                    px-5
                    py-5
                    border-t border-zinc-400
                    bg-gray-50
                    dark:bg-gray-900
                    text-sm
                  "
                >
                  <router-link
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
                    :to="`/category/edit/${category._id}`"
                    ><i class="fa-solid fa-pen mr-2"></i>Edit</router-link
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
                      cursor-pointer
                    "
                    @click="handleDeleteCategory(category._id)"
                    ><i class="fa-solid fa-trash mr-2"></i>Delete</a
                  >
                  <router-link
                    class="
                      inline-block
                      px-4
                      py-[8px]
                      border-2 border-blue-700
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
                    :to="`/category/details/${category._id}`"
                    ><i class="fa-solid fa-eye mr-2"></i>Details</router-link
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>