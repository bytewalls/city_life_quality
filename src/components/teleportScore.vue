<template>
<div class="teleport-score">
  <div class="label">
    {{ label }}
  </div>
  <div class="score">
    <div
      v-bind:style="{
        background: color,
        width: score * 10 + '%'
      }">
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'teleportScore',
  props: {
    label: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
    },
  },
};
</script>

<style lang='scss' scoped>
.teleport-score {
  width: 600px;
  margin: auto;
  display: flex;
  align-items: center;
  padding-top: 10px;

  .label {
    margin-right: 5px;
    font-size: 16px;
    width: 200px;
    text-align: right;
  }

  .score {
    width: 300px;

    & > div {
      height: 25px;
    }
    
  }
}
</style>
