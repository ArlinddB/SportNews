<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        id: '',
        name: '',
        email: '',
      }
      
    };
  },
  methods: {
    async handleUserUpdate(){
        this.$store.dispatch('user/editUser', {...this.user})
    }
  },
  async mounted() {
    const res = await axios.get(`${process.env.VUE_APP_API}users/${this.$route.params.id}`)

    const { data } = res;

    this.user.id = data.user.uid;

    this.user.name = data.user.displayName;
    this.user.email = data.user.email
  },
};
</script>

<template>
  <div class="min-h-[79vh] flex justify-center items-center">
    <div class="p-0 sm:p-12">
      <div
        class="mx-auto mt-8 w-[28rem] px-6 py-12 bg-gray-50 dark:bg-[#17191f] border-0 shadow-lg sm:rounded-3xl"
      >
        <h1 class="text-2xl font-bold mb-8 text-zinc-700 dark:text-zinc-300">
          Details
        </h1>
        <form @submit.prevent="handleUserUpdate">
          <div class="relative z-0 w-full mb-5">
            <input
              type="text"
              placeholder=" "
              id="name"
              v-model="user.name"
              class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 border-zinc-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-400 text-zinc-700 dark:text-zinc-300"
            />
            <label
              class="absolute duration-300 top-3 -z-1 origin-0 text-zinc-700 dark:text-zinc-300"
              >Name</label
            >
          </div>

          <div class="relative z-0 w-full mb-5">
            <input
              type="email"
              placeholder=" "
              id="email"
              v-model="user.email"
              class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 border-zinc-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-400 text-zinc-700 dark:text-zinc-300"
            />
            <label
              class="absolute duration-300 top-3 -z-1 origin-0 text-zinc-700 dark:text-zinc-300"
              >Email</label
            >
          </div>

          <div class="flex justify-between">
            <router-link
              :to="{ name: 'users-dashboard' }"
              class="hvr-icon-back px-4 py-2.5 mt-3 text-md text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-gray-500 hover:bg-gray-700 hover:shadow-lg focus:outline-none"
            >
              <i class="fa-solid fa-angle-left hvr-icon mr-2"></i>
              Back to list
            </router-link>

            <button
            type="submit"
            id="submitBtn"
            class="
              px-6
              py-3
              mt-3
              text-md text-white
              transition-all
              duration-150
              ease-linear
              rounded-lg
              shadow
              outline-none
              bg-blue-600
              hover:bg-blue-700 hover:shadow-lg
              focus:outline-none
            "
          >
            Update
          </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
