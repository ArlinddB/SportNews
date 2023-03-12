<template>
  <div>
    <nav
      class="px-6 py-5 bg-blue-400 dark:bg-gray-900 shadow-lg md:flex md:justify-between md:items-center"
    >
      <div class="flex items-center justify-between">
        <router-link
          to="/"
          class="text-xl font-bold text-gray-100 md:text-2xl hover:text-white"
          >Logo
        </router-link>
        <!-- <div v-if="this.$store.state.user.email">{{this.$store.state.user.email}}</div> -->
        <!-- Mobile menu button -->
        <div @click="toggleNav" class="flex md:hidden">
          <button
            type="button"
            class="text-gray-100 hover:text-gray-400 focus:outline-none focus:text-gray-400"
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
        class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
      >
        <li class="text-zinc-100 hover:text-white">
          <router-link to="/">Home</router-link>
        </li>
        <Dropdown title="Managment" :options="managment" />
        <Dropdown title="News" :options="categories" />
        <Dropdown title="Standings" :options="standings" />
        <li>
          <router-link
            v-if="!this.$store.state.user.user"
            to="/login"
            class="inline-block px-4 py-2 bg-gray-700 dark:bg-blue-500 rounded-lg text-zinc-100 hover:text-white"
          >
            Login
          </router-link>
          <!-- <button v-if="this.$store.state.user.user"
            @click="handleLogOut"
            class="inline-block px-4 py-2 bg-gray-700 dark:bg-blue-500 rounded-lg text-zinc-100 hover:text-white"
          >
            {{ this.$store.state.user.user.displayName }}
          </button> -->

          <div class="relative" v-click-away="onClickAway" v-if="this.$store.state.user.user">
            <button
              @click="toggleDropdown"
              class="font-semibold text-zinc-100 hover:text-white rounded-md focus:outline-none inline-flex items-center"
            >
              <span>{{ this.$store.state.user.user.displayName }}</span>
              <svg
                class="fill-current h-4 w-4"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>
            <div
              v-if="open"
              class="absolute z-50 py-2 bg-indigo-900 lg:absolute lg:right-0 w-[120px] rounded-md shadow-lg mt-2"
            >
              <ul>
                <li
                  @click="toggleDropdown"
                  class="cursor-pointer px-4 py-2 text-sm text-zinc-100 hover:text-white hover:bg-indigo-400"
                >
                  Profile
                </li>
                <li
                  @click="
                    toggleDropdown();
                    handleLogOut();
                  "
                  class="cursor-pointer px-4 py-2 text-sm text-zinc-100 hover:text-white hover:bg-indigo-400"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </li>
        <button
          v-if="isDark"
          @click="toggleDark()"
          class="inline-block text-2xl text-gray-500 hover:text-zinc-100 transition"
        >
          <i class="fa-solid fa-moon"></i>
        </button>
        <button
          v-if="!isDark"
          @click="toggleDark()"
          class="inline-block text-2xl text-zinc-100 hover:text-yellow-500 transition"
        >
          <i class="fa-solid fa-sun"></i>
        </button>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import Dropdown from "./reusable/Dropdown.vue";
import { getAuth, signOut } from "firebase/auth";
import { directive } from "vue3-click-away";
import { mapGetters } from 'vuex';
import { is } from "@babel/types";


export default {
  name: "NavBar",
  components: {
    Dropdown,
  },
  directives: {
    ClickAway: directive,
  },
  data() {
    return {
      categories: [
        {
          title: "Football",
        },
        {
          title: "Basketball",
        },
      ],
      managment: [
        {
          title: "Categories",
        },
        {
          title: "Posts",
        },
      ],
      standings: [
        {
          title: "Football",
        },
      ],
      open: false,
    };
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    }),
  },
  methods: {
    async handleLogOut() {
      const auth = getAuth();
      await signOut(auth);
    },
    onClickAway(event) {
      this.open = false;
    },
    toggleDropdown() {
      this.open = !this.open;
    },
  },
  setup() {
    let showMenu = ref(false);
    let show = ref(false);
    let show1 = ref(false);
    const toggleNav = () => (showMenu.value = !showMenu.value);

    const isDark = useDark();
    const toggleDark = useToggle(isDark);

    return { showMenu, show, show1, toggleNav, isDark, toggleDark };
  },
};
</script>