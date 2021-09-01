<template>
  <div class="rules-group-container">
    <div class="rules-group-body">
      <rules-group-logical :show-logical="showLogical" :logical-operator="curLogical"
        :logical-style-object="logicalStyleObject" @change-logical="toggleLogical" />
      <template v-if="!showLogical">
        <div style="width:100%;">
          <empty-box :desc="''" :with-img="false">
            <div style="text-align: center;">
              <el-button :disabled="queryBuilderObj.disabled" type="primary" size="mini" @click="addRule">
                添加
              </el-button>
              <span style="margin-left:10px;color:#999;">
                点击"添加"按钮，添加筛选条件
              </span>
            </div>
          </empty-box>
        </div>

      </template>

    </div>
    <div class="rules-list">

      <component :is="child.type" v-for="(child, index) in curChildren" :key="index" ref="ruleItem" :type="child.type"
        :query.sync="child.query" :rule-types="ruleTypes" :rules="rules" :index="index" :max-depth="maxDepth"
        :depth="depth + 1" @child-add-requested="addChildAfter" @child-deletion-requested="removeChild"
        @group-add-requested="addGroupAfter" @open-search-dialog="openSearchDialog" />
    </div>
  </div>
</template>

<script>
  import QueryBuilderRule from './QueryBuilderRule.vue'
  import RulesGroupLogical from './RulesGroupLogical.vue'
  import deepClone from './utils.js'
  import EmptyBox from './empty-box.vue'

  const defaultQuery = {
    logical: 'AND',
    children: [{
      type: 'query-builder-rule',
      query: {
        rule: null,
        fieldItemInfo: {},
        relative: null,
        value: null
      }
    }]
  }

  export default {
    name: 'QueryBuilderGroup',

    components: {
      QueryBuilderRule,
      RulesGroupLogical,
      EmptyBox
    },

    props: ['ruleTypes', 'type', 'query', 'rules', 'index', 'maxDepth', 'depth', 'allowDelFirst'],
    inject: ['queryBuilderObj'],
    data() {
      return {
        showLogical: true,
        showAddBtn: false,
        logicalStyleObject: {
          top: '0px',
          left: '5px'
        },
        transformStyleObject: {
          transform: null
        }
      }
    },
    computed: {
      hasMultipleRule() {
        if (this.query) {
          return this.query.children ? this.query.children.length > 1 : false
        } else {
          return false
        }
      },
      curLogical() {
        return this.query ? this.query.logical : 'AND'
      },
      curChildren() {
        if (this.query) {
          return this.query.children ? this.query.children : []
        } else {
          return []
        }
      }
    },
    created() {
      // 初始化时计算topOffset
      this.calculateOffset(this.query)
    },
    methods: {
      toggleLogical() {
        const updated_query = deepClone(this.query)
        updated_query.logical = updated_query.logical === 'AND' ? 'OR' : 'AND'
        this.$emit('update:query', updated_query)
      },
      addRule() {
        this.addChildAfter()
      },
      getTopOffset(query) {
        let topH = 0
        if (query && query.children && query.children.length > 0) {
          // 单个条件相加top
          const oneH = 24
          // 循环子节点获取总top
          query.children.forEach(c => {
            if (c.query.children && c.query.children.length > 0) {
              topH += this.getTopOffset(c.query)
              topH += 16
            } else {
              topH += oneH
            }
          })
          topH = topH - 4
        }
        return topH
      },
      // 计算逻辑词的偏移量
      calculateOffset(query) {
        if (query && query.children && query.children.length > 0) {
          this.showLogical = true
          this.logicalStyleObject.top = this.getTopOffset(query) + 'px'
          this.transformStyleObject.transform = query.logical === 'AND' ? 'rotateY(180deg)' : 'rotateY(0deg)'
        } else {
          this.showLogical = false
        }
      },
      addGroup() {
        this.addGroupAfter()
      },
      addChildAfter(index) {
        let updated_query = deepClone(this.query)
        const child = {
          type: 'query-builder-rule',
          query: {
            rule: null,
            fieldItemInfo: {},
            relative: null,
            operators: [],
            value: null
          }
        }
        if (index) {
          // 在指定index后面追加
          updated_query.children.splice(index + 1, 0, child)
        } else {
          // 如果没有条件，初始化
          if (!updated_query) {
            updated_query = defaultQuery
            updated_query.children = []
          }

          // 在当前组最后一个条件后面追加一个
          updated_query.children.push(child)
        }

        this.$emit('update:query', updated_query)
        // 计算逻辑连接词的位置
        this.calculateOffset(updated_query)
      },
      addGroupAfter(index) {
        let updated_query = deepClone(this.query)
        if (this.depth < this.maxDepth) {
          const group = {
            type: 'query-builder-group',
            query: {
              logical: 'AND',
              // 默认添加分组时插入一个值
              children: [{
                type: 'query-builder-rule',
                maxDepth: this.maxDepth,
                depth: this.depth,
                query: {
                  rule: null,
                  fieldItemInfo: {},
                  relative: null,
                  operators: [],
                  value: null
                }
              }]
            }
          }
          if (index) {
            // 在指定index后面追加
            updated_query.children.splice(index + 1, 0, group)
          } else {
            // 如果没有条件，初始化
            if (!updated_query) {
              updated_query = defaultQuery
              updated_query.children = []
            }

            updated_query.children.push(group)
          }

          this.$emit('update:query', updated_query)
          // 计算逻辑连接词的位置
          this.calculateOffset(updated_query)
        }
      },
      // 删除分组
      removeGroup() {
        this.$emit('child-deletion-requested', this.index)
      },

      removeChild(index) {
        const updated_query = deepClone(this.query)
        if (!updated_query) {
          return
        }
        // 判断是否可以删除，最后一个条件不允许删除
        if (updated_query.children &&
          updated_query.children.length === 1 &&
          this.depth === 1) {
          const curC = updated_query.children[0]
          if (!curC.query.children || curC.query.children.length === 0) {
            if (!this.allowDelFirst) {
              return
            }
          }
        }
        updated_query.children.splice(index, 1)

        // 判断当前第一个条件是否为"query-builder-rule"类型
        if (updated_query.children.length > 0) {
          updated_query.children.forEach((child, cIndex) => {
            const curType = child.type
            if (updated_query.children.length > 1) {
              // 多个子条件组
              if (curType && curType === 'query-builder-rule') {
                // 将该条件移动到第一个位置
                const temp = updated_query.children[0]
                updated_query.children[0] = child
                updated_query.children[cIndex] = temp
                return false
              }

              if (curType && curType !== 'query-builder-rule' && child.query.children.length === 1) { // 子条件组只有一个条件
                const temp = updated_query.children[0]
                updated_query.children[0] = child.query.children[0]
                updated_query.children[cIndex] = temp
                return false
              }
            }

            if (cIndex === 0) {
              if (curType && curType !== 'query-builder-rule') {
                if (updated_query.children.length === 1) {
                  // 只有一个子条件组
                  updated_query.children = child.query.children
                  updated_query.logical = child.query ? child.query.logical : 'AND'
                  return false
                }
                if (child.query && child.query.children && child.query.children.length === 1) {
                  // 第一个子条件组只有一个条件
                  updated_query.children[cIndex] = child.query.children[0]
                  return false
                }
              }
            }
          })

          // 最后如果当前一个条件还是条件组， 则把条件组修改为条件， 防止条件前端结构样式异常
          const curFirstType = updated_query.children[0].type
          if (curFirstType && curFirstType !== 'query-builder-rule') {
            // updated_query.children[0] = pdated_query.children[0].query.children[0]
            // this.showLogical = false
          }
        }

        // 如果条件组没有子条件，则删除条件组
        if (updated_query.children.length === 0) {
          if (!this.allowDelFirst) {
            this.removeGroup()
          } else {
            // 移出最后一个
            this.showLogical = false
            this.$emit('update:query', updated_query)
          }
        } else {
          this.calculateOffset(updated_query)
          this.$emit('update:query', updated_query)
        }
      },
      // 打开查询项弹出框
      openSearchDialog(index, gIndex) {
        // 注意： 这里如果有多层条件， 会执行多次
        const cgIndex = gIndex === undefined ? this.index : gIndex
        // 第一个参数为当前条件在自己分组中的index, 第二个参数为当前条件组的index
        this.$emit('open-search-dialog', index, cgIndex)
      },
      /**
       * @param groupIndex 当前条件在所在条件组中的index
       * @param conditionIndex 条件index, 如果有条件组，则条件组的index
       */
      updateChild(groupIndex, conditionIndex, curItem) {
        const updated_query = deepClone(this.query)
        const curFieldInfo = curItem.fieldInfo ? curItem.fieldInfo : {}
        const curpFieldInfo = curItem.pFieldInfo ? curItem.pFieldInfo : {}

        let curDataType = curFieldInfo.datatypeCode ? curFieldInfo.datatypeCode : 'string'

        const operators = this.ruleTypes[curDataType] ? this.ruleTypes[curDataType].options : []

        // 是否绑定字典
        if (curItem.dictionaryId && curItem.dictionaryId > 0) {
          curDataType = 'select'
        }
        let curOhterFieldInfo = {}
        let otherValue = null
        if (curItem.searchFieldOtherId && curItem.searchFieldOtherId > 0) {
          curOhterFieldInfo = curItem.otherFieldInfo
          otherValue = curItem.searchFieldOtherValue
        }
        if (conditionIndex === 0) {
          const curQuery = updated_query.children[groupIndex].query
          curQuery.fieldItemInfo = curFieldInfo
          curQuery.fieldItemInfo.pname = curpFieldInfo.name || ''
          curQuery.operators = operators
          curQuery.inputType = curDataType
          curQuery.relative = operators.length > 0 ? operators[0].value : ''
          curQuery.value = ''
          curQuery.otherFieldItemInfo = curOhterFieldInfo
          curQuery.otherValue = otherValue
        } else {
          updated_query.children.forEach((item, index) => {
            if (index === conditionIndex && conditionIndex > 0) {
              if (item.query.children) {
                item.query.children.forEach((citem, ci) => {
                  if (ci === groupIndex) {
                    // let query = citem.query
                    citem.query.fieldItemInfo = curFieldInfo
                    citem.query.operators = operators
                    citem.query.inputType = curDataType
                    citem.query.relative = operators.length > 0 ? operators[0].value : ''
                    citem.value = ''
                    citem.otherFieldItemInfo = curOhterFieldInfo
                    citem.otherValue = otherValue
                  }
                })
              } else {
                // let query = item.query

                item.query.fieldItemInfo = curFieldInfo
                item.query.operators = operators
                item.query.inputType = curDataType
                item.query.relative = operators.length > 0 ? operators[0].value : ''
                item.value = ''
                item.otherFieldItemInfo = curOhterFieldInfo
                item.otherValue = otherValue
              }
            }
          })
        }

        this.$emit('update:query', updated_query)
      },
      valid() {
        let flg = false
        const ruleArr = this.$refs.ruleItem
        if (ruleArr && ruleArr instanceof Array) {
          ruleArr.forEach(item => {
            if (item.valid()) {
              flg = true
            }
          })
        }

        return flg
      }
    }
  }
</script>
