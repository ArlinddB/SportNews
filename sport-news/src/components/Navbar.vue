<template>
  <div>
    <nav
      class="
        px-6
        py-5
        bg-blue-400
        dark:bg-gray-900
        shadow-lg
        md:flex md:justify-between md:items-center
      "
    >
      <div class="flex items-center justify-between">
        <router-link
          to="/"
          class="text-xl font-bold text-gray-100 md:text-2xl hover:text-white"
          >Logo
        </router-link>
        <!-- Mobile menu button -->
        <div @click="toggleNav" class="flex md:hidden">
          <button
            type="button"
            class="
              text-gray-100
              hover:text-gray-400
              focus:outline-none focus:text-gray-400
            "
          >
            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
              <path
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <ul
        :class="showMenu ? 'flex' : 'hidden'"
        class="
          flex-col
          mt-8
          space-y-4
          md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0
        "
      >
        <li class="text-zinc-100 hover:text-white">
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <div class="relative">
            <!-- Dropdown toggle button -->
            <button
              @click="show = !show"
              class="
                flex
                items-center
                text-zinc-100
                hover:text-white
                rounded-md
                focus:outline-none
              "
            >
              <span class="mr-4 text-zinc-100 hover:text-white"
                >Managment</span
              >
              <svg
                class="w-5 h-5 text-zinc-100 hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <!-- Dropdown menu -->
            <div
              v-show="show"
              class="
                py-2
                mt-2
                bg-indigo-900
                rounded-md
                shadow-xl
                lg:absolute lg:right-0
                w-44
              "
            >
              <router-link
                to="/category"
                class="
                  block
                  px-4
                  py-2
                  text-sm text-zinc-100
                  hover:text-white hover:bg-indigo-400
                "
              >
                Categories
              </router-link>

              <router-link
                to="/posts"
                class="
                  block
                  px-4
                  py-2
                  text-sm text-zinc-100
                  hover:text-white hover:bg-indigo-400
                "
              >
                Posts
              </router-link>
            </div>
          </div>
        </li>
        <li>
          <router-link to="/login" class="inline-block px-4 py-2 bg-gray-700 dark:bg-blue-500 rounded-lg text-zinc-100 hover:text-white">
            Login
          </router-link>
        </li>
        <button v-if="isDark"
          @click="toggleDark()"
          class="inline-block text-2xl text-zinc-100 hover:text-yellow-500 transition"
        >
          <i class="fa-solid fa-sun"></i>
        </button>
        <button v-if="!isDark"
          @click="toggleDark()"
          class="inline-block text-2xl text-gray-800 hover:text-zinc-100 transition"
        >
         <i class="fa-solid fa-moon"></i>
        </button>
      </ul>
    </nav>
  </div>
</template>

<script>

import { ref } from "vue";
import { useDark, useToggle } from "@vueuse/core";


export default {
  setup() {
    let showMenu = ref(false);
    let show = ref(false);
    const toggleNav = () => (showMenu.value = !showMenu.value);

    const isDark = useDark();
    const toggleDark = useToggle(isDark);

    return { showMenu, show, toggleNav, isDark, toggleDark };
  },
  name: "NavBar",
};
</script>