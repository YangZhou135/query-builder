<template>
  <div id="app">
    <query-builder ref="BringQueryBuilder" :rules="rules" :allow-del-first="true" :search-item-data="searchItemData" :single-select="true" />
    <el-row>
      <el-button size="mini" plain @click="clickHandler_1()">开始搜索</el-button>
      <el-button size="mini" type="danger" @click="clickHandler_2()">重置</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      lightSwitch: true,
      rules: [],
      searchItemData: {
        cateItems:[
            {
            "id": "patient",
            "code": null,
            "pid": 0,
            "label": "病例信息",
            "data": null,
            "children": [
            {
            "id": "pa_name",
            "code": null,
            "pid": "patient",
            "label": "病例姓名",
            "data": {
            "type": "input",
            "code": null,
            "name": "病例姓名",
            "label": "病例姓名",
            "key": "pa_name",
            "formId": 0,
            "formGuid": "patient",
            "path": "pa_name",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": null,
            "hasOtherOption": null
            },
            "children": null
            },
            {
            "id": "pa_gender",
            "code": null,
            "pid": "patient",
            "label": "病例性别",
            "data": {
            "type": "input",
            "code": null,
            "name": "病例性别",
            "label": "病例性别",
            "key": "pa_gender",
            "formId": 0,
            "formGuid": "patient",
            "path": "pa_gender",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": null,
            "hasOtherOption": null
            },
            "children": null
            },
            {
            "id": "regno",
            "code": null,
            "pid": "patient",
            "label": "病例登记号",
            "data": {
            "type": "input",
            "code": null,
            "name": "病例登记号",
            "label": "病例登记号",
            "key": "regno",
            "formId": 0,
            "formGuid": "patient",
            "path": "regno",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": null,
            "hasOtherOption": null
            },
            "children": null
            },
            {
            "id": "pa_empi",
            "code": null,
            "pid": "patient",
            "label": "empi",
            "data": {
            "type": "input",
            "code": null,
            "name": "empi",
            "label": "empi",
            "key": "pa_empi",
            "formId": 0,
            "formGuid": "patient",
            "path": "pa_empi",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": null,
            "hasOtherOption": null
            },
            "children": null
            },
            {
            "id": "pa_birthday",
            "code": null,
            "pid": "patient",
            "label": "出生日期",
            "data": {
            "type": "input",
            "code": null,
            "name": "出生日期",
            "label": "出生日期",
            "key": "pa_birthday",
            "formId": 0,
            "formGuid": "patient",
            "path": "pa_birthday",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": null,
            "hasOtherOption": null
            },
            "children": null
            },
            {
            "id": "pa_id_card",
            "code": null,
            "pid": "patient",
            "label": "身份证号",
            "data": {
            "type": "input",
            "code": null,
            "name": "身份证号",
            "label": "身份证号",
            "key": "pa_id_card",
            "formId": 0,
            "formGuid": "patient",
            "path": "pa_id_card",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": null,
            "hasOtherOption": null
            },
            "children": null
            },
            {
            "id": "pa_tel",
            "code": null,
            "pid": "patient",
            "label": "手机号码",
            "data": {
            "type": "input",
            "code": null,
            "name": "手机号码",
            "label": "手机号码",
            "key": "pa_tel",
            "formId": 0,
            "formGuid": "patient",
            "path": "pa_tel",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": null,
            "hasOtherOption": null
            },
            "children": null
            },
            {
            "id": "pa_source",
            "code": null,
            "pid": "patient",
            "label": "病例来源",
            "data": {
            "type": "input",
            "code": null,
            "name": "病例来源",
            "label": "病例来源",
            "key": "pa_source",
            "formId": 0,
            "formGuid": "patient",
            "path": "pa_source",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": null,
            "hasOtherOption": null
            },
            "children": null
            }
            ]
            },
            {
            "id": "attachment",
            "code": null,
            "pid": 0,
            "label": "附件信息",
            "data": null,
            "children": [
            {
            "id": "attach_file_name",
            "code": null,
            "pid": "attachment",
            "label": "附件名称",
            "data": {
            "type": "input",
            "code": null,
            "name": "附件名称",
            "label": "附件名称",
            "key": "attach_file_name",
            "formId": 0,
            "formGuid": "attachment",
            "path": "attach_file_name",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": null,
            "hasOtherOption": null
            },
            "children": null
            },
            {
            "id": "attach_file_path",
            "code": null,
            "pid": "attachment",
            "label": "附件路径",
            "data": {
            "type": "input",
            "code": null,
            "name": "附件路径",
            "label": "附件路径",
            "key": "attach_file_path",
            "formId": 0,
            "formGuid": "attachment",
            "path": "attach_file_path",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": null,
            "hasOtherOption": null
            },
            "children": null
            },
            {
            "id": "attach_file_type",
            "code": null,
            "pid": "attachment",
            "label": "附件类型",
            "data": {
            "type": "input",
            "code": null,
            "name": "附件类型",
            "label": "附件类型",
            "key": "attach_file_type",
            "formId": 0,
            "formGuid": "attachment",
            "path": "attach_file_type",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": null,
            "hasOtherOption": null
            },
            "children": null
            },
            {
            "id": "attach_upload_time",
            "code": null,
            "pid": "attachment",
            "label": "附件上传时间",
            "data": {
            "type": "input",
            "code": null,
            "name": "附件上传时间",
            "label": "附件上传时间",
            "key": "attach_upload_time",
            "formId": 0,
            "formGuid": "attachment",
            "path": "attach_upload_time",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": null,
            "hasOtherOption": null
            },
            "children": null
            }
            ]
            },
            {
            "id": 416,
            "code": null,
            "pid": 0,
            "label": "既往史(脑出血项目)",
            "data": {
            "id": 416,
            "formName": "既往史(脑出血项目)",
            "formGuid": "4cb1d08a3fff4dd8a8e3b5525b33adcd",
            "metadata": "",
            "publish": 1,
            "version": "1629429882664",
            "createDate": "2021-08-12 14:38:05",
            "sort": 0
            },
            "children": [
            {
            "id": "416_radio_1_label",
            "code": null,
            "pid": 416,
            "label": "相关病史",
            "data": {
            "type": "radio",
            "code": null,
            "name": "相关病史",
            "label": "单选框组",
            "key": "radio_1",
            "formId": 416,
            "formGuid": "4cb1d08a3fff4dd8a8e3b5525b33adcd",
            "path": "radio_1.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "脑出血史"
            },
            {
            "value": "2",
            "label": "脑微出血史"
            },
            {
            "value": "3",
            "label": "脑梗史"
            },
            {
            "value": "4",
            "label": "TIA"
            },
            {
            "value": "5",
            "label": "颈动脉狭窄"
            },
            {
            "value": "6",
            "label": "脑外伤史"
            },
            {
            "value": "7",
            "label": "脑肿瘤史"
            },
            {
            "value": "8",
            "label": "脑积水"
            },
            {
            "value": "9",
            "label": "脑淀粉样变性"
            },
            {
            "value": "10",
            "label": "AD"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "416_radio_2_label",
            "code": null,
            "pid": 416,
            "label": "相关病史",
            "data": {
            "type": "radio",
            "code": null,
            "name": "相关病史",
            "label": "单选框组",
            "key": "radio_2",
            "formId": 416,
            "formGuid": "4cb1d08a3fff4dd8a8e3b5525b33adcd",
            "path": "radio_2.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "高血压"
            },
            {
            "value": "2",
            "label": "冠心病"
            },
            {
            "value": "3",
            "label": "高血脂症"
            },
            {
            "value": "4",
            "label": "阻塞性睡眠呼吸综合征"
            },
            {
            "value": "5",
            "label": "心衰"
            },
            {
            "value": "6",
            "label": "房颤"
            },
            {
            "value": "7",
            "label": "血管炎"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "416_radio_3_label",
            "code": null,
            "pid": 416,
            "label": "糖尿病",
            "data": {
            "type": "radio",
            "code": null,
            "name": "糖尿病",
            "label": "单选框组",
            "key": "radio_3",
            "formId": 416,
            "formGuid": "4cb1d08a3fff4dd8a8e3b5525b33adcd",
            "path": "radio_3.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "有"
            },
            {
            "value": "2",
            "label": "无"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "416_radio_4_label",
            "code": null,
            "pid": 416,
            "label": "血液系统",
            "data": {
            "type": "radio",
            "code": null,
            "name": "血液系统",
            "label": "单选框组",
            "key": "radio_4",
            "formId": 416,
            "formGuid": "4cb1d08a3fff4dd8a8e3b5525b33adcd",
            "path": "radio_4.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "急性白血病"
            },
            {
            "value": "2",
            "label": "慢性白血病"
            },
            {
            "value": "3",
            "label": "再障"
            },
            {
            "value": "4",
            "label": "原发性血小板减少性紫癜"
            },
            {
            "value": "5",
            "label": "继发性血小板减少性紫癜"
            },
            {
            "value": "6",
            "label": "淋巴瘤"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "416_radio_5_label",
            "code": null,
            "pid": 416,
            "label": "其他既往史",
            "data": {
            "type": "radio",
            "code": null,
            "name": "其他既往史",
            "label": "单选框组",
            "key": "radio_5",
            "formId": 416,
            "formGuid": "4cb1d08a3fff4dd8a8e3b5525b33adcd",
            "path": "radio_5.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "抗血小板药物使用史"
            },
            {
            "value": "2",
            "label": "抗凝药物使用史"
            },
            {
            "value": "3",
            "label": "他汀类药物使用史"
            },
            {
            "value": "4",
            "label": "中药制剂"
            },
            {
            "value": "5",
            "label": "腹透/血透史"
            },
            {
            "value": "6",
            "label": "颅脑既往手术病史"
            },
            {
            "value": "7",
            "label": "药物滥用史"
            },
            {
            "value": "8",
            "label": "服用可卡因"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "416_radio_6_label",
            "code": null,
            "pid": 416,
            "label": "吸烟史",
            "data": {
            "type": "radio",
            "code": null,
            "name": "吸烟史",
            "label": "单选框组",
            "key": "radio_6",
            "formId": 416,
            "formGuid": "4cb1d08a3fff4dd8a8e3b5525b33adcd",
            "path": "radio_6.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "是"
            },
            {
            "value": "2",
            "label": "否"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "416_radio_7_label",
            "code": null,
            "pid": 416,
            "label": "饮酒史",
            "data": {
            "type": "radio",
            "code": null,
            "name": "饮酒史",
            "label": "单选框组",
            "key": "radio_7",
            "formId": 416,
            "formGuid": "4cb1d08a3fff4dd8a8e3b5525b33adcd",
            "path": "radio_7.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "是"
            },
            {
            "value": "2",
            "label": "否"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "416_radio_8_label",
            "code": null,
            "pid": 416,
            "label": "肝脏",
            "data": {
            "type": "radio",
            "code": null,
            "name": "肝脏",
            "label": "单选框组",
            "key": "radio_8",
            "formId": 416,
            "formGuid": "4cb1d08a3fff4dd8a8e3b5525b33adcd",
            "path": "radio_8.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "肝硬化"
            },
            {
            "value": "2",
            "label": "病毒性肝炎"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "416_input_1",
            "code": null,
            "pid": 416,
            "label": "数量",
            "data": {
            "type": "input",
            "code": null,
            "name": "数量",
            "label": "单行文本",
            "key": "input_1",
            "formId": 416,
            "formGuid": "4cb1d08a3fff4dd8a8e3b5525b33adcd",
            "path": "input_1",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "416_input_3",
            "code": null,
            "pid": 416,
            "label": "数量",
            "data": {
            "type": "input",
            "code": null,
            "name": "数量",
            "label": "单行文本",
            "key": "input_3",
            "formId": 416,
            "formGuid": "4cb1d08a3fff4dd8a8e3b5525b33adcd",
            "path": "input_3",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "416_input_2",
            "code": null,
            "pid": 416,
            "label": "吸烟时间",
            "data": {
            "type": "input",
            "code": null,
            "name": "吸烟时间",
            "label": "单行文本",
            "key": "input_2",
            "formId": 416,
            "formGuid": "4cb1d08a3fff4dd8a8e3b5525b33adcd",
            "path": "input_2",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "416_input_4",
            "code": null,
            "pid": 416,
            "label": "饮酒时间",
            "data": {
            "type": "input",
            "code": null,
            "name": "饮酒时间",
            "label": "单行文本",
            "key": "input_4",
            "formId": 416,
            "formGuid": "4cb1d08a3fff4dd8a8e3b5525b33adcd",
            "path": "input_4",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "416_t_nation_1_nation",
            "code": null,
            "pid": 416,
            "label": "民族_民族",
            "data": {
            "type": "t_nation",
            "code": null,
            "name": "民族_民族",
            "label": "民族",
            "key": "t_nation_1_nation",
            "formId": 416,
            "formGuid": "4cb1d08a3fff4dd8a8e3b5525b33adcd",
            "path": "t_nation_1_nation",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "416_t_birthday_1_b",
            "code": null,
            "pid": 416,
            "label": "出生日期_出生日期",
            "data": {
            "type": "t_birthday",
            "code": null,
            "name": "出生日期_出生日期",
            "label": "出生日期",
            "key": "t_birthday_1_b",
            "formId": 416,
            "formGuid": "4cb1d08a3fff4dd8a8e3b5525b33adcd",
            "path": "t_birthday_1_b",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "416_t_bmi_1_h",
            "code": null,
            "pid": 416,
            "label": "BMI计算器_身高",
            "data": {
            "type": "t_bmi",
            "code": null,
            "name": "BMI计算器_身高",
            "label": "BMI计算器",
            "key": "t_bmi_1_h",
            "formId": 416,
            "formGuid": "4cb1d08a3fff4dd8a8e3b5525b33adcd",
            "path": "t_bmi_1_h",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "416_t_bmi_1_w",
            "code": null,
            "pid": 416,
            "label": "BMI计算器_体重",
            "data": {
            "type": "t_bmi",
            "code": null,
            "name": "BMI计算器_体重",
            "label": "BMI计算器",
            "key": "t_bmi_1_w",
            "formId": 416,
            "formGuid": "4cb1d08a3fff4dd8a8e3b5525b33adcd",
            "path": "t_bmi_1_w",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "416_t_bmi_1_bmi",
            "code": null,
            "pid": 416,
            "label": "BMI计算器_BMI",
            "data": {
            "type": "t_bmi",
            "code": null,
            "name": "BMI计算器_BMI",
            "label": "BMI计算器",
            "key": "t_bmi_1_bmi",
            "formId": 416,
            "formGuid": "4cb1d08a3fff4dd8a8e3b5525b33adcd",
            "path": "t_bmi_1_bmi",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "416_t_float_1_f",
            "code": null,
            "pid": 416,
            "label": "浮点数_浮点数",
            "data": {
            "type": "t_float",
            "code": null,
            "name": "浮点数_浮点数",
            "label": "浮点数",
            "key": "t_float_1_f",
            "formId": 416,
            "formGuid": "4cb1d08a3fff4dd8a8e3b5525b33adcd",
            "path": "t_float_1_f",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "416_groups_1_input_5",
            "code": null,
            "pid": 416,
            "label": "动态分组_啊啊啊",
            "data": {
            "type": "input",
            "code": null,
            "name": "动态分组_啊啊啊",
            "label": "单行文本",
            "key": "groups_1.input_5",
            "formId": 416,
            "formGuid": "4cb1d08a3fff4dd8a8e3b5525b33adcd",
            "path": "groups_1.input_5",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "416_groups_1_radio_9_label",
            "code": null,
            "pid": 416,
            "label": "动态分组_不不不",
            "data": {
            "type": "radio",
            "code": null,
            "name": "动态分组_不不不",
            "label": "单选框组",
            "key": "groups_1.radio_9",
            "formId": 416,
            "formGuid": "4cb1d08a3fff4dd8a8e3b5525b33adcd",
            "path": "groups_1.radio_9.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "是"
            },
            {
            "value": "2",
            "label": "否"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            }
            ]
            },
            {
            "id": 417,
            "code": null,
            "pid": 0,
            "label": "临床特征(脑出血项目)",
            "data": {
            "id": 417,
            "formName": "临床特征(脑出血项目)",
            "formGuid": "961c20971ba84aa7a70cd5f387140b2f",
            "metadata": "",
            "publish": 1,
            "version": "1628750297178",
            "createDate": "2021-08-12 14:38:17",
            "sort": 0
            },
            "children": [
            {
            "id": "417_radio_3_label",
            "code": null,
            "pid": 417,
            "label": "头晕",
            "data": {
            "type": "radio",
            "code": null,
            "name": "头晕",
            "label": "单选框组",
            "key": "radio_3",
            "formId": 417,
            "formGuid": "961c20971ba84aa7a70cd5f387140b2f",
            "path": "radio_3.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "是"
            },
            {
            "value": "2",
            "label": "否"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "417_radio_4_label",
            "code": null,
            "pid": 417,
            "label": "恶心",
            "data": {
            "type": "radio",
            "code": null,
            "name": "恶心",
            "label": "单选框组",
            "key": "radio_4",
            "formId": 417,
            "formGuid": "961c20971ba84aa7a70cd5f387140b2f",
            "path": "radio_4.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "是"
            },
            {
            "value": "2",
            "label": "否"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "417_radio_5_label",
            "code": null,
            "pid": 417,
            "label": "头痛",
            "data": {
            "type": "radio",
            "code": null,
            "name": "头痛",
            "label": "单选框组",
            "key": "radio_5",
            "formId": 417,
            "formGuid": "961c20971ba84aa7a70cd5f387140b2f",
            "path": "radio_5.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "是"
            },
            {
            "value": "2",
            "label": "否"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "417_radio_6_label",
            "code": null,
            "pid": 417,
            "label": "呕吐",
            "data": {
            "type": "radio",
            "code": null,
            "name": "呕吐",
            "label": "单选框组",
            "key": "radio_6",
            "formId": 417,
            "formGuid": "961c20971ba84aa7a70cd5f387140b2f",
            "path": "radio_6.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "是"
            },
            {
            "value": "2",
            "label": "否"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "417_radio_7_label",
            "code": null,
            "pid": 417,
            "label": "抽搐",
            "data": {
            "type": "radio",
            "code": null,
            "name": "抽搐",
            "label": "单选框组",
            "key": "radio_7",
            "formId": 417,
            "formGuid": "961c20971ba84aa7a70cd5f387140b2f",
            "path": "radio_7.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "是"
            },
            {
            "value": "2",
            "label": "否"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "417_radio_8_label",
            "code": null,
            "pid": 417,
            "label": "意识状态",
            "data": {
            "type": "radio",
            "code": null,
            "name": "意识状态",
            "label": "单选框组",
            "key": "radio_8",
            "formId": 417,
            "formGuid": "961c20971ba84aa7a70cd5f387140b2f",
            "path": "radio_8.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "是"
            },
            {
            "value": "2",
            "label": "否"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "417_radio_9_label",
            "code": null,
            "pid": 417,
            "label": "视力障碍",
            "data": {
            "type": "radio",
            "code": null,
            "name": "视力障碍",
            "label": "单选框组",
            "key": "radio_9",
            "formId": 417,
            "formGuid": "961c20971ba84aa7a70cd5f387140b2f",
            "path": "radio_9.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "是"
            },
            {
            "value": "2",
            "label": "否"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "417_radio_10_label",
            "code": null,
            "pid": 417,
            "label": "肢体麻木",
            "data": {
            "type": "radio",
            "code": null,
            "name": "肢体麻木",
            "label": "单选框组",
            "key": "radio_10",
            "formId": 417,
            "formGuid": "961c20971ba84aa7a70cd5f387140b2f",
            "path": "radio_10.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "是"
            },
            {
            "value": "2",
            "label": "否"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "417_radio_11_label",
            "code": null,
            "pid": 417,
            "label": "行走不稳",
            "data": {
            "type": "radio",
            "code": null,
            "name": "行走不稳",
            "label": "单选框组",
            "key": "radio_11",
            "formId": 417,
            "formGuid": "961c20971ba84aa7a70cd5f387140b2f",
            "path": "radio_11.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "是"
            },
            {
            "value": "2",
            "label": "否"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "417_radio_12_label",
            "code": null,
            "pid": 417,
            "label": "面瘫",
            "data": {
            "type": "radio",
            "code": null,
            "name": "面瘫",
            "label": "单选框组",
            "key": "radio_12",
            "formId": 417,
            "formGuid": "961c20971ba84aa7a70cd5f387140b2f",
            "path": "radio_12.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "是"
            },
            {
            "value": "2",
            "label": "否"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "417_radio_13_label",
            "code": null,
            "pid": 417,
            "label": "言语不利",
            "data": {
            "type": "radio",
            "code": null,
            "name": "言语不利",
            "label": "单选框组",
            "key": "radio_13",
            "formId": 417,
            "formGuid": "961c20971ba84aa7a70cd5f387140b2f",
            "path": "radio_13.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "是"
            },
            {
            "value": "2",
            "label": "否"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "417_radio_14_label",
            "code": null,
            "pid": 417,
            "label": "肢体不利",
            "data": {
            "type": "radio",
            "code": null,
            "name": "肢体不利",
            "label": "单选框组",
            "key": "radio_14",
            "formId": 417,
            "formGuid": "961c20971ba84aa7a70cd5f387140b2f",
            "path": "radio_14.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "是"
            },
            {
            "value": "2",
            "label": "否"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "417_textarea_1",
            "code": null,
            "pid": 417,
            "label": "其他症状",
            "data": {
            "type": "textarea",
            "code": null,
            "name": "其他症状",
            "label": "多行文本",
            "key": "textarea_1",
            "formId": 417,
            "formGuid": "961c20971ba84aa7a70cd5f387140b2f",
            "path": "textarea_1",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "417_input_3",
            "code": null,
            "pid": 417,
            "label": "发病时间",
            "data": {
            "type": "input",
            "code": null,
            "name": "发病时间",
            "label": "单行文本",
            "key": "input_3",
            "formId": 417,
            "formGuid": "961c20971ba84aa7a70cd5f387140b2f",
            "path": "input_3",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            }
            ]
            },
            {
            "id": 418,
            "code": null,
            "pid": 0,
            "label": "查体(脑出血项目)",
            "data": {
            "id": 418,
            "formName": "查体(脑出血项目)",
            "formGuid": "2b33877b58624787998972aca6779f30",
            "metadata": "",
            "publish": 1,
            "version": "1628750302576",
            "createDate": "2021-08-12 14:38:23",
            "sort": 0
            },
            "children": [
            {
            "id": "418_input_1",
            "code": null,
            "pid": 418,
            "label": "身高",
            "data": {
            "type": "input",
            "code": null,
            "name": "身高",
            "label": "单行文本",
            "key": "input_1",
            "formId": 418,
            "formGuid": "2b33877b58624787998972aca6779f30",
            "path": "input_1",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "418_input_3",
            "code": null,
            "pid": 418,
            "label": "体重",
            "data": {
            "type": "input",
            "code": null,
            "name": "体重",
            "label": "单行文本",
            "key": "input_3",
            "formId": 418,
            "formGuid": "2b33877b58624787998972aca6779f30",
            "path": "input_3",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "418_input_4",
            "code": null,
            "pid": 418,
            "label": "BMI",
            "data": {
            "type": "input",
            "code": null,
            "name": "BMI",
            "label": "单行文本",
            "key": "input_4",
            "formId": 418,
            "formGuid": "2b33877b58624787998972aca6779f30",
            "path": "input_4",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "418_input_5",
            "code": null,
            "pid": 418,
            "label": "体温",
            "data": {
            "type": "input",
            "code": null,
            "name": "体温",
            "label": "单行文本",
            "key": "input_5",
            "formId": 418,
            "formGuid": "2b33877b58624787998972aca6779f30",
            "path": "input_5",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "418_input_6",
            "code": null,
            "pid": 418,
            "label": "心率",
            "data": {
            "type": "input",
            "code": null,
            "name": "心率",
            "label": "单行文本",
            "key": "input_6",
            "formId": 418,
            "formGuid": "2b33877b58624787998972aca6779f30",
            "path": "input_6",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "418_input_7",
            "code": null,
            "pid": 418,
            "label": "血氧饱和度",
            "data": {
            "type": "input",
            "code": null,
            "name": "血氧饱和度",
            "label": "单行文本",
            "key": "input_7",
            "formId": 418,
            "formGuid": "2b33877b58624787998972aca6779f30",
            "path": "input_7",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "418_input_8",
            "code": null,
            "pid": 418,
            "label": "入院时间",
            "data": {
            "type": "input",
            "code": null,
            "name": "入院时间",
            "label": "单行文本",
            "key": "input_8",
            "formId": 418,
            "formGuid": "2b33877b58624787998972aca6779f30",
            "path": "input_8",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "418_radio_1_label",
            "code": null,
            "pid": 418,
            "label": "血压",
            "data": {
            "type": "radio",
            "code": null,
            "name": "血压",
            "label": "单选框组",
            "key": "radio_1",
            "formId": 418,
            "formGuid": "2b33877b58624787998972aca6779f30",
            "path": "radio_1.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "强化控制"
            },
            {
            "value": "2",
            "label": "标准控制"
            },
            {
            "value": "3",
            "label": "控制不佳"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "418_input_9",
            "code": null,
            "pid": 418,
            "label": "舒张压",
            "data": {
            "type": "input",
            "code": null,
            "name": "舒张压",
            "label": "单行文本",
            "key": "input_9",
            "formId": 418,
            "formGuid": "2b33877b58624787998972aca6779f30",
            "path": "input_9",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "418_input_10",
            "code": null,
            "pid": 418,
            "label": "收缩压",
            "data": {
            "type": "input",
            "code": null,
            "name": "收缩压",
            "label": "单行文本",
            "key": "input_10",
            "formId": 418,
            "formGuid": "2b33877b58624787998972aca6779f30",
            "path": "input_10",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "418_input_11",
            "code": null,
            "pid": 418,
            "label": "血压-检查时间",
            "data": {
            "type": "input",
            "code": null,
            "name": "血压-检查时间",
            "label": "单行文本",
            "key": "input_11",
            "formId": 418,
            "formGuid": "2b33877b58624787998972aca6779f30",
            "path": "input_11",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "418_input_12",
            "code": null,
            "pid": 418,
            "label": "GCS评分-总分",
            "data": {
            "type": "input",
            "code": null,
            "name": "GCS评分-总分",
            "label": "单行文本",
            "key": "input_12",
            "formId": 418,
            "formGuid": "2b33877b58624787998972aca6779f30",
            "path": "input_12",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "418_input_13",
            "code": null,
            "pid": 418,
            "label": "E",
            "data": {
            "type": "input",
            "code": null,
            "name": "E",
            "label": "单行文本",
            "key": "input_13",
            "formId": 418,
            "formGuid": "2b33877b58624787998972aca6779f30",
            "path": "input_13",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "418_input_14",
            "code": null,
            "pid": 418,
            "label": "V",
            "data": {
            "type": "input",
            "code": null,
            "name": "V",
            "label": "单行文本",
            "key": "input_14",
            "formId": 418,
            "formGuid": "2b33877b58624787998972aca6779f30",
            "path": "input_14",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "418_input_15",
            "code": null,
            "pid": 418,
            "label": "M",
            "data": {
            "type": "input",
            "code": null,
            "name": "M",
            "label": "单行文本",
            "key": "input_15",
            "formId": 418,
            "formGuid": "2b33877b58624787998972aca6779f30",
            "path": "input_15",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "418_input_16",
            "code": null,
            "pid": 418,
            "label": "GCS-检查时间",
            "data": {
            "type": "input",
            "code": null,
            "name": "GCS-检查时间",
            "label": "单行文本",
            "key": "input_16",
            "formId": 418,
            "formGuid": "2b33877b58624787998972aca6779f30",
            "path": "input_16",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            }
            ]
            },
            {
            "id": 419,
            "code": null,
            "pid": 0,
            "label": "随访(脑出血项目)",
            "data": {
            "id": 419,
            "formName": "随访(脑出血项目)",
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "metadata": "",
            "publish": 1,
            "version": "1628750310233",
            "createDate": "2021-08-12 14:38:30",
            "sort": 0
            },
            "children": [
            {
            "id": "419_date_1",
            "code": null,
            "pid": 419,
            "label": "随访时间",
            "data": {
            "type": "date",
            "code": null,
            "name": "随访时间",
            "label": "日期选择器",
            "key": "date_1",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "date_1",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_input_1",
            "code": null,
            "pid": 419,
            "label": "距离上次发病随访时间",
            "data": {
            "type": "input",
            "code": null,
            "name": "距离上次发病随访时间",
            "label": "单行文本",
            "key": "input_1",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "input_1",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_input_2",
            "code": null,
            "pid": 419,
            "label": "mRS评分",
            "data": {
            "type": "input",
            "code": null,
            "name": "mRS评分",
            "label": "单行文本",
            "key": "input_2",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "input_2",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_input_3",
            "code": null,
            "pid": 419,
            "label": "GOS评分",
            "data": {
            "type": "input",
            "code": null,
            "name": "GOS评分",
            "label": "单行文本",
            "key": "input_3",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "input_3",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_radio_1_label",
            "code": null,
            "pid": 419,
            "label": "生存结局",
            "data": {
            "type": "radio",
            "code": null,
            "name": "生存结局",
            "label": "单选框组",
            "key": "radio_1",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "radio_1.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "存活"
            },
            {
            "value": "2",
            "label": "死亡"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_radio_2_label",
            "code": null,
            "pid": 419,
            "label": "随访期间并发症",
            "data": {
            "type": "radio",
            "code": null,
            "name": "随访期间并发症",
            "label": "单选框组",
            "key": "radio_2",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "radio_2.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "无"
            },
            {
            "value": "2",
            "label": "新发脑梗"
            },
            {
            "value": "3",
            "label": "新发脑出血"
            },
            {
            "value": "4",
            "label": "继发性脑出血"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_date_3",
            "code": null,
            "pid": 419,
            "label": "随访时间",
            "data": {
            "type": "date",
            "code": null,
            "name": "随访时间",
            "label": "日期选择器",
            "key": "date_3",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "date_3",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_input_4",
            "code": null,
            "pid": 419,
            "label": "距离上次发病随访时间",
            "data": {
            "type": "input",
            "code": null,
            "name": "距离上次发病随访时间",
            "label": "单行文本",
            "key": "input_4",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "input_4",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_input_5",
            "code": null,
            "pid": 419,
            "label": "mRS评分",
            "data": {
            "type": "input",
            "code": null,
            "name": "mRS评分",
            "label": "单行文本",
            "key": "input_5",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "input_5",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_input_6",
            "code": null,
            "pid": 419,
            "label": "GOS评分",
            "data": {
            "type": "input",
            "code": null,
            "name": "GOS评分",
            "label": "单行文本",
            "key": "input_6",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "input_6",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_radio_3_label",
            "code": null,
            "pid": 419,
            "label": "生存结局",
            "data": {
            "type": "radio",
            "code": null,
            "name": "生存结局",
            "label": "单选框组",
            "key": "radio_3",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "radio_3.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "存活"
            },
            {
            "value": "2",
            "label": "死亡"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_radio_4_label",
            "code": null,
            "pid": 419,
            "label": "随访期间并发症",
            "data": {
            "type": "radio",
            "code": null,
            "name": "随访期间并发症",
            "label": "单选框组",
            "key": "radio_4",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "radio_4.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "无"
            },
            {
            "value": "2",
            "label": "新发脑梗"
            },
            {
            "value": "3",
            "label": "新发脑出血"
            },
            {
            "value": "4",
            "label": "继发性脑出血"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_date_4",
            "code": null,
            "pid": 419,
            "label": "随访时间",
            "data": {
            "type": "date",
            "code": null,
            "name": "随访时间",
            "label": "日期选择器",
            "key": "date_4",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "date_4",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_input_7",
            "code": null,
            "pid": 419,
            "label": "距离上次发病随访时间",
            "data": {
            "type": "input",
            "code": null,
            "name": "距离上次发病随访时间",
            "label": "单行文本",
            "key": "input_7",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "input_7",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_input_8",
            "code": null,
            "pid": 419,
            "label": "mRS评分",
            "data": {
            "type": "input",
            "code": null,
            "name": "mRS评分",
            "label": "单行文本",
            "key": "input_8",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "input_8",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_input_9",
            "code": null,
            "pid": 419,
            "label": "GOS评分",
            "data": {
            "type": "input",
            "code": null,
            "name": "GOS评分",
            "label": "单行文本",
            "key": "input_9",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "input_9",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_radio_5_label",
            "code": null,
            "pid": 419,
            "label": "生存结局",
            "data": {
            "type": "radio",
            "code": null,
            "name": "生存结局",
            "label": "单选框组",
            "key": "radio_5",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "radio_5.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "存活"
            },
            {
            "value": "2",
            "label": "死亡"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_radio_6_label",
            "code": null,
            "pid": 419,
            "label": "随访期间并发症",
            "data": {
            "type": "radio",
            "code": null,
            "name": "随访期间并发症",
            "label": "单选框组",
            "key": "radio_6",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "radio_6.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "无"
            },
            {
            "value": "2",
            "label": "新发脑梗"
            },
            {
            "value": "3",
            "label": "新发脑出血"
            },
            {
            "value": "4",
            "label": "继发性脑出血"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_date_5",
            "code": null,
            "pid": 419,
            "label": "随访时间",
            "data": {
            "type": "date",
            "code": null,
            "name": "随访时间",
            "label": "日期选择器",
            "key": "date_5",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "date_5",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_input_10",
            "code": null,
            "pid": 419,
            "label": "距离上次发病随访时间",
            "data": {
            "type": "input",
            "code": null,
            "name": "距离上次发病随访时间",
            "label": "单行文本",
            "key": "input_10",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "input_10",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_input_11",
            "code": null,
            "pid": 419,
            "label": "mRS评分",
            "data": {
            "type": "input",
            "code": null,
            "name": "mRS评分",
            "label": "单行文本",
            "key": "input_11",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "input_11",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_input_12",
            "code": null,
            "pid": 419,
            "label": "GOS评分",
            "data": {
            "type": "input",
            "code": null,
            "name": "GOS评分",
            "label": "单行文本",
            "key": "input_12",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "input_12",
            "parent": null,
            "child": null,
            "options": null,
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_radio_7_label",
            "code": null,
            "pid": 419,
            "label": "生存结局",
            "data": {
            "type": "radio",
            "code": null,
            "name": "生存结局",
            "label": "单选框组",
            "key": "radio_7",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "radio_7.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "存活"
            },
            {
            "value": "2",
            "label": "死亡"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            },
            {
            "id": "419_radio_8_label",
            "code": null,
            "pid": 419,
            "label": "随访期间并发症",
            "data": {
            "type": "radio",
            "code": null,
            "name": "随访期间并发症",
            "label": "单选框组",
            "key": "radio_8",
            "formId": 419,
            "formGuid": "d4e76379653c46c5ad7ad4d7e4f154c2",
            "path": "radio_8.label",
            "parent": null,
            "child": null,
            "options": [
            {
            "value": "1",
            "label": "无"
            },
            {
            "value": "2",
            "label": "新发脑梗"
            },
            {
            "value": "3",
            "label": "新发脑出血"
            },
            {
            "value": "4",
            "label": "继发性脑出血"
            }
            ],
            "multiple": false,
            "hasOtherOption": false
            },
            "children": null
            }
            ]
            }
        ]
      }
    }
  },
  methods: {
    clickHandler_1() {
      console.log('校验必填-输出总的规则')
      const param = this.$refs.BringQueryBuilder.getRuleParams()
      console.log(param, '规则数据')
    },
    clickHandler_2() {
      this.$refs.BringQueryBuilder.resetRuleParams()
      console.log('重置组件校验规则')
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
