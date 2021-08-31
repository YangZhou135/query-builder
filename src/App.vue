<template>
  <div id="app">
    <query-builder ref="BringQueryBuilder" :rules="rules" :allow-del-first="true" />
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      lightSwitch: true,
      rules: []
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
