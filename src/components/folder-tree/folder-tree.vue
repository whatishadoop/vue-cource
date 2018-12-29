<template>
  <Tree :data="folderTree" :render="renderFunc"></Tree>
</template>

<script>
import { putFileInFolder, transferFolderToTree, expandSpecifiedFolder } from '@/lib/util'
import clonedeep from 'clonedeep'
export default {
  name: 'FolderTree',
  data () {
    return {
      folderTree: [],
      currentRenamingId: '',
      currentRenamingContent: '',
      renderFunc: (h, { root, node, data }) => {
        const dropList = data.type === 'folder' ? this.folderDrop : this.fileDrop
        const dropdownRender = dropList.map(item => {
          return (<dropdownItem name={item.name}>{ item.title }</dropdownItem>)
        })
        // 记录处于重命名状态，此时点击其它菜单的下拉选项无效
        const isRenaming = this.currentRenamingId === `${data.type || 'file'}_${data.id}`
        return (
          <div class="tree-item">
            { data.type === 'folder' ? <icon type="ios-folder" color="#2d8cf0" style="margin-right: 10px;"/> : ''}
            {
              isRenaming
                ? <span>
                  <i-input value={data.title} on-input={this.handleInput} class="tree-rename-input"></i-input>
                  <i-button size="small" type="text" on-click={this.saveRename.bind(this, data)}><icon type="md-checkmark" /></i-button>
                  <i-button size="small" type="text"><icon type="md-close" /></i-button>
                </span>
                : <span>{ data.title }</span>
            }
            {
              dropList && !isRenaming ? <dropdown placement="right-start" on-on-click={this.handleDropdownClick.bind(this, data)}>   // 通过bind动态绑定参数，传入方法中
                <i-button size="small" type="text" class="tree-item-button">
                  <icon type="md-more" size={12}/>
                </i-button>
                <dropdownMenu slot="list">
                  { dropdownRender }
                </dropdownMenu>
              </dropdown> : ''
            }
          </div>
        )
      }
    }
  },
  props: {
    folderList: {
      type: Array,
      default: () => []
    },
    fileList: {
      type: Array,
      default: () => []
    },
    folderDrop: Array,
    fileDrop: Array,
    beforeDelete: Function  // 函数类型
  },
  watch: {
    folderList () {
      this.transData()
    },
    fileList () {
      this.transData()
    }
  },
  methods: {
    transData () {
      this.folderTree = transferFolderToTree(putFileInFolder(this.folderList, this.fileList))
    },
    isFolder (type) {
      return type === 'folder'
    },
    handleDelete (data) {
      const folderId = data.folder_id
      const isFolder = this.isFolder(data.type)
      let updateListName = isFolder ? 'folderList' : 'fileList'
      let list = isFolder ? clonedeep(this.folderList) : clonedeep(this.fileList)
      list = list.filter(item => item.id !== data.id)
      this.$emit(`update:${updateListName}`, list)  // $emit(update: xxxx)固定写法，与父组件中sync同步使用，用于子向父传递数据，等价于 $emit(`update:  与 父中设置on监听事件一样
      // 删除当前目录或文件节点后，继续展开删除节点对应的父节点，由于此时删除后还没渲染完毕，需要放在
      // nexttick中进行张开处理
      this.$nextTick(() => {
        expandSpecifiedFolder(this.folderTree, folderId)
      })
    },
    handleDropdownClick (data, name) {
      if (name === 'rename') {
        this.currentRenamingId = `${data.type || 'file'}_${data.id}`  //  若文件类型若没有值则用file，并且拼接data_id作为文件名选择标识
      } else if (name === 'delete') {
        this.$Modal.confirm({  // 弹出modal对话框，onOk设置确认按钮时使用，
          title: '提示',
          content: `您确定要删除${this.isFolder(data.type) ? '文件夹' : '文件'}《${data.title}》吗？`,
          onOk: () => {
            this.beforeDelete ? this.beforeDelete().then(() => {  // 此处若存在beforeDelete进行处理向后台发送数据请求，返回promise,成功2秒后才进行删除处理
              this.handleDelete(data)
            }).catch(() => {
              this.$Message.error('删除失败')  // 删除失败提示
            }) : this.handleDelete(data)  // 若没有传beforeDelete 则直接进行handle处理
          }
        })
      }
    },
    handleInput (value) {
      this.currentRenamingContent = value
    },
    updateList (list, id) {
      let i = -1
      let len = list.length
      while (++i < len) {
        let folderItem = list[i]
        if (folderItem.id === id) {
          folderItem.name = this.currentRenamingContent
          list.splice(i, 1, folderItem)
          break
        }
      }
      return list
    },
    saveRename (data) {   // 保存修改后的folder目录和文件的名称，先clone再发送给父类
      const id = data.id
      const type = data.type
      if (type === 'folder') {
        const list = this.updateList(clonedeep(this.folderList), id)
        this.$emit('update:folderList', list)
      } else {
        const list = this.updateList(this.fileList, id)
        this.$emit('update:fileList', list)
      }
      this.currentRenamingId = ''  // 将编辑状态时input隐藏，设置为显示状态
    }
  },
  mounted () {
    this.transData()
  }
}
</script>

<style lang="less">
.tree-item{
  display: inline-block;
  width: ~"calc(100% - 50px)";
  height: 30px;
  line-height: 30px;
  & > .ivu-dropdown{
    float: right;
  }
  ul.ivu-dropdown-menu{  /*通过提高选择器的权重来修改iview组件带来的样式影响*/
    padding-left: 0;
  }
  li.ivu-dropdown-item{ /*通过提高选择器的权重来修改iview组件带来的样式影响*/
    margin: 0;
    padding: 7px 16px;
  }
  .tree-rename-input{
    width: ~"calc(100% - 80px)";
  }
}
</style>
