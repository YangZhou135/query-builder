<template>
  <div class="empty-box">
    <div class="empty empty-normal">
      <div class="empty-image" style="line-height: initial;">
        <img v-if="withImg" :style="{'width':imgWidth}" :alt="desc" :src="require('./empty.png')">
        <p class="empty-description">{{ desc }}</p>
      </div>

      <p class="empty-other">
        <slot />
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EmptyBox',
    props: {
      desc: {
        type: String,
        default() {
          return '暂无数据'
        }
      },
      imgWidth: {
        type: String,
        default() {
          return '140px'
        }
      },
      withImg: {
        type: Boolean,
        default() {
          return true
        }
      }
    }
  }
</script>
<style scoped>
  .empty-description {
    color: #999
  }

  .empty-box {
    text-align: center;
  }
</style>
