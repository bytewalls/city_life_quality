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
import { mapState } from 'vuex';

import { findCities } from '../services/teleportAPI';
import autocomplete from './common/autocomplete';

export default {
  name: 'cityAutocomplete',
  components: {
    autocomplete,
  },
  computed: mapState([
    'city',
  ]),
  methods: {
    selectCity (city) {
      this.$store.dispatch('loadCity', city.link);
    },
    async searchForCity (searchTerm) {
      return findCities(searchTerm);
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
