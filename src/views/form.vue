<template>
  <div class="form-wrapper">
    <!-- <form-group :list="formList" :url="url"></form-group> -->
    <!--提交，重置按钮优化后放在外面，需要操作每个form-single组件对象-->
    <Button @click="handleSubmit" type="primary">提交</Button>
    <Button @click="handleReset">重置</Button>
    <!--ref 用于获取组件对象，若放在普通标签上则获取该标签的dom对象，下面是放在循环中，返回是个数组对象，每个元素代表一个组件对象-->
    <form-single
      ref="formSingle"
      v-for="(item, index) in formList"
      :key="`form_${index}`"
      :config="item"
      :value-data="valueData"
      :rule-data="ruleData"
      :error-store="errorStore"
    ></form-single>
  </div>
</template>

<script>
import FormGroup from '_c/form-group'
import FormSingle from '_c/form-single'
import formData from '@/mock/response/form-data'
import clonedeep from 'clonedeep'
import { sentFormData } from '@/api/data'
export default {
  components: {
    FormGroup,
    FormSingle
  },
  data () {
    return {
      url: '/data/formData',
      formList: formData,
      valueData: {},
      ruleData: {},
      errorStore: {},
      initValueData: {}  // 保存一份初始值，用于reset操作
    }
  },
  methods: {
    handleSubmit () {
      let isValid = true
      // 对每个组件对象进行处理，依次调用每个single.form组件的校验方法，若都没问题，则可以进行提交
      this.$refs.formSingle.forEach(item => {
        item.validate(valid => {
          if (!valid) isValid = false
        })
      })
      if (isValid) {  // 上面每个single-form都校验位true后才执行表单提交操作
        sentFormData({
          url: this.url,
          data: this.valueData
        }).then(res => {
          this.$emit('on-submit-success', res)
        }).catch(err => {
          this.$emit('on-submit-error', err)
          for (let key in err) {
            this.errorStore[key] = err[key]
          }
        })
      }
    },
    handleReset () {
      this.valueData = clonedeep(this.initValueData)  // 每次通过深度clone拷贝一份原始数据进行重置，避免污染原始的初始数据
    }
  },
  mounted () {
    let valueData = {}
    let ruleData = {}
    let errorStore = {}
    let initValueData = {}
    formData.forEach(item => {
      valueData[item.name] = item.value
      ruleData[item.name] = item.rule
      errorStore[item.name] = ''
      initValueData[item.name] = item.value
    })
    this.valueData = valueData
    this.ruleData = ruleData
    this.errorStore = errorStore
    this.initValueData = initValueData  // 保存表单初始值默认值，比如多选初始选哪个等
  }
}
</script>

<style lang="less">
.form-wrapper{
  padding: 20px;
}
</style>
