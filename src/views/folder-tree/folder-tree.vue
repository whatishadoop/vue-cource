<template>
  <div class="folder-wrapper">
    <!-- <Tree :data="folderTree" :render="renderFunc"></Tree> -->
    <!--beforeDelete 是回调函数，用于在js进行相关操作前，先向后台发送请求进行处理，避免前后台由于网络原因造成数据不一致情况-->
    <folder-tree
      :folder-list.sync="folderList"
      :file-list.sync="fileList"
      :folder-drop="folderDrop"
      :file-drop="fileDrop"
      :beforeDelete="beforeDelete"
    />
  </div>
</template>

<script>
import { getFolderList, getFileList } from '@/api/data'
import FolderTree from '_c/folder-tree'
export default {
  components: {
    FolderTree
  },
  data () {
    return {
      folderList: [],
      fileList: [],
      folderDrop: [
        {
          name: 'rename',
          title: '重命名'
        },
        {
          name: 'delete',
          title: '删除文件夹'
        }
      ],
      fileDrop: [
        {
          name: 'rename',
          title: '重命名'
        },
        {
          name: 'delete',
          title: '删除文件'
        }
      ]
    }
  },
  methods: {
    // 用定时器模拟向后台发送数据情况，将该函数传入子组件中
    beforeDelete () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let error = new Error('error')
          if (!error) {
            resolve()
          } else reject(error)
        }, 2000)
      })
    }
  },
  mounted () {
    // 使用promise特性，两个请求都返回后才进行回调处理
    Promise.all([getFolderList(), getFileList()]).then(res => {
      this.folderList = res[0]
      this.fileList = res[1]
    })
  }
}
</script>

<style lang="less">
.folder-wrapper{
  width: 300px;
}
</style>
