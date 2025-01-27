<template>
  <Navbar />
  <FilterOptions />
  <CountriesContainer />
</template>

<script setup lang="ts">
import "../styles/main.scss";
import Navbar from "../components/Navbar.vue";
import FilterOptions from "../components/FilterOptions.vue";
import CountriesContainer from "../components/CountriesContainer.vue";
</script>
