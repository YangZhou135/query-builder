<template>
  <div>
    <slot v-bind="{checked,indeterminate}" />
  </div>
</template>

<script>
  export default {
    props: {
      all: { // 所有的可供选择项
        type: Array,
        default() {
          return []
        }
      },
      selected: { // 当前已选中项
        type: Array,
          default() {
            return []
          }
        }
    },
    data() {
      return {

      }
    },
    computed: {
      isCheckAll() {
        const ret = true
        for (let i = 0; i < this.all.length; i++) {
          const item = this.all[i]
          if (this.selected.indexOf(item) < 0) {
            return false
          }
        }
        return ret
      },
      isEmpty() {
        const ret = true
        for (let i = 0; i < this.all.length; i++) {
          const item = this.all[i]
          if (this.selected.indexOf(item) >= 0) {
            return false
          }
        }
        return ret
      },
      checked() {
        return this.isCheckAll
      },
      indeterminate() {
        return !this.isCheckAll && !this.isEmpty
      }
    }
  }
</script>