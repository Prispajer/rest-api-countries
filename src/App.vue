<template>
  <div :class="Context.switchTheme ? 'app' : 'app-dark'">
    <router-view />
  </div>
</template>

<script setup="ts">
import { provide } from "vue";
import { Context } from "./context/ContextProvider";
import Navbar from "./components/Navbar.vue";
provide("Context", Context);
</script>
