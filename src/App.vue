<template>
  <AppHeader />
  <router-view />
  <AppFooter />
</template>


<script setup>
import AppHeader from "./components/templates/AppHeader";
import AppFooter from "./components/templates/AppFooter";
</script>


<style lang="scss" >
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Homemade+Apple&display=swap");

@import "~normalize.css";
@import "@/style/main.scss";
@import "@/style/_variables.scss";
</style>
