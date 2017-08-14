<template>
  <div class="city-autocomplete">
    <input type="text"
           placeholder="Search for city here..."
           v-model="searchTerm"
           @input="updateCitiesList"
           autocomplete="off">
    <div class="autocomplete-results">
    </div>
  </div>
</template>

<script>
import teleportAPI from '../services/teleportAPI';

export default {
  name: 'cityAutocomplete',
  data () {
    return {
      cities: [],
      searchTerm: '',
    };
  },
  methods: {
    updateCitiesList () {
      if (this.searchTerm.length) {
        teleportAPI.findCities(this.searchTerm).then((result) => {
          this.cities = result;
        });
      } else {
        this.cities = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.city-autocomplete {
  input[type=text] {
    width: 400px;
    height: 30px;
    outline: none;
    border: none;
    border-bottom: 2px solid #AAA;
    font-size: 24px;
    padding: -5px;
  }
}
</style>
