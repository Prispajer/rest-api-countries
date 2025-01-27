<template>
  <nav :class="Context.switchTheme ? 'navbar' : 'navbar__dark'">
    <router-link to="/">
      <h1 class="navbar__header">Where in the world?</h1>
    </router-link>
    <div @click="Context.setSwitchTheme" class="navbar__theme">
      <font-awesome-icon
        class="navbar__moon-icon"
        :icon="Context.switchTheme ? faMoonRegular : faMoonSolid"
      />
      <span class="navbar__switch-theme">
        {{ Context.switchTheme ? "Dark Mode" : "Light Mode" }}
      </span>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { faMoon as faMoonSolid } from "@fortawesome/free-solid-svg-icons";
import { faMoon as faMoonRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { ContextType } from "../types/types";

const Context = inject<ContextType>("Context");

if (!Context) {
  throw new Error("Context must be provided");
}
</script>
