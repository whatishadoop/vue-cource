<template>
  <Table :columns="insideColumns" :data="value"></Table>
</template>

<script>
import clonedeep from 'clonedeep'
export default {
  name: 'EditTable',
  data () {
    return {
      insideColumns: [],    // 将处理后的insideColumns 配置属性传入子组件中
      edittingId: '',       // 保存编辑的单元格id
      edittingContent: ''   // 保存编辑的数据
    }
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    columns () {  // 监听colums中数据变化，进行重新渲染,哪行处于编辑模式
      this.handleColumns()
    }
  },
  methods: {
    handleClick ({ row, index, column }) {  // 用于设置编辑按钮处理逻辑，重新传会新修改数据覆盖父组件旧数据渲染进行渲染
      if (this.edittingId === `${column.key}_${index}`) {  // 根据行索引index + 列的键作为唯一id
        let tableData = clonedeep(this.value)   // 由于不能直接修改父类中传入数组数据，使用插件clonedeep 进行深度拷贝，下面进行编辑修改后通过事件方式重新返回给父组件，将修改数据重新渲染
        tableData[index][column.key] = this.edittingContent  //
        this.$emit('input', tableData)
        this.$emit('on-edit', { row, index, column, newValue: this.edittingContent })
        this.edittingId = ''
        this.edittingContent = ''
      } else {
        this.edittingId = `${column.key}_${index}`
      }
    },
    handleInput (newValue) {
      this.edittingContent = newValue
    },
    handleColumns () {
      const insideColumns = this.columns.map(item => {
        // 若没有设置render函数以及可以编辑则进行如下处理
        if (!item.render && item.editable) {
          // 实现render函数绑定事件，标签后传入子组件中进行扩展处理
          item.render = (h, { row, index, column }) => {  // 该参数由ivew table api中定义
            const isEditting = this.edittingId === `${column.key}_${index}`
            return (
              <div>
                {isEditting ? <i-input value={row[column.key]} style="width: 50px;" on-input={this.handleInput}></i-input> : <span>{row[column.key]}</span>}
                <i-button on-click={this.handleClick.bind(this, { row, index, column })}>{ isEditting ? '保存' : '编辑' }</i-button>  // 这里render函数中必须写i-button形式，原始为button
              </div>
            )
          }
          return item
        } else return item
      })
      this.insideColumns = insideColumns
    }
  },
  mounted () {
    this.handleColumns()  // 挂载完后进行渲染,我们不能直接修改父组件传递过来的数据，只能通过事件通知父组件方式进行
  }
}
</script>

<style>

</style>
