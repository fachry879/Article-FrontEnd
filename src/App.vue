<script setup>
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <div>
    <AppHeader />
    <!--- render router view -->
    <router-view></router-view>
    <!-- end render router view -->
  </div>
</template>
