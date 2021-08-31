<template>
  <el-dialog class="export-inline" :visible.sync="searchItemDialogVisible" append-to-body width="75%"
             top="7vh" center @open="openHandler"
  >
    <span slot="title">
      <el-autocomplete v-model="keyword" class="inline-input search-item-input" size="medium"
                       :fetch-suggestions="querySearch" placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect"
      />
    </span>
    <scroll-menu ref="disease" type="disease" :single-select="singleSelect" :cate-items="disCateItems"
                 :field-data="fieldData" :common-search-items="commonSearchItems" @closeSearchDialog="closeSearchDialog"
    />

    <span slot="footer" class="dialog-footer">
      <el-button @click="searchItemDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="closeSearchDialog">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import ScrollMenu from './ScrollMenu'

  export default {
    components: {
      ScrollMenu
    },
    props: {
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
      // 是否默认选中病例信息，默认否
      patientSelect: {
        type: Boolean,
        default() {
          return false
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
      },
      loading: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        searchItemDialogVisible: false,
        // 列表
        restaurants: [],
        keyword: '',
        isInitActive: false,
        activeName: 'disease',
        fieldActiveName: 'es_filed',
        // 专病表单字段
        disCateItems: [],
        filedCateItems: [],
        esCateFiled: [],
        structCateFiled: [],
        esFields: [],
        convertFields: [],
        // FIXME:之前是从vuex中获取的
        projectInfo: {}
      }
    },
    computed: {
      isDisDb() {
        return this.$route.path.indexOf('/disease-detail') === 0
      },
      disDbId() {
        return Number(this.$route.query.did)
      },
      isFieldset() {
        return this.$route.path.indexOf('/fieldset-config') === 0
      }
    },
    watch: {
      searchItemDialogVisible: function(value) {
        if (!value) return

        if (this.disCateItems.length === 0) {
          this.getDisFields()
        }
      }
    },
    methods: {
      makeStructTree(data, keys) {
        const tmp_arr = []

        if (data && data.length > 0) {
          for (let c_idx = 0; c_idx < data.length; c_idx++) {
            const cate = data[c_idx]
            const tmp_cate = {
              cateId: cate.id || c_idx,
              cateName: cate.label,
              child: []
            }
            if ((cate.children && cate.children.length === 0) || !cate.children) {
              cate.children = [{
                id: cate.id,
                label: cate.label,
                children: []
              }]
            } else {
              if (typeof cate.children[0].id === 'number') { // 子分类
              } else {
                const origin_children = cate.children
                cate.children = [{
                  id: cate.id,
                  label: cate.label,
                  children: origin_children
                }]
              }
            }
            const tmp_child = {
              childId: cate.id,
              childName: cate.label,
              item: []
            }
            for (let item_idx = 0; item_idx < cate.children.length; item_idx++) {
              const item = cate.children[item_idx]
              for (const key in keys) {
                keys[key] = item.data[key] ? item.data[key] : keys[key]
              }
              const tmp_item = {
                searchItemName: item.name,
                searchId: item.id,
                ...keys
              }
              tmp_child.item.push(tmp_item)
            }
            tmp_cate.child.push(tmp_child)
            tmp_arr.push(tmp_cate)
          }
        }
        return tmp_arr
      },
      makeTreeData(data, keys) {
        const tmp_arr = []

        if (data && data.length > 0) {
          for (let c_idx = 0; c_idx < data.length; c_idx++) {
            const cate = data[c_idx]
            const tmp_cate = {
              cateId: cate.id,
              cateName: cate.label,
              child: []
            }
            if ((cate.children && cate.children.length === 0) || !cate.children) {
              cate.children = [{
                id: cate.id,
                label: cate.label,
                children: []
              }]
            } else {
              if (typeof cate.children[0].id === 'number') { // 子分类
              } else {
                const origin_children = cate.children
                cate.children = [{
                  id: cate.id,
                  label: cate.label,
                  children: origin_children
                }]
              }
            }
            for (let child_idx = 0; child_idx < cate.children.length; child_idx++) {
              const child = cate.children[child_idx]
              const tmp_child = {
                childId: child.id,
                childName: child.label,
                item: []
              }
              for (let item_idx = 0; item_idx < child.children.length; item_idx++) {
                const item = child.children[item_idx]

                for (const key in keys) {
                  keys[key] = item.data[key] ? item.data[key] : keys[key]
                }

                const tmp_item = {
                  searchItemName: item.label,
                  searchId: item.id,
                  ...keys
                }
                tmp_child.item.push(tmp_item)
              }
              tmp_cate.child.push(tmp_child)
            }
            tmp_arr.push(tmp_cate)
          }
        }

        return tmp_arr
      },

      async getDisFields() {
        // const subProjectId = 27
        const subProjectId = this.$route.query.subid
        const data = await this.$axios.get(`/proj/form/tree?subProjectId=${subProjectId}`)
        const tmp_arr = []
        if (data && data.length > 0) {
          for (let c_idx = 0; c_idx < data.length; c_idx++) {
            const cate = data[c_idx]
            const tmp_cate = {
              cateId: cate.id,
              cateName: cate.label,
              child: []
            }
            if ((cate.children && cate.children.length === 0) || !cate.children) { // 空表单
              cate.children = [{
                id: cate.id,
                label: cate.label,
                children: []
              }]
            } else { // 判断第二级树节点是子分类还是字段
              if (typeof cate.children[0].id === 'number') { // 子分类
              } else { // 表单字段 // 添加一个同名的子分类
                const origin_children = cate.children
                cate.children = [{
                  id: cate.id,
                  label: cate.label,
                  children: origin_children
                }]
              }
            }
            for (let child_idx = 0; child_idx < cate.children.length; child_idx++) {
              const child = cate.children[child_idx]
              const tmp_child = {
                childId: child.id,
                childName: child.label,
                item: []
              }
              for (let item_idx = 0; item_idx < child.children.length; item_idx++) {
                const item = child.children[item_idx]
                const tmp_item = {
                  searchItemName: item.label,
                  searchItemId: item.id,
                  fieldInfo: {
                    id: 0,
                    name: item.label,
                    code: item.code,
                    elasticIndexId: 0,
                    elasticTypeId: 0,
                    datatypeCode: 'keyword',
                    dictionaryId: 0,
                    analyzer: 0,
                    desensitization: 0,
                    sequence: 0,
                    elasticTypeName: 'crf表',
                    elasticTypeCode: 'crf',
                    elasticIndexName: 'csmsearch',
                    elasticIndexCode: 'csmsearchtest',
                    dicCateName: null,
                    businessCode: '',
                    crf: {
                      formId: item.data.formId,
                      name: item.label,
                      key: item.data.key,
                      type: item.data.type,
                      formGuid: item.data.formGuid,
                      path: item.data.path
                    }
                  }
                }

                tmp_child.item.push(tmp_item)
              }
              tmp_cate.child.push(tmp_child)
            }
            tmp_arr.push(tmp_cate)
          }
        }
        // 如果需要默认选中病例信息
        console.log(tmp_arr)
        if (this.patientSelect) {
          const patientArr = tmp_arr.filter(item => item.cateId === 'patient')
          const patientItemArr = []
          patientArr[0].child[0].item.forEach(element => {
            element.pFieldInfo = {}
            element.pFieldInfo.id = 'patient'
            element.pFieldInfo.name = '病例信息'
            patientItemArr.push(element)
          })
          this.$refs.disease.selectItems = patientItemArr
        }
        this.disCateItems = tmp_arr
      },
      querySearch(queryString, callback) {
        var results = queryString ? this.restaurants.filter(this.createFilter(queryString)) : this.restaurants
        // 调用 callback 返回建议列表的数据
        callback(results)
      },
      // 前端过滤
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      handleSelect(item) {
        console.log(item)
      },
      handleNodeClick(item) {
        this.searchItemDialogVisible = false
        const curActiveItem = item ? item.data : null
        this.$emit('close-search-dialog', curActiveItem, this.fieldActiveName)
      },
      // 打开弹出框
      openSearchDialog(isInitActive) {
        // 如果传入true， 则初始化选中
        // 单选始终初始化选中
        this.isInitActive = isInitActive
        this.searchItemDialogVisible = true
      },
      // 打开弹框后
      openHandler() {
        if (this.isInitActive || this.singleSelect) {
          this.$nextTick(() => {
            this.$refs['all_cate'] && (this.$refs['all_cate'].selectItems = [])
            this.$refs['fieldset'] && (this.$refs['fieldset'].selectItems = [])
            this.$refs['es_filed'] && (this.$refs['es_filed'].selectItems = [])
            this.$refs['struct_tree'] && (this.$refs['struct_tree'].selectItems = [])

            this.$emit('opened')
          })
        } else {
          this.$emit('opened')
        }
      },
      // 关闭弹出框
      closeSearchDialog() {
        this.searchItemDialogVisible = false
        const activeItem = this.getSelectItems()

        console.log(activeItem)

        this.$emit('close-search-dialog', activeItem, this.fieldActiveName)
      },
      // 获取全部选中的查询项
      getSelectItems() {
        if (this.singleSelect) {
          if (this.$refs['fieldset']) {
            return this.$refs['fieldset'].getSelectItems()
          }

          if (this.isFieldset && this.fieldActiveName === 'es_filed') {
            return this.$refs['es_filed'].getSelectItems()
          } else if (this.fieldActiveName === 'struct_filed') {
            return this.$refs['struct_tree'].getCurrentNode()
          }

          if (this.activeName === 'all_cate') {
            return this.$refs['all_cate'].getSelectItems()
          } else if (this.activeName === 'disease') {
            return this.$refs['disease'].getSelectItems()
          }
        } else {
          const all_cate = this.$refs['all_cate'] ? this.$refs['all_cate'].getSelectItems() : []
          const disease = this.$refs['disease'] ? this.$refs['disease'].getSelectItems() : []
          return [...all_cate, ...disease]
        }
      }

    }
  }

</script>
<style>
  .search-item-input {
    width: 350px;
  }

  .struct_tree {
    max-height: calc(100vh - 350px);
    overflow-y: scroll;
  }

  .export-inline .el-dialog .el-dialog__body {
    padding-bottom: 0;
  }

</style>
