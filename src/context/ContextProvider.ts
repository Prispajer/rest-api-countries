import { reactive } from "vue";
import type { Country, ContextType } from "../types/types";

export const Context = reactive<ContextType>({
  countries: [] as Country[],
  setCountries: (countries: Country[]) => {
    Context.countries = countries;
  },
  country: [] as Country[],
  setCountry: (country: Country[]) => {
    Context.country = country;
  },
  inputValue: "",
  setInputValue: (value: string) => {
    Context.inputValue = value;
  },
  switchTheme: true,
  setSwitchTheme: () => {
    Context.switchTheme = !Context.switchTheme;
  },
  switchDropDown: true,
  setSwitchDropDown: () => {
    Context.switchDropDown = !Context.switchDropDown;
  },
  selectedRegion: "",
  setSelectedRegion: (region: string) => {
    Context.selectedRegion = region;
  },
  filteredCountries: [] as Country[],
  setFilteredCountries: (countries: Country[]) => {
    Context.filteredCountries = countries;
  },
  isLoading: false,
  setIsLoading: (value: boolean) => {
    Context.isLoading = value;
  },
});
