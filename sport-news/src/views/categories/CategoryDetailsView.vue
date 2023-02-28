<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      category: 'category/category',
      isLoading: 'category/isLoading'
    }),
  },
  mounted() {
    this.$store.dispatch("category/getById", this.$route.params.id);
  },
};
</script>

<template>
  <div class="min-h-[79vh]">
    <div v-if="isLoading">
      <h1>Loading...</h1>
    </div>
    <div v-if="!isLoading" class="p-0 sm:p-12">
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
          Details
        </h1>
        <form @submit.prevent="">
          <div class="relative z-0 w-full mb-5">
            <input
              type="text"
              placeholder=" "
              id="title"
              v-model="category.title"
              :disabled="true"
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
              >Category name</label
            >
          </div>

          <div class="flex justify-between">
            <router-link
              to="/category"
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
            >
              <i class="fa-solid fa-angle-left hvr-icon mr-2"></i>
              Back to list
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
