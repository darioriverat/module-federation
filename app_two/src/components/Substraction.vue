<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const a = ref(5)
const b = ref(2)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <div class="card">
      <input type="number" id="a" v-model="a" />
      <span class="operator">-</span>
      <input type="number" id="b" v-model="b" />
      <span class="operator">=</span>
      <input id="result" :value="a - b" readonly=""/>
    </div>
  </div>

</template>

<style scoped>
  .card {
    padding: 0.5em;
    display: flex;
    align-items: center;
  }

  .card input {
    padding: 5px;
    width: 60px;
  }

  .operator {
    color: teal;
    display: inline-block;
    padding: 5px;
    font-size: 20px;
  }
</style>
