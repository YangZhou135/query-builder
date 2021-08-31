<template>
  <div id="app">
    <query-builder ref="BringQueryBuilder" :rules="rules" :allow-del-first="true" />
    <el-row>
      <el-button size="mini" plain @click="clickHandler_1()">开始搜索</el-button>
      <el-button size="mini" type="danger" @click="clickHandler_2()">重置</el-button>
    </el-row>
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
  },
  methods: {
    clickHandler_1() {
      console.log('校验必填-输出总的规则')
      const param = this.$refs.BringQueryBuilder.getRuleParams()
      console.log(param, '规则数据')
    },
    clickHandler_2() {
      this.$refs.BringQueryBuilder.resetRuleParams()
      console.log('重置组件校验规则')
    },
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
