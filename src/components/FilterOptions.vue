<template>
  <section :class="Context.switchTheme ? 'options' : 'options__dark'">
    <div
      :class="
        Context.switchTheme
          ? 'options__search-bar'
          : 'options__search-bar__dark'
      "
    >
      <font-awesome-icon class="options__search-icon" :icon="faSearch" />
      <input
        placeholder="Search for a country..."
        @input="(event) => debouncedSetInputValue((event.target as HTMLInputElement).value)"
        type="text"
        :class="Context.switchTheme ? 'options__input' : 'options__input__dark'"
      />
    </div>
    <div
      @click="() => Context.setSwitchDropDown(!Context.switchDropDown)"
      class="options__dropdown"
    >
      <div
        :class="
          Context.switchTheme
            ? 'options__dropdown-toggle'
            : 'options__dropdown-toggle__dark'
        "
      >
        {{
          Context.selectedRegion ? Context.selectedRegion : "Filter by Region"
        }}
        <font-awesome-icon
          :icon="Context.switchDropDown ? faArrowDown : faArrowUp"
        />
      </div>
      <div
        :class="[
          Context.switchTheme && !Context.switchDropDown
            ? 'options__dropdown-menu'
            : Context.switchDropDown
            ? 'options__dropdown-menu__closed'
            : 'options__dropdown-menu__dark',
        ]"
      >
        <button
          v-for="region in regions"
          :key="region"
          @click="handleSelectRegion(region)"
          :class="[
            Context.switchTheme
              ? 'options__select-menu'
              : 'options__select-menu__dark',
          ]"
        >
          {{ region }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faSearch,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { debounce } from "../utils/utils";
import { filterByRegion } from "../utils/data";
import type { ContextType } from "../types/types";

const Context = inject<ContextType>("Context");

if (!Context) {
  throw new Error("Context must be provided");
}

const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

const debouncedSetInputValue = debounce((value: string) => {
  Context.setInputValue(value);
}, 1000);

const handleSelectRegion = (region: string) => {
  Context.setSelectedRegion(region);
  if (region === "All") {
    Context.setFilteredCountries(Context.countries);
  } else {
    Context.setFilteredCountries(filterByRegion(Context.countries, region));
  }
};
</script>
