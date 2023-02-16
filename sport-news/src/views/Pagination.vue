<template>
  <nav class="flex items-center justify-center mt-8">
    <ul class="flex border-gray-300 border rounded-md">
      <li :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }">
        <button
          :disabled="currentPage === 1"
          class="px-3 py-2 rounded-l-md border-r border-gray-300 font-medium"
          @click="goToPage(currentPage - 1)"
        >
          Previous
        </button>
      </li>

      <div v-for="page in pages" :key="page>
        <li :key="page">
          <button
            :class="{
              'bg-gray-900 text-white': currentPage === page,
              'hover:bg-gray-200': currentPage !== page,
            }"
            class="px-3 py-2 rounded-md border-gray-300 font-medium"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </li>
      </div>

      <li
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === pageCount }"
      >
        <button
          :disabled="currentPage === pageCount"
          class="px-3 py-2 rounded-r-md border-l border-gray-300 font-medium"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>
  
  <script>
export default {
  name: "pagination",
  props: {
    pageCount: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },

  computed: {
    pages() {
      const start = Math.max(1, this.currentPage - 2);
      const end = Math.min(this.pageCount, this.currentPage + 2);

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
  },

  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.pageCount) {
        this.$emit("update:currentPage", page);
      }
    },
  },
};
</script>
  
  <style>
/* This is optional and can be customized to fit your design */
button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
  