<documentation>
Name: autocomplete

Props:
  - onSelect: function which will be called when an item is selected, passed the item
  - itemLabel: function which will be called with a given item for a label. 
               Expects a returned object of form { main, sub } with the sub label being optional
  - query: async function, passed a search term should return a list of items
  - placeholder: string, optional. Placeholder text for the search
  - listClass: string, optional. Use to overwrite styling of the list
</documentation>

<template>
  <div class="autocomplete">
    <input type="text"
           :placeholder="placeholder"
           v-model="searchTerm"
           @input="onInput"
           @focus="onFocus"
           @blur="onBlur"
           autocomplete="off">
    <div :class="[listClass ? listClass : 'autocomplete-results']" v-if="showList && list.length">
      <ul>
        <li v-for="item in list" @click="selectItem(item)">
         {{ itemLabel(item).main }} <span ng-if="itemLabel(item).sub">- {{itemLabel(item).sub}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'autocomplete',
  props: {
    onSelect: {
      type: Function,
      required: true,
    },
    itemLabel: {
      type: Function,
      required: true,
    },
    query: {
      type: Function,
      required: true,
    },
    placeholder: {
      type: String,
    },
    listClass: {
      type: String,
    },
  },
  data () {
    return {
      list: [],
      searchTerm: '',
      showList: false,
    };
  },
  methods: {
    selectItem (item) {
      this.onSelect(item);
      this.searchTerm = this.itemLabel(item).main;
      this.showList = false;
      this.list = [];
    },
    async onInput () {
      if (this.searchTerm.length) {
        this.list = await this.query(this.searchTerm);
        this.showList = true;
      } else {
        this.showList = false;
      }
    },
    onFocus () {
      if (this.list.length) {
        this.showList = true;
      }
    },
    onBlur () {
      setTimeout(() => {
        this.showList = false;
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.autocomplete {
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
