<template>
  <div class="query-builder form-inline" style="padding: 0 50px">

    <query-builder-group ref="queryBuilderGroup" :index="0" :query.sync="query" :rule-types="ruleTypes"
                         :rules="mergedRules" :max-depth="maxDepth" :depth="depth" :allow-del-first="allowDelFirst"
                         type="query-builder-group" @open-search-dialog="openSearchDialog"
    />

    <search-item-select ref="searchItemDialog" :cate-items="searchItemData.cateItems" :loading="loading"
                        :field-data="searchItemData.fieldData" :single-select="singleSelect" @close-search-dialog="fillInput"
    />

  </div>
</template>

<script>
  import QueryBuilderGroup from './QueryBuilderGroup.vue'
  import SearchItemSelect from './SearchItemSelect.vue'
  import deepClone from './utils.js'

  const defaultRuleType = {}
  const defaultQuery = {
    logical: 'AND',
    children: [
      // {
      //   type: 'query-builder-rule',
      //   query: {
      //     rule: null,
      //     fieldItemInfo: {},
      //     relative: null,
      //     value: null
      //   }
      // }
    ]
  }

  const groupBy = (list, fn) => {
    const groups = {}
    list.forEach(function(o) {
      const group = fn(o)
      groups[group] = groups[group] || []
      groups[group].push(o)
    })

    return groups
  }
  // 判断条件是否为空， 如果没有条件， 或者有一个条件且条件为空
  function checkQueryEmpty(query) {
    if (!query) {
      return true
    }
    const curType = query.type
    if (curType === 'query-builder-rule') {
      const curQuery = query.query
      if (!curQuery) {
        return true
      }

      if (!curQuery.value) {
        return true
      }
    }
    if (query.children && query.children.length == 0) {
      return true
    }

    if (query.children && query.children.length == 1) {
      const curChild = query.children[0]
      return checkQueryEmpty(curChild)
    }

    return false
  }

  export default {
    name: 'QueryBuilder',

    components: {
      QueryBuilderGroup,
      SearchItemSelect
    },
    provide() {
      return {
        queryBuilderObj: this.provideObj
      }
    },

    props: {
      loading: {
        type: Boolean,
        default() {
          return false
        }
      },
      // 默认的条件
      rules: {
        type: Array,
        default() {
          return []
        }
      },
      disabled: { // 是否禁用
        type: Boolean,
        default() {
          return false
        }
      },
      // 条件树深度， 默认2层
      maxDepth: {
        type: Number,
        default: 2,
        validator: function(value) {
          return value >= 1
        }
      },
      value: Object,
      // 查询项相关数据
      searchItemData: {
        type: Object,
        default() {
          return {
            cateItems: [],
            fieldData: [],
            commonSearchItems: []
          }
        }
      },
      // 是否允许删除第一个条件
      allowDelFirst: {
        type: Boolean,
        default() {
          return false
        }
      },
      actived: {
        type: Boolean,
        default: true
      },
      // 是否单选，默认是
      singleSelect: {
        type: Boolean,
        default() {
          return true
        }
      }
    },

    data() {
      return {
        depth: 1,
        query: {},
        ruleTypes: defaultRuleType,
        currentGroupIndex: null,
        currentConditionIndex: null,
        provideObj: { // 向所有嵌套的子组件注入的全局对象
          disabled: this.disabled
        }
      }
    },

    computed: {
      // 合并条件
      mergedRules() {
        var mergedRules = []
        var vm = this

        vm.rules.forEach(function(rule) {
          if (rule.subRules !== undefined) {
            var mergedSubRules = []
            rule.subRules.forEach(function(subRule) {
              if (typeof vm.ruleTypes[subRule.type] !== 'undefined') {
                mergedSubRules.push(
                  Object.assign({}, vm.ruleTypes[subRule.type], subRule)
                )
              } else {
                mergedSubRules.push(subRule)
              }
            })
            rule.subRules = mergedSubRules
          }
          if (typeof vm.ruleTypes[rule.type] !== 'undefined') {
            mergedRules.push(Object.assign({}, vm.ruleTypes[rule.type], rule))
          } else {
            mergedRules.push(rule)
          }
        })

        // 如果为空， 则默认加入一个空的子条件，防止报错
        if (mergedRules.length == 0) {
          const defaultChild = {
            operators: [],
            inputType: '',
            id: '',
            dataType: ''
          }
          mergedRules.push(defaultChild)
        }
        return mergedRules
      }
    },
    created() {
      this.init()
    },
    mounted() {
      this.$watch(
        'query',
        newQuery => {
          // this.recombination(newQuery)
          // 重新组装
          // 1.0 如果有子节点没有条件的， 需要移除子节点
          // 2.0 如果删除跟节点的需要将yuan
          this.$emit('input', deepClone(newQuery))
          this.$refs.queryBuilderGroup.calculateOffset(newQuery)
        }, {
          deep: true
        }
      )

      if (typeof this.$options.propsData.value !== 'undefined') {
        this.query = Object.assign(this.query, this.$options.propsData.value)
      }
    },
    // 在watch中调用时ruleTypes为空对象
    beforeUpdate() {
      if (this.actived && Object.keys(this.ruleTypes).length === 0) {
        this.getAllRelative()
      }
    },
    methods: {
      init() {
        // 双向绑定导致了父组件的query被修改，用深拷贝解除引用
        this.query = JSON.parse(JSON.stringify(defaultQuery))
        this.ruleTypes = defaultRuleType
        this.currentGroupIndex = null
        this.currentConditionIndex = null
        this.depth = 1
      },

      // 异步获取关系词
      getAllRelative() {
        const ruleType = {
          'text': {
            id: 1,
            options: [{
              label: '等于',
              value: 'eq'
            }],
            dataType: 'text'
          }
        }
        // let _result = await getAll()
        // if (_result.success) {
        //   if (_result.data && _result.data instanceof Array) {
        //     let groupData = groupBy(_result.data, (item) => item.datatypeCode)
        //     Object.keys(groupData).forEach((key, index) => {

        //       let curOptions = groupData[key].map((item) => ({
        //         label: item.relativeDesc,
        //         value: item.relativeCode
        //       }))

        //       ruleType[key] = {
        //         id: index + 1,
        //         options: curOptions,
        //         dataType: key
        //       }
        //     })
        //   }
        // }
        this.ruleTypes = ruleType
      },
      openSearchDialog(groupIndex, conditionIndex) {
        this.currentGroupIndex = groupIndex
        this.currentConditionIndex = conditionIndex
        this.$refs.searchItemDialog.openSearchDialog(true)
      },
      // 填充查询项
      fillInput(activeItems) {
        let curItem = {}
        if (activeItems) {
          if (activeItems instanceof Object) {
            curItem = activeItems
          } else if (activeItems instanceof Array) {
            curItem = activeItems[0]
          }
        }

        this.$refs.queryBuilderGroup.updateChild(this.currentGroupIndex, this.currentConditionIndex, curItem)
      },
      // 获取条件
      getQuery() {
        if (checkQueryEmpty(this.query)) {
          return null
        }
        // 判断条件是否未空
        return this.query
      },
      // 重置
      resetQuery() {
        this.init()
        this.$refs.queryBuilderGroup.calculateOffset(this.query)
      },
      // 校验条件
      vaildQuery() {
        return this.$refs.queryBuilderGroup.valid()
      },
      // 这两个方法是暴露出去的方法，用以在组件外部通过$refs['xxxx'].getRuleParams()或者resetRuleParams()来校验并获取规则或者重置规则
      getRuleParams() {
        let param = {}
        // 先校验条件
        const bringValid = this.vaildQuery()
        if (bringValid) {
          this.$message({
            type: 'error',
            message: '请检查条件'
          })
          return false
        }
        param = this.getQuery()
        return param
      },
      // 重置条件
      resetRuleParams() {
        this.resetQuery()
      },
    }
  }

