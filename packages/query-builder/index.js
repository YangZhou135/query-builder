import QueryBuilder from './query-builder.vue'

/* istanbul ignore next */
QueryBuilder.install = function(Vue) {
  Vue.component(QueryBuilder.name, QueryBuilder);
};

export default QueryBuilder;
