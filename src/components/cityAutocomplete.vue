<template>
  <div class="city-autocomplete">
    <input type="text"
           placeholder="Search for city here..."
           v-model="searchTerm"
           @input="onInput"
           @focus="onFocus"
           @blur="onBlur"
           autocomplete="off">
    <div class="autocomplete-results" v-if="showList && cities.length">
      <ul>
        <li v-for="city in cities" @click="selectCity(city)">
         {{city.shortName || city.longName}} <span v-if="city.shortName">- {{city.longName}}</span>
        </li>
      </ul>
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
      showList: false,
    };
  },
  methods: {
    selectCity (city) {
      console.log(city);
      this.searchTerm = city.shortName || city.longName;
      this.showList = false;
    },
    onInput () {
      if (this.searchTerm.length) {
        teleportAPI.findCities(this.searchTerm).then((result) => {
          this.cities = result;
          this.showList = true;
        });
      } else {
        this.cities = [];
        this.showList = false;
      }
    },
    onFocus () {
      if (this.cities.length) {
        this.showList = true;
      }
    },
    onBlur () {
      // setTimeout(() => {
      //   this.showList = false;
      // }, 10);
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
