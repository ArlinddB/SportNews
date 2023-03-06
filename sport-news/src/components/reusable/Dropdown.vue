<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="font-semibold text-zinc-100 hover:text-white rounded-md focus:outline-none inline-flex items-center"
    >
      <span>{{ title }}</span>
      <svg
        class="fill-current h-4 w-4"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7 10l5 5 5-5z" />
      </svg>
    </button>
    <div
      v-if="showDropdown"
      class="absolute z-50 py-2 bg-indigo-900 lg:absolute lg:right-0 w-44 rounded-md shadow-lg mt-2"
    >
      <ul class="flex">
        <li
          v-for="option in options"
          :key="option.value"
          class="cursor-pointer px-4 py-2 text-sm text-zinc-100 hover:text-white hover:bg-indigo-400"
        >
          <router-link v-if="title == 'News'" @click="toggleDropdown" :to="`/${title}/${option.title}`">{{ option.title }}</router-link>
          <router-link v-else-if="option.title == 'Posts'" @click="toggleDropdown" :to="{name: 'posts-list'}">{{ option.title }}</router-link>
          <router-link v-else-if="title == 'Standings'" @click="toggleDropdown" :to="`/standings/${option.title}`">{{ option.title }}</router-link>
          <router-link v-else @click="toggleDropdown" :to="`/${option.title}`">{{ option.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
  
  <script>
export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      showDropdown: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    selectOption(option) {
      this.showDropdown = false;
    },
    onClick(e) {
      if (!this.$el.contains(e.target)) {
        this.showDropdown = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.onClick);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.onClick);
  },
};
</script>
  