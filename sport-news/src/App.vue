<template>
  <div>
      <NavBar v-if="$route.name!='404'" />
      <router-view />
      <FooterComponent v-if="$route.name!='404'" />
  </div>
</template>

<script>
import NavBar from './components/Navbar.vue'
import FooterComponent from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    FooterComponent
  }
}
</script>