</script>

<style>
  .query-builder .rule-container,
  .query-builder .rule-placeholder,
  .query-builder .rules-group-container {
    position: relative;
    margin: 4px 0;
    border-radius: 5px;
    padding: 5px;
    border: 0px solid #eee;
    background: rgba(255, 255, 255, 0.9);
  }

  .query-builder .drag-handle,
  .query-builder .error-container,
  .query-builder .rule-container .rule-filter-container,
  .query-builder .rule-container .rule-operator-container,
  .query-builder .rule-container .rule-value-container {
    display: inline-block;
    margin: 0 0 0 0;
    vertical-align: middle;
  }

  .query-builder .rule-container .btn-group>button {
    margin: 0px;
  }

  .query-builder .rules-group-container {
    padding: 10px;
    padding-bottom: 6px;
    border: 0px solid #ddd;
  }

  .query-builder .rules-list {
    list-style: none;
    padding: 0 0 0 40px;
    margin: 0;
  }

  .query-builder .rule-value-container {
    padding-left: 5px;
  }

  .query-builder .rule-value-container label {
    margin-bottom: 0;
    font-weight: 400;
  }

  .query-builder .rule-value-container label.block {
    display: block;
  }

  .query-builder .error-container {
    display: none;
    cursor: help;
    color: red;
  }

  .query-builder .has-error {
    background-color: #fdd;
    border-color: #f99;
  }

  .query-builder .has-error .error-container {
    display: inline-block !important;
  }

  .el-input.is-error .el-input__inner {
    border-color: #f56c6c;
  }

  .query-builder .rules-list> ::after,
  .query-builder .rules-list> ::before {
    content: "";
    position: absolute;
    left: -15px;
    width: 30px;
    height: calc(50% + 4px);
    border-color: #ccc;
    border-style: solid;
  }

  .query-builder .rules-list> ::before {
    top: -4px;
    border-width: 0 0 2px 2px;
  }

  .query-builder .rules-list> ::after {
    top: 50%;
    border-width: 0 0 0 2px;
  }

  .query-builder .rules-list> :first-child::before {
    /* top: -14px;
  height: calc(50% + 14px); */
    top: 20px;
    height: 0px;
    border-top-left-radius: 3px;
  }

  .query-builder .rules-list> :first-child::after {
    /* top: 4px;
  height: calc(50% + 14px); */
    top: 20px;
    height: calc(50% + 17px);
    border-top-left-radius: 3px;
  }

  .query-builder .rules-list> :last-child::before {
    border-radius: 0 0 0 3px;
  }

  .query-builder .rules-list> :last-child::after {
    display: none;
  }

  .query-builder.bt-checkbox-glyphicons .checkbox input[type="checkbox"]:checked+label::after {
    font-family: "Glyphicons Halflings";
    content: "\e013";
  }

  .query-builder.bt-checkbox-glyphicons .checkbox label::after {
    padding-left: 4px;
    padding-top: 2px;
    font-size: 9px;
  }

  .query-builder .error-container+.tooltip .tooltip-inner {
    color: #f99 !important;
  }

  .query-builder p.filter-description {
    margin: 5px 0 0 0;
    background: #d9edf7;
    border: 1px solid #bce8f1;
    color: #31708f;
    border-radius: 5px;
    padding: 2.5px 5px;
    font-size: 0.8em;
  }

  .query-builder .drag-handle {
    cursor: move;
    vertical-align: middle;
    margin-left: 5px;
  }

  .query-builder .dragging {
    position: fixed;
    opacity: 0.5;
    z-index: 100;
  }

  .query-builder .dragging::after,
  .query-builder .dragging::before {
    display: none;
  }

  .query-builder .rule-placeholder {
    border: 1px dashed #bbb;
    opacity: 0.7;
  }

  .rule-header {
    display: flex;
  }

  .rule-header>.pull-right {
    display: inline-block;
    margin: 0;
    vertical-align: middle;
  }

  .has-error {
    background-color: #fdd;
    border-color: #f99;
  }

  .rule-filter-container .search-open-icon {
    cursor: pointer;
  }

  .rule-filter-container,
  .rule-value-container {
    padding-right: 5px;
    width: 30%;
    max-width: 300px;
  }

  .rule-operator-container {
    width: 120px;
  }
</style>

