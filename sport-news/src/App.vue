<template>
  <div>
      <NavBar />
      <router-view />
      <FooterComponent />
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