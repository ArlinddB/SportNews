<script>
import axios from 'axios';
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
        post: 'post/post',
        isLoading: 'post/isLoading'
    }),
  },
  mounted() {
    this.$store.dispatch("post/getById", this.$route.params.id);
  },
};
</script>

<template>
  <div class="min-h-[79vh] flex justify-center items-center">
    <div v-if="isLoading">
      <span class="loader"></span>
    </div>
    <div v-if="!isLoading" class="p-0 sm:p-12">
      <div
        class="
          mx-auto
          w-[28rem]
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
        <form>
          <div class="relative z-0 w-full mb-5">
            <input
              type="text"
              placeholder=" "
              id="title"
              v-model="post.title"
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
              >Post title</label
            >
          </div>

          <div class="relative z-0 w-full mb-5">
            <input
              type="text"
              placeholder=" "
              id="content"
              v-model="post.content"
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
              >Post content</label
            >
          </div>

          <div class="relative z-0 w-full mb-5">
            <input
              type="text"
              placeholder=" "
              id="img"
              v-model="post.img"
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
              >Post image</label
            >
          </div>

          <div class="relative z-0 w-full mb-5">
            <input
              type="text"
              placeholder=" "
              id="category"
              v-model="post.category"
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
              >Category</label
            >
          </div>

          <div class="flex justify-between">
            <router-link
              to="/posts/list"
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
