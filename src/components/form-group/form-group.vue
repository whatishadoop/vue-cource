<template>
  <!--rules用于设置规则，限定form-item的输入校验规则，通过ref获取form组件方法然后获取该对象，调用其方法-->
  <Form ref="form" v-if="Object.keys(valueList).length" :label-width="labelWidth" :model="valueList" :rules="rules">
    <!--:error用于提示每个item的错误信息，该信息由后端传入-->
    <!--@click.native 表示使用原生的点击事件，若不加native,则该点击事件可能是调用子组件点击事件-->
    <FormItem
      v-for="(item, index) in list"
      :label="item.label"
      label-position="left"
      :prop="item.name"
      :error="errorStore[item.name]"
      :key="`${_uid}_${index}`"
      @click.native="handleFocus(item.name)"
    >
      <!--动态组件，里面is根据组件类型进行渲染，这里的组件值变量已经在全局注册直接使用即可，:item.range 用于向对应的组件类型中传入数据，与该属性无关的可以忽略-->
      <component :is="item.type" :range="item.range" v-model="valueList[item.name]">
        <template v-if="item.children">
          <!--动态组件component可以互相嵌套使用，label表示设置单选-->
          <component
            v-for="(child, i) in item.children.list"
            :is="item.children.type"
            :key="`${_uid}_${index}_${i}`"
            :label="child.label"
            :value="child.value">{{ child.title }}</component>
        </template>
      </component>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary">提交</Button>
      <Button @click="handleReset">重置</Button>
    </FormItem>
  </Form>
</template>

<script>
import clonedeep from 'clonedeep'
import { sentFormData } from '@/api/data'
export default {
  name: 'FormGroup',
  data () {
    return {
      initValueList: [],
      rules: {},  // 设置每个item的校验规则
      valueList: {},
      errorStore: {}
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    labelWidth: {
      type: Number,
      default: 100
    },
    url: {
      type: String,
      required: true
    }
  },
  watch: {
    list () {
      this.setInitValue()
    }
  },
  methods: {
    setInitValue () {
      let rules = {}
      let valueList = {}
      let initValueList = {}
      let errorStore = {}
      this.list.forEach(item => {
        rules[item.name] = item.rule
        valueList[item.name] = item.value
        initValueList[item.name] = item.value
        errorStore[item.name] = ''
      })
      this.rules = rules
      this.valueList = valueList
      this.initValueList = initValueList
      this.errorStore = errorStore
    },
    handleSubmit () {
      // 校验成功后，再可以执行提交按钮
      this.$refs.form.validate(valid => {
        if (valid) {
          sentFormData({
            url: this.url,
            data: this.valueList  // 表单键值对数据都被传输了，值可能是数组也是可以的
          }).then(res => {
            this.$emit('on-submit-success', res)
          }).catch(err => {
            this.$emit('on-submit-error', err)     //  返回的错误信息都封装在err.response.data中
            for (let key in err) {
              // 设置错误信息，用于在每个form-item下展现
              this.errorStore[key] = err[key]
            }
          })
        }
      })
    },
    handleReset () {  // 重置为初始状态，通过保留原始数据
      this.valueList = clonedeep(this.initValueList)
    },
    handleFocus (name) {  // 用于在初次显示报错信息后，该item再次获取焦点时，该ITEM错误信息自动消失
      this.errorStore[name] = ''
    }
  },
  mounted () {
    this.setInitValue()
  }
}
</script>

<style>

</style>
