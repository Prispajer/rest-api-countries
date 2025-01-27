export type Country = {
  name: {
    common: string;
    official: string;
  };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  flags: {
    svg: string;
  };
  tld: string[];
  currencies?: { [key: string]: { name: string; symbol: string } };
  languages?: { [key: string]: string };
  borders?: string[];
  cca3?: string;
} | null;

export interface ContextType {
  countries: Country[];
  setCountries: (countries: Country[]) => void;
  country: Country[];
  setCountry: (countries: Country[]) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  switchTheme: boolean;
  setSwitchTheme: () => void;
  switchDropDown: boolean;
  setSwitchDropDown: (value: boolean) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  filteredCountries: Country[];
  setFilteredCountries: (countries: Country[]) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}
