<template>

  <div class="city-autocomplete">
    <autocomplete
      placeholder="Search for city here..."
      :onSelect="selectCity"
      :query="searchForCity"
      :itemLabel="labelForCity"
      listClass="autocomplete-results">
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

<style lang="scss" scoped>
.city-autocomplete {
  width: 400px;
  margin: auto;


  input[type=text] {
    width: 100%;
    height: 30px;
    outline: none;
    border: none;
    border-bottom: 2px solid #AAA;
    font-size: 24px;
    padding: -5px;
  }

  .autocomplete-results {
    z-index: 50;
    width: 100%;
    max-height: 150px;
    overflow-y: scroll;
    border: 1px solid #AAA;
    
    ul {
      padding:0px;
      margin: 0px;

      li {
        padding-top: 4px;
        padding-left: 4px;
        list-style: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 30px;
        font-size: 18px;
        border-bottom: 1px solid #AAA;
        text-align: left;
        color: #333;

        span {
          font-size: 14px;
          color: #777;
        }

        &:hover {
          background: #DDD;
        }
      }
    }
    
  }
}
</style>
