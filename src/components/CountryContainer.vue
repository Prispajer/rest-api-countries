<template>
  <section
    :class="Context.switchTheme ? 'specific-country' : 'specific-country__dark'"
  >
    <router-link to="/">
      <button
        :class="
          Context.switchTheme
            ? 'specific-country__back'
            : 'specific-country__back__dark'
        "
      >
        <font-awesome-icon class="navbar__moon-icon" :icon="arrowLeft" />
        <span>Back</span>
      </button>
    </router-link>
    <p v-if="Context.isLoading">Loading...</p>
    <section
      v-else
      v-for="(country, index) in Context.country"
      :key="index"
      :class="
        Context.switchTheme
          ? 'specific-country__container'
          : 'specific-country__container__dark'
      "
    >
      <div class="specific-country__image-container">
        <img :src="country?.flags.svg" :alt="'Flag: ' + country?.name.common" />
      </div>
      <div
        :class="
          Context.switchTheme
            ? 'specific-country__informations-container'
            : 'specific-country__informations-container__dark'
        "
      >
        <h2>{{ country?.name.common }}</h2>
        <div
          :class="
            Context.switchTheme
              ? 'specific-country__informations'
              : 'specific-country__informations__dark'
          "
        >
          <div
            :class="
              Context.switchTheme
                ? 'specific-country__information'
                : 'specific-country__information__dark'
            "
          >
            <p><span>Official Name: </span>{{ country?.name.official }}</p>
            <p>
              <span>Population: </span
              >{{
                country?.population
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
              }}
            </p>
            <p><span>Region: </span>{{ country?.region }}</p>
            <p><span>Sub Regions: </span>{{ country?.subregion }}</p>
            <p v-for="(capital, index) in country?.capital" :key="index">
              <span>Capital: </span>{{ capital }}
            </p>
          </div>
          <div
            :class="
              Context.switchTheme
                ? 'specific-country__information'
                : 'specific-country__information__dark'
            "
          >
            <p><span>Top Level Domain: </span>{{ country?.tld.join(", ") }}</p>
            <p><span>Currencies: </span>{{ mappedCurrencies.join(", ") }}</p>
            <p><span>Languages: </span>{{ mappedLanguages.join(", ") }}</p>
          </div>
        </div>
        <div>
          <div
            v-if="borderButtons.length > 0"
            :class="
              Context.switchTheme
                ? 'specific-country__border-countries'
                : 'specific-country__border-countries__dark'
            "
          >
            <p>Border Countries:</p>
            <router-link
              v-for="(border, index) in borderButtons"
              :key="index"
              :to="'/country/' + border"
            >
              <button>{{ border }}</button>
            </router-link>
          </div>
          <div v-else>
            <span>This country has no neighbours!</span>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { inject, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { fetchData } from "../utils/data";
import { faArrowLeft as arrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { ContextType } from "../types/types";

const Context = inject<ContextType>("Context");

if (!Context) {
  throw new Error("Context must be provided");
}

const route = useRoute();
const countryName = computed(() => route.params.countryName);

const fetchCountryData = async () => {
  Context.setIsLoading(true);
  try {
    const country = await fetchData(
      `https://restcountries.com/v3.1/name/${countryName.value}?fullText=true`
    );
    Context.setCountry(country);
  } catch (error) {
    console.error("There was a problem while fetching data!", error);
  } finally {
    Context.setIsLoading(false);
  }
};

onMounted(fetchCountryData);

watch(countryName, fetchCountryData);

const findByProperty = computed(() => {
  return Context.country?.find(
    (searchName) => searchName?.name.common === countryName.value
  );
});

const mappedCurrencies = computed(() => {
  const currenciesArray = findByProperty.value
    ? Object.keys(findByProperty.value.currencies || {})
    : [];
  return currenciesArray.map(
    (key) => findByProperty.value?.currencies![key]?.name || "Unknown Currency"
  );
});

const mappedLanguages = computed(() => {
  const languagesArray = findByProperty.value
    ? Object.keys(findByProperty.value.languages || {})
    : [];
  return languagesArray.map(
    (key) => findByProperty.value?.languages![key] || "Unknown Language"
  );
});

const borderButtons = computed(() => {
  const borders = findByProperty.value?.borders || [];
  return borders.map((border) => {
    const findNeighbour = Context.countries.find(
      (country) => country?.cca3 === border
    );
    return findNeighbour ? findNeighbour.name.common : border;
  });
});
</script>
