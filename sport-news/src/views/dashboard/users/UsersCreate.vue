<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      submitted: false,
    };
  },
  computed: {
    nameValid() {
      return !!this.name.trim() && this.name.length >= 3;
    },
    emailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    },
    passwordValid() {
      const hasLetters = /[a-zA-Z]/.test(this.password);
      const hasNumbers = /[0-9]/.test(this.password);
      return this.password.length >= 6 && hasLetters && hasNumbers;
    },
    formValid() {
      return this.nameValid && this.emailValid && this.passwordValid;
    },
  },
  methods: {
    async handleRegisterUser() {
      this.submitted = true;
      if (this.formValid) {
        this.$store.dispatch("user/registerUser", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.$router.push("/dashboard/users");
      } else {
        if (!this.nameValid) {
          this.$refs.nameInput.focus();
        } else if (!this.emailValid) {
          this.$refs.emailInput.focus();
        } else {
          this.$refs.passwordInput.focus();
        }
      }
    },
  },
};
</script>

<template>
  <div class="p-0 sm:p-12 min-h-[79vh]">
    <div
      class="mx-auto max-w-md mt-8 px-6 py-12 bg-gray-50 dark:bg-[#17191f] border-0 shadow-lg sm:rounded-3xl"
    >
      <h1 class="text-2xl font-bold mb-8 text-zinc-700 dark:text-zinc-300">
        Add a new User
      </h1>
      <form @submit.prevent="handleRegisterUser">
        <div class="relative z-0 w-full mb-3">
          <input
            type="text"
            placeholder=" "
            id="name"
            v-model="name"
            required
            class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 border-zinc-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-400 text-zinc-700 dark:text-zinc-300"
          />
          <label
            class="absolute duration-300 top-3 -z-1 origin-0 text-zinc-700 dark:text-zinc-300"
            >Name</label
          >
          <span v-if="submitted && !nameValid" class="text-red-500">
            Name is required and should be at least 3 characters
          </span>
        </div>

        <div class="relative z-0 w-full mb-2 mt-4">
          <input
            type="email"
            placeholder=" "
            id="email"
            v-model="email"
            required
            class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 border-zinc-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-400 text-zinc-700 dark:text-zinc-300"
          />
          <label
            class="absolute duration-300 top-3 -z-1 origin-0 text-zinc-700 dark:text-zinc-300"
            >Email</label
          >
        </div>
        <span v-if="submitted && !emailValid" class="text-red-500">
          Enter a valid email address
        </span>
        <div class="relative z-0 w-full mb-2 mt-4">
          <input
            type="password"
            placeholder=" "
            id="password"
            v-model="password"
            required
            class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 border-zinc-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-400 text-zinc-700 dark:text-zinc-300"
          />
          <label
            class="absolute duration-300 top-3 -z-1 origin-0 text-zinc-700 dark:text-zinc-300"
            >Password</label
          >
        </div>
        <span v-if="submitted && !passwordValid" class="text-red-500">
          Password should be alphanumeric
        </span>

        <div class="flex justify-between">
          <router-link
            class="hvr-icon-back px-4 py-2.5 mt-3 text-md text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-gray-500 hover:bg-gray-700 hover:shadow-lg focus:outline-none"
            :to="{ name: 'users-dashboard' }"
          >
            <i class="fa-solid fa-angle-left hvr-icon mr-2"></i>
            Back to list
          </router-link>

          <button
            type="submit"
            id="submitBtn"
            class="px-6 py-3 mt-3 text-md text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-blue-600 hover:bg-blue-700 hover:shadow-lg focus:outline-none"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
