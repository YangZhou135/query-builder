<!-- 单个条件 -->
<template>
  <div class="rule-container">
    <div class="rule-header">
      <div class="rule-filter-container">
        <el-input v-model="input_name" :disabled="queryBuilderObj.disabled" :class="{'is-error':fieldError}"
                  size="small" @blur="input_name=(query.fieldItemInfo.pname || '')+'-'+query.fieldItemInfo.name"
        >
          <i slot="suffix" title="点击选择指标" class="search-open-icon el-input__icon icon iconfont  el-icon-search"
             @click="openSearchItem"
          />
        </el-input>
      </div>
      <div class="rule-operator-container">
        <el-select v-model="query.relative" :disabled="queryBuilderObj.disabled" :class="{'is-error':relativeError}"
                   size="small"
        >
          <el-option v-for="operator in queryOperatorOption" :key="operator.value" :value="operator.value"
                     :label="operator.label"
          />
        </el-select>
      </div>
      <div class="rule-value-container">
        <!--文本框-->
        <el-input v-if="query.inputType === 'text' || query.inputType === 'keyword' || query.inputType === 'string' " v-model="query.value"
                  :disabled="queryBuilderObj.disabled"
                  size="small" type="text" :class="{'is-error':valueError}" clearable
        />
        <!--数值框-->
        <el-input-number v-else-if="query.inputType === 'number'" v-model="query.value"
                         :disabled="queryBuilderObj.disabled" :class="{'is-error':valueError}" size="small"
        />
        <!--日期时间选择框-->
        <el-date-picker v-else-if="query.inputType === 'date' || query.inputType === 'datetime'" v-model="query.value"
                        :disabled="queryBuilderObj.disabled" size="small"
                        value-format="timestamp" :editable="false" style="width:100%" :class="{'is-error':valueError}"
                        :type="query.inputType"
        />
        <!--多选框-->
        <!-- <el-checkbox-group v-model="query.value"
                           v-else-if="query.inputType === 'checkbox'">
          <el-checkbox :label="choice" :disabled="queryBuilderObj.disabled"
                       v-for="choice in query.choices"
                       :key="choice"
                       :value="choice"></el-checkbox>
        </el-checkbox-group> -->
        <!--单选-->
        <!-- <el-radio-group v-model="query.value"
                        v-else-if="query.inputType === 'radio'">
          <el-radio :label="choice" :disabled="queryBuilderObj.disabled"
                    v-for="choice in query.choices"
                    :key="choice"
                    :value="choice"></el-radio>
        </el-radio-group> -->
        <el-input v-else v-model="query.value" :disabled="queryBuilderObj.disabled" type="text" size="small"
                  :class="{'is-error':valueError}" clearable
        />
      </div>

      <div class="btn-group rule-actions">
        <el-button v-if="depth <= maxDepth" :disabled="queryBuilderObj.disabled" size="mini" title="添加条件组"
                   icon="el-icon-download" circle @click="addGroup"
        />
        <el-button :disabled="queryBuilderObj.disabled" size="mini" title="添加条件" icon="el-icon-plus" circle
                   @click="add"
        />
        <el-button :disabled="queryBuilderObj.disabled" size="mini" icon="el-icon-close" circle @click="remove" />

      </div>
    </div>
  </div>
</template>

<script>
  import deepClone from './utils.js'

  export default {
    name: 'QueryBuilderRule',
    components: {

    },
    props: {
      inputSize: {
        type: String,
        default() {
          return 'small'
        }
      },
      query: {
        type: Object,
        default() {
          return {}
        }
      },
      index: {
        type: Number,
        default() {
          return null
        }
      },
      // 全部关系词类型
      rules: {
        type: Array,
        default() {
          return []
        }
      },
      maxDepth: {
        type: Number,
        default() {
          return 3
        }
      },
      depth: {
        type: Number,
        default() {
          return 0
        }
      }
    },
    inject: ['queryBuilderObj'],
    data() {
      // debugger
      return {
        // 当前查询条件的字段编码
        selectSearchItemFieldEName: '',
        fieldItemInfo: this.query.rule || this.rules[0],
        hasError: false,
        fieldError: false,
        relativeError: false,
        valueError: false,
        input_name: this.query.fieldItemInfo.pname && this.query.fieldItemInfo.name ? this.query.fieldItemInfo.pname + '-' + this.query.fieldItemInfo.name : '',
        queryOperatorOption: [{
              label: '等于',
              value: 'eq'
            }, {
              label: '不等于',
              value: 'neq'
            }, {
              label: '大于',
              value: 'gt'
            }, {
              label: '小于',
              value: 'lt'
            }, {
              label: '大于等于',
              value: 'gte'
            }, {
              label: '小于等于',
              value: 'lte'
            }, {
              label: '包括',
              value: 'in'
            }]
      }
    },
    watch: {
      // 监听当前条件查询字段的变化
      selectSearchItemFieldEName() {
        this.ruleChange()
      },
      'query.fieldItemInfo.name'(val) {
        this.fieldError = false
        this.relativeError = false
        this.valueError = false
        this.input_name = (this.query.fieldItemInfo.pname || '') + '-' + val
      },
      'query.value'() {
        this.valueError = false
      }
    },
    mounted() {
      this.initValue()
    },
    methods: {
      add() {
        this.$emit('child-add-requested', this.index)
      },
      remove() {
        this.$emit('child-deletion-requested', this.index)
      },
      addGroup() {
        this.$emit('group-add-requested', this.index)
      },
      initValue() {
        if (this.query.value === null) {
          const updated_query = deepClone(this.query)
          // 适配输入框类型的值
          // if (this.selectedRuleObj.inputType === "checkbox") {
          //   updated_query.value = [];
          // }
          // if (
          //   this.selectedRuleObj.inputType === "select" ||
          //   this.selectedRuleObj.inputType === "radio"
          // ) {
          //   updated_query.value = this.selectedRuleObj.choices[0];
          // }
          // if (
          //   this.selectedRuleObj.inputType === "time" ||
          //   this.selectedRuleObj.inputType === "date" ||
          //   this.selectedRuleObj.inputType === "datetime"
          // ) {
          //   updated_query.value = Math.round(new Date());
          // }
          this.$emit('update:query', deepClone(updated_query))
        }
      },
      // 打开查询项弹出框
      openSearchItem() {
        this.$emit('open-search-dialog', this.index)
      },
      // rulex修改
      ruleChange() {

      },
      valid() {
        const b1 = this.validField()
        const b2 = this.validRelative()
        const b3 = this.validValue()
        return b1 || b2 || b3
      },
      validField() {
        const curFieldInfo = this.query.fieldItemInfo

        if (!curFieldInfo || !curFieldInfo.name) {
          this.fieldError = true
        } else {
          this.fieldError = false
        }

        return this.fieldError
      },
      validRelative() {
        const curOp = this.query.relative
        if (!curOp || curOp.length === 0) {
          this.relativeError = true
        } else {
          this.relativeError = false
        }

        return this.relativeError
      },
      validValue() {
        const curV = this.query.value

        if (!curV || curV.length === 0) {
          this.valueError = true
        } else {
          this.valueError = false
        }

        return this.valueError
      }
    }
  }

</script>
<style scoped>
.rule-actions{
  display: inline-block;
}
</style>
