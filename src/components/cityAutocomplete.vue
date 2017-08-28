<template>

  <div class="city-autocomplete">
    <autocomplete
      placeholder="Search for city here..."
      :onSelect="selectCity"
      :query="searchForCity"
      :itemLabel="labelForCity">
    </autocomplete>
  </div>
</template>

<script>
import teleportAPI from '../services/teleportAPI';
import autocomplete from './autocomplete';

export default {
  name: 'cityAutocomplete',
  components: {
    autocomplete,
  },
  data () {
    return {
      cities: [],
      searchTerm: '',
      showList: false,
    };
  },
  methods: {
    selectCity (city) {
      // TODO: Add logic to actually select the city. Should interact with vuex
      console.log(city);
    },
    async searchForCity (searchTerm) {
      return teleportAPI.findCities(searchTerm);
    },
    labelForCity (city) {
      return {
        main: city.shortName || city.longName,
        sub: city.longName,
      };
    },
  },
};
</script>
