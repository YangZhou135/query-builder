<template>
  <div>
    <template v-if="cateItems.length>0">
      <div class="sibarmenu">
        <el-menu class="el-menu-vertical-demo" :default-active="activeIndex" @select="selectMenu">
          <div v-for="(item, index) in cateItems" :key="index">
            <el-menu-item :index="type + item.cateId">
              <span slot="title">{{ item.cateName }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </div>
      <div ref="itemBox" class="search-item-box" @scroll="scrollEvent">
        <div v-for="(item, index) in cateItems" :key="index" class=" search-parent-cate">
          <!-- 添加锚点 -->
          <p :id="type + item.cateId" class="search-parent-title acontent">{{ item.cateName }}</p>
          <div v-for="(sub, subIndex) in item.child" :key="subIndex" class="search-sub-cate">
            <p class="search-sub-title">{{ sub.childName }}</p>
            <div v-for="(sitem, sindex) in sub.item" :key="sindex" class="search-item-content">
              <span class="search-item-tag" :class="{ active:selectItems.indexOf(sitem) > -1 }"
                    @click="clickItem(sitem,sub)"
              >{{ sitem.searchItemName }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <empty-box />
      <!-- <empty-box></empty-box> -->
    </template>

  </div>
</template>

<script>
import emptyBox from './empty-box/empty-box.vue'
  export default {
    name: 'ScrollMenu',
  components: { emptyBox },
    props: {
      // 类型 全病字段还是专病字段
      type: {
        type: String,
        default() {
          return ''
        }
      },
      // 是否单选，默认是
      singleSelect: {
        type: Boolean,
        default() {
          return true
        }
      },
      // 查询项大分类
      cateItems: {
        type: Array,
        default() {
          return []
        }
      },
      // 全部关联字段信息
      fieldData: {
        type: Array,
        default() {
          return []
        }
      },
      // 公共的指标项
      commonSearchItems: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        activeIndex: null,
        selectId: '',
        keyword: '',
        selectItems: []
      }
    },
    watch: {
      selectId() {
        this.activeIndex = this.selectId
      }
    },
    methods: {
      // 查询项点击事件
      clickItem(item, sub) {
        if (this.singleSelect) {
          this.selectItems = []
        }
        const arr = this.selectItems.filter(i => {
          return i.searchItemId === item.searchItemId
        })
        if (arr && arr.length > 0) {
          // 从选中的列表中移除
          this.selectItems = this.selectItems.filter(i => {
            return i.searchItemId !== item.searchItemId
          })
        } else {
          // 获取关联的字段信息
          const fieldInfoArr = this.fieldData.filter(info => {
            return info.id === item.searchFieldId
          })

          if (fieldInfoArr && fieldInfoArr.length > 0) {
            item['fieldInfo'] = fieldInfoArr[0]
          } else if (!item.fieldInfo) {
            item['fieldInfo'] = {}
          }
          // 获取字段的父字段
          if (sub) {
            item['pFieldInfo'] = {
              id: sub.childId,
              name: sub.childName
            }
          } else {
            item['pFieldInfo'] = {}
          }
          // 特殊处理检验、检查等
          if (item.searchFieldOtherId && item.searchFieldOtherId > 0) {
            // item.fieldInfo.name = item.searchItemName + "_" + item.fieldInfo.name
            // todo 检验检查生成的时候在查询项中已经带上名称
            item.fieldInfo.name = item.searchItemName
            // 获取其他字段信息
            const otherFieldInfoArr = this.fieldData.filter(info => {
              return info.id === item.searchFieldOtherId
            })

            item.otherFieldInfo = (otherFieldInfoArr && otherFieldInfoArr.length > 0) ? otherFieldInfoArr[0] : null
          } else {
            // 展示查询项名称
            item.fieldInfo.name = item.searchItemName
          }

          this.selectItems.push(item)
        }

        if (this.singleSelect) {
          // this.closeSearchDialog()
          this.$emit('closeSearchDialog')
        }
      },
      // 获取全部选中的查询项
      getSelectItems() {
        const activeItem = this.selectItems ? this.selectItems : []

        if (this.singleSelect) {
          return activeItem.length > 0 ? activeItem[0] : null
        } else {
          return activeItem
        }
      },
      selectMenu(key) {
        this.toParentid(key)
      },
      // 跳转到锚点
      toParentid(key) {
        var el = document.getElementById(key)
        el.scrollIntoView()
      },
      scrollEvent() {
        const navContents = document.querySelectorAll('.acontent')
        // 所有锚点元素的 offsetTop
        const offsetTopArr = []
        navContents.forEach(item => {
          const temp = {
            offsetTop: item.offsetTop,
            id: item.id
          }
          offsetTopArr.push(temp)
        })
        // 获取当前文档流的 scrollTop
        const offsetTop = this.$refs.itemBox.offsetTop
        const scrollTop = this.$refs.itemBox.scrollTop + offsetTop + 25

        let navIndex = ''
        for (let n = 0; n < offsetTopArr.length; n++) {
          // 如果 scrollTop 大于等于第 n 个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
          // 那么此时导航索引就应该是 n 了
          if (scrollTop >= offsetTopArr[n].offsetTop) {
            navIndex = offsetTopArr[n].id
          }
        }
        // 把下标赋值给 vue 的 data
        this.selectId = navIndex
      }
    }
  }

</script>
<style scoped>
  .sibarmenu {
    width: 150px;
    height: calc(100vh - 350px);
    overflow-y: auto;
    text-align: right;
    float: left;
  }

  .search-item-box {
    height: calc(100vh - 350px);
    overflow-y: auto;
    margin-bottom: 20px;
    padding: 10px;
  }

  .search-parent-cate {
    display: grid;
  }

  .search-parent-title {
    font-weight: 600;
    margin: 15px 0 0 15px;
  }

  .search-sub-title {
    font-weight: 500px;
    margin: 20px 0 0 20px;
  }

  .search-sub-title:before {
    display: inline-block;
    position: relative;
    top: -5px;
    right: 10px;
    content: "";
    width: 2%;
    height: 0px;
    border: 1px solid #e6e6e6;
  }

  .search-sub-title:after {
    display: inline-block;
    position: relative;
    top: -5px;
    left: 10px;
    content: "";
    width: 2%;
    height: 0px;
    border: 1px solid #e6e6e6;
  }

  .search-item-content {
    margin: 10px 25px
  }

  .search-item-tag {
    margin: 3px;
    padding: 3px 8px;
    border-radius: 2px;
    cursor: pointer;
    font-size: 14px;
    color: #606266;
    display: inline-block;
    float: left;
  }

  .search-item-tag:hover {
    color: #fff;
    background-color: #a4c8ec;
  }

  .search-item-tag.active {
    color: #fff;
    background-color: #409eff;
  }

  .el-menu-item.is-active {
    color: #fff;
    background-color: #409eff;
  }

  .el-menu-item,
  .el-menu-item>span {
    height: 45px;
    line-height: 45px;
  }

</style>
