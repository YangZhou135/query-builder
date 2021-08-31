<template>
  <div v-show="showLogical" class="rules-group-logical" :style="logicalStyleObject" @click="toggleLogical">
    <div class="flip" :style="transformStyleObject">
      <div class="front">
        AND
      </div>
      <div class="back">
        OR
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      showLogical: {
        type: Boolean,
        default() {
          return false
        }
      },
      logicalOperator: {
        type: String,
        default() {
          return 'AND'
        }
      },
      logicalStyleObject: {
        type: Object,
        default() {
          return {
            top: '0px',
            left: '-10px'
          }
        }
      }
    },
    inject: ['queryBuilderObj'],
    data() {
      return {
        transformStyleObject: {
          transform: null
        }
      }
    },
    watch: {
      'logicalOperator'() {
        this.watchLogical()
      }
    },
    methods: {
      // 切换逻辑连接词
      toggleLogical() {
        if (!this.queryBuilderObj.disabled) {
          this.$emit('change-logical', this.logicalOperator)
        }
      },
      watchLogical() {
        if (this.logicalOperator === 'AND') {
          this.transformStyleObject.transform = 'rotateY(0deg)'
        } else {
          this.transformStyleObject.transform = 'rotateY(180deg)'
        }
      }
    }
  }

</script>
<style scoped>
  .rules-group-logical {
    position: absolute;
    font-size: 14px;
    color: #fff;
    font-weight: 600;
    perspective: 1000;
    transform-style: preserve-3d;
    text-align: center;
    z-index: 2;
    cursor: pointer;
  }

  .rules-group-logical,
  .front,
  .back {
    width: 42px;
    height: 24px;
    line-height: 24px;
    border-radius: 2px;
  }

  .flip {
    position: relative;
    transition: 0.6s;
    transform-style: preserve-3d;
  }

  .front,
  .back {
    position: absolute;
    top: 0px;
    left: 0px;
    padding-top: 1px;
    backface-visibility: hidden;
  }

  .front {
    background-color: #409eff;
    z-index: 3;
  }

  .back {
    background-color: #ffd54f;
    transform: rotateY(-180deg);
  }

</style>
