<template>
  <div>
      <NavBar v-if="$route.name!='404'" v-show="$route.name!='dashboard'" />
      <router-view  />
      <FooterComponent v-if="$route.name!='404'" />
  </div>
</template>

<script>
import NavBar from './components/Navbar.vue'
import FooterComponent from './components/Footer.vue'
import {getAuth, onAuthStateChanged} from 'firebase/auth';

export default {
  name: 'App',
  components: {
    NavBar,
    FooterComponent
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) =>{
      this.$store.commit('user/setUser', user);
    })
  }
}
</script>