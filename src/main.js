import Vue from 'vue'
import App from './App.vue'
import QueryBuilder from '../packages/query-builder/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

const components = [
  QueryBuilder
]

window.Vue = Vue;

const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });

}

// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

new Vue({
  el: '#app',
  render: h => h(App)
})
