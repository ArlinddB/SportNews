<template>
  <aside>
    <ul class="mt-4 px-4 sm:px-0">
      <li class="py-2 border-b border-gray-700">
        <router-link :to="{name: 'posts-page', params: { id: `${postData._id}`}}" class="dark:text-zinc-100 dark:hover:text-white cursor-pointer">
            {{ postData.title }}
        </router-link>
      </li>
    </ul>
  </aside>
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