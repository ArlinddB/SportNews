<template>
  <div>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,600,0,0"
    />
    <div class="min-h-[79vh]">
      <div class="py-12">
        <div class="signup bg-gray-50 dark:bg-gray-900 shadow-md">
          <form @:submit.prevent="handleRegisterUser" class="form1">
            <div
              class="textbox border-b-2 border-zinc-400 dark:border-zinc-400"
            >
              <input
                v-model="username"
                type="text"
                placeholder="Username"
                class="
                  border-0
                  outline-none
                  focus:ring-0
                  input-field
                  text-zinc-700
                  dark:text-zinc-300
                "
                required
              />
              <span
                class="
                  material-symbols-outlined
                  icon
                  text-zinc-700
                  dark:text-zinc-500
                "
              >
                account_circle
              </span>
            </div>

              <div
              class="textbox border-b-2 border-zinc-400 dark:border-zinc-400"
            >
              <input
                v-model="email"
                type="text"
                placeholder="Email"
                class="
                  border-0
                  outline-none
                  focus:ring-0
                  input-field
                  text-zinc-700
                  dark:text-zinc-300
                "
                required
              />
              <span
                class="
                  material-symbols-outlined
                  icon
                  text-zinc-700
                  dark:text-zinc-500
                "
              >
                mail
              </span>

            </div>

                        <div
              class="textbox border-b-2 border-zinc-400 dark:border-zinc-400"
            >
              <input
                v-if="showPassword"
                type="text"
                placeholder="Password"
                class="
                  border-0
                  outline-none
                  focus:ring-0
                  input-field
                  text-zinc-700
                  dark:text-zinc-300
                "
                v-model="Password"
              />
              <input
                v-else
                type="password"
                placeholder="Password"
                class="
                  border-0
                  outline-none
                  focus:ring-0
                  input-field
                  text-zinc-700
                  dark:text-zinc-300
                "
                v-model="password"
              />
              <span
                class="
                  material-symbols-outlined
                  icon
                  text-zinc-700
                  dark:text-zinc-500
                "
              >
                key
              </span>
              <span>
                <i
                  @click="toggleShow"
                  class="
                    fas
                    text-zinc-700
                    dark:text-zinc-400
                    cursor-pointer
                    absolute
                    right-0
                    bottom-4
                  "
                  :class="{
                    'fa-eye-slash': showPassword,
                    'fa-eye': !showPassword,
                  }"
                ></i>
              </span>
            </div>


            <!-- <div
              class="textbox border-b-2 border-zinc-400 dark:border-zinc-400"
            >
              <input
                v-if="showPassword"
                type="text"
                placeholder="Password"
                class="
                  border-0
                  outline-none
                  focus:ring-0
                  input-field
                  text-zinc-700
                  dark:text-zinc-300
                "
                v-model="confirmPassword"
              />
              <input
                v-else
                type="password"
                placeholder="Confirm Password"
                class="
                  border-0
                  outline-none
                  focus:ring-0
                  input-field
                  text-zinc-700
                  dark:text-zinc-300
                "
                v-model="confirmPassword"
              />
              <span
                class="
                  material-symbols-outlined
                  icon
                  text-zinc-700
                  dark:text-zinc-500
                "
              >
                lock
              </span>
              <span>
                <i
                  @click="toggleShow"
                  class="
                    fas
                    text-zinc-700
                    dark:text-zinc-400
                    cursor-pointer
                    absolute
                    right-0
                    bottom-4
                  "
                  :class="{
                    'fa-eye-slash': showPassword,
                    'fa-eye': !showPassword,
                  }"
                ></i>
              </span>
            </div> -->

            <button class="loginbtn"> 
              Register
              <span class="material-symbols-outlined"> arrow_forward </span>
            </button>
            <br />
            <p>Already have an account?  
                <router-link to="/login">
                Login
                </router-link></p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.signup {
  margin: auto;
  max-width: 460px;
  padding: 40px 55px;
  border-radius: 50px 5px;
}

.form {
  display: grid;
  gap: 16px;
}

.textbox {
  position: relative;
  margin-bottom: 16px;
}

.textbox .icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  left: 0;
  font-size: 22px;
  pointer-events: none;
}

.textbox input {
  padding: 0 24px 0 36px;
  border: 0;
  height: 72px;
  width: 100%;
  height: 60px;
  background: transparent;
  font-family: inherit;
  font-size: 16px;
}

:is(input-field:focus, input-field:valid) ~ label {
  translate: -80px -40px;
  scale: 0.975;
}

input:focus::placeholder {
  color: #2481ee;
}

input:focus ~ label {
  color: #2481ee;
}

:is(input-field:focus, input-field:valid) ~ span {
  color: rgb(255 255 255 / 96%);
}

.textbox label {
  position: absolute;
  top: 63%;
  left: 36px;
  transform: translate(0, -50%);
  color: rgb(255 255 255 / 40%);
  pointer-events: none;
  transition: 0.4s;
  font-size: 20px;
}

.form1 button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0 24px;
  border-radius: 6px;
  background: #216ce7;
  color: #f9f9f9;
  border: 0;
  font-family: inherit;
  font-weight: 600;
  width: 100%;
  height: 60px;
  outline: none;
}

.signup p {
  margin: 0 0 22px;
  color: #778395;
}

.signup p > a {
  color: #216ce7;
  text-decoration: none;
}
</style>
<script>

export default {
  name: "register-view",
  data() {
    return {
      username: '',
      email: '',
      password:'',
      showPassword: false
    };
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    async handleRegisterUser(){
      this.$store.dispatch('user/registerUser', {
        name: this.username,
        email: this.email,
        password: this.password
      })
        this.$router.push('/login');
    }
  },
};
</script>