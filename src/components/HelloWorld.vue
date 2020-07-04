<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>count:{{$store.state.count}}</p>
    <p>doubleCount:{{$store.getters.doubleCount}}</p>
    <button @click="$store.commit('add')">马上+1</button>
    <button @click="$store.dispatch('add')">异步+1</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
