<template>
  <div class="home">
    <h1>City Comparison Tool</h1>
    <city-autocomplete></city-autocomplete>
  </div>
</template>

<script>
import cityAutocomplete from './cityAutocomplete';

export default {
  name: 'home',
  components: {
    cityAutocomplete,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
