<script setup>
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <div>
    <AppHeader v-if="this.$route.name !== 'Login' && this.$route.name !== 'Register'" />
    <!--- render router view -->
    <router-view></router-view>
    <!-- end render router view -->
  </div>
</template>
