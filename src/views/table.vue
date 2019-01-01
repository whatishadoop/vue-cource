<template>
  <div>
    <!-- <edit-table :columns="columns" v-model="tableData" @on-edit="handleEdit"></edit-table> -->
    <edit-table-mul :columns="columns" v-model="tableData"></edit-table-mul>
    <Button @click="turnTo">打开参数页</Button>
  </div>
</template>

<script>
import { getTableData } from '@/api/data'
import EditTable from '_c/edit-table'
import EditTableMul from '_c/edit-table-mul'
export default {
  components: {
    EditTable,
    EditTableMul
  },
  data () {
    return {
      tableData: [],
      columns: [
        { key: 'name', title: '姓名' },
        { key: 'age', title: '年龄', editable: true },
        { key: 'email', title: '邮箱', editable: true }
      ]
    }
  },
  methods: {
    handleEdit ({ row, index, column, newValue }) {
      console.log(row, index, column, newValue)
    },
    turnTo () {
      // 原始根据路由name对应tab下只能显示相同的内容是一对一的，添加路由参数的作用是为了解决同一个tab下，根据传入的参数不同，进一步扩展显示不同的内容，是一对多的
      let id = 'params' + (Math.random() * 100).toFixed(0)
      this.$router.push({    // 在table页测试传递参数，跳转到params路径对应的组件，传递随即生成的值id
        name: 'params',
        params: {
          id
        }
      })
    }
  },
  mounted () {
    getTableData().then(res => {
      this.tableData = res
    })
  }
}
</script>

<style>

</style>
