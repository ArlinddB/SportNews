<template>
  <article class="w-full md:w-2/4 lg:w-2/6 p-4">
    <div class="bg-slate-100 dark:bg-gray-900 rounded-lg shadow-lg p-6">
      <h3
        class="text-xl font-bold dark:text-zinc-100 dark:hover:text- mb-3"
        :title="`${postData.title}`"
        style="
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        "
      >
        {{ postData.title }}
      </h3>
      <span class="text-zinc-400 dark:text-zinc-500">{{
        postData.category
      }}</span>
      <p
        class="text-gray-700 mt-4 dark:text-zinc-100 dark:hover:text-white"
        style="display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        "
      >
        {{ postData.content }}
      </p>
      <div class="mt-5">
        <router-link
          class="bg-blue-500 text-white dark:text-zinc-100 dark:hover:text-white px-4 py-2 rounded-full hover:bg-blue-600"
          :to="`/posts/${postData._id}`"
          >Read More</router-link
        >
      </div>
    </div>
  </article>
</template>
  
<script>
export default {
  props: {
    postData: {
      type: Object,
      required: true,
    },
  },
};
</script>