<template>
  <section :class="Context.switchTheme ? 'countries' : 'countries__dark'">
    <p v-if="Context.isLoading">Loading...</p>
    <section
      v-else
      v-for="country in dynamicCountries"
      :key="country?.name.official"
      :class="
        Context.switchTheme ? 'country__container' : 'country__container__dark'
      "
    >
      <router-link :to="`/country/${country?.name.common}`">
        <div class="country__flag">
          <img
            :src="country?.flags.svg"
            :alt="`Flaga: ${country?.name.common}`"
          />
        </div>
        <div
          :class="
            Context.switchTheme
              ? 'country__informations'
              : 'country__informations__dark'
          "
        >
          <h3
            :class="
              Context.switchTheme ? 'country__name' : 'country__name__dark'
            "
          >
            {{ country?.name.common }}
          </h3>
          <p
            :class="
              Context.switchTheme
                ? 'country__information'
                : 'country__information__dark'
            "
          >
            <span>Population: </span
            >{{
              country?.population
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
            }}
          </p>
          <p
            :class="
              Context.switchTheme
                ? 'country__information'
                : 'country__information__dark'
            "
          >
            <span>Region: </span>{{ country?.region }}
          </p>
          <p
            v-for="(capital, index) in country?.capital"
            :class="
              Context.switchTheme
                ? 'country__information'
                : 'country__information__dark'
            "
          >
            <span :key="index">Capital: </span>{{ capital }}
          </p>
        </div>
      </router-link>
    </section>
  </section>
</template>

<script setup lang="ts">
import { inject, onMounted, computed } from "vue";
import { fetchData } from "../utils/data";
import { filterByName } from "../utils/data";
import type { ContextType } from "../types/types";

const Context = inject<ContextType>("Context");

if (!Context) {
  throw new Error("Context must be provided");
}

onMounted(async () => {
  Context.setIsLoading(true);
  try {
    const countries = await fetchData("https://restcountries.com/v3.1/all");
    Context.setCountries(countries);
  } catch (error) {
    console.error("There was a problem while fetching data!", error);
  } finally {
    Context.setIsLoading(false);
  }
});

const dynamicCountries = computed(() => {
  return filterByName(
    Context.filteredCountries.length > 0
      ? Context.filteredCountries
      : Context.countries,
    Context.inputValue
  );
});
</script>
