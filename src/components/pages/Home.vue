<template>
  <div class="home">
    <h1>City Comparison Tool</h1>
    <city-autocomplete></city-autocomplete>
    <div v-if="city.scores">
      <teleport-score
        v-for="score in city.scores.categories"
        :key="score.$index"
        :score="score.score_out_of_10"
        :label="score.name"
        :color="score.color"
      ></teleport-score>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import cityAutocomplete from '../cityAutocomplete';
import teleportScore from '../teleportScore';

export default {
  name: 'home',
  components: {
    cityAutocomplete,
    teleportScore,
  },
  computed: mapState([
    'city',
  ]),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
