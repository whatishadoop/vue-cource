import Cookies from 'js-cookie'
import clonedeep from 'clonedeep'
import { doCustomTimes, objEqual } from './tools'

export const setTitle = (title) => {
  window.document.title = title || 'admin'
}

export const setToken = (token, tokenName = 'token') => {
  Cookies.set(tokenName, token)
}

export const getToken = (tokenName = 'token') => {
  return Cookies.get(tokenName)
}

export const putFileInFolder = (folderList, fileList) => {
  const folderListCloned = clonedeep(folderList)
  const fileListCloned = clonedeep(fileList)
  return folderListCloned.map(folderItem => {
    const folderId = folderItem.id
    let index = fileListCloned.length
    while (--index >= 0) {
      const fileItem = fileListCloned[index]
      if (fileItem.folder_id === folderId) {
        const file = fileListCloned.splice(index, 1)[0]
        file.title = file.name
        if (folderItem.children) folderItem.children.push(file)
        else folderItem.children = [file]
      }
    }
    folderItem.type = 'folder'
    return folderItem
  })
}

export const transferFolderToTree = folderList => {
  if (!folderList.length) return []
  const folderListCloned = clonedeep(folderList)
  const handle = id => {
    let arr = []
    folderListCloned.forEach(folder => {
      if (folder.folder_id === id) {
        const children = handle(folder.id)
        if (folder.children) folder.children = [].concat(folder.children, children)
        else folder.children = children
        folder.title = folder.name
        arr.push(folder)
      }
    })
    return arr
  }
  return handle(0)
}

export const expandSpecifiedFolder = (folderTree, id) => {
  return folderTree.map(item => {
    if (item.type === 'folder') {
      if (item.id === id) {
        item.expand = true
      } else {
        if (item.children && item.children.length) {
          item.children = expandSpecifiedFolder(item.children, id)
          if (item.children.some(child => {
            return child.expand === true
          })) {
            item.expand = true
          } else {
            item.expand = false
          }
        }
      }
    }
    return item
  })
}

export const downloadFile = ({ url, params }) => {
  const form = document.createElement('form')
  form.setAttribute('action', url)
  form.setAttribute('method', 'post')
  for (const key in params) {
    const input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', key)
    input.setAttribute('value', params[key])
    form.appendChild(input)
  }
  document.body.appendChild(form)
  form.submit()
  form.remove()
}

// 判断两个路由名称以及对应参数是否相同，query,params都是路由传递参数的不同方式
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return route1.name === route2.name && objEqual(params1, params2) && objEqual(query1, query2)
}

export const routeHasExist = (tabList, routeItem) => {
  let len = tabList.length
  let res = false
  doCustomTimes(len, (index) => {
    if (routeEqual(tabList[index], routeItem)) res = true
  })
  return res
}

const getKeyValueArr = obj => {
  let arr = []
  Object.entries(obj).sort((a, b) => {  // Object.entries(obj)获取param,query对象的键值转换为数组形式，并对该数组按如下规则排序后返回，根据键名字符串排序
    return a[0] - b[0]
  }).forEach(([ _key, _val ]) => {
    arr.push(_key, _val)  // 将键值对数组，转换为一维度数组返回
  })
  return arr
}

// 根据name + 参数名来决定不同的tab唯一名称
export const getTabNameByRoute = route => {
  const { name, params, query } = route
  let res = name
  // 若路由中传递的是params，按如下字符串拼接
  if (params && Object.keys(params).length) res += ':' + getKeyValueArr(params).join('_')
  // 若路由中传递的是query，按如下拼接
  if (query && Object.keys(query).length) res += '&' + getKeyValueArr(query).join('_')
  return res
}

// $a_111_b_222    [a,111,b,222]
const getObjBySplitStr = (id, splitStr) => {
  let splitArr = id.split(splitStr)
  let str = splitArr[splitArr.length - 1]
  let keyValArr = str.split('_')
  let res = {}  // 新建个对象用于组装路由对象信息
  let i = 0
  let len = keyValArr.length
  while (i < len) {
    res[keyValArr[i]] = keyValArr[i + 1]  // 组装对象
    i += 2  // 加2表示一对对进行遍历
  }
  return res
}

// 根据传入tab id字符串，进行解析组装成路由对象返回
export const getRouteById = id => {
  let res = {}
  // 转换为query对象参数
  if (id.includes('&')) {
    res.query = getObjBySplitStr(id, '&')
    id = id.split('&')[0]
  }
  // 转换为params对象参数
  if (id.includes(':')) {
    res.params = getObjBySplitStr(id, ':')
    id = id.split(':')[0]
  }
  res.name = id
  return res  // 返回一个对象
}

export const getOpenArrByName = (name, routerList) => {
  let arr = []
  routerList.some(item => {  // some遍历数组此时只要有一个满足条件，后面就不遍历了，节省时间，而for-each则会继续遍历
    if (item.name === name) {  // 先遍历路由父节点进行匹配
      arr.push(item.name)
      return true
    }
    if (item.children && item.children.length) { // 若父没有匹配，则继续对子路由继续进行匹配
      let childArr = getOpenArrByName(name, item.children)  // 递归调用
      if (childArr.length) {
        arr = arr.concat(item.name, childArr)  // 将 父节点名称和子菜单进行合并返回
        return true
      }
    }
  })
  return arr
}

// 保存tablist到本地
export const localSave = (name, value) => {
  localStorage.setItem(name, value)
}

export const localRead = (name) => {
  return localStorage.getItem(name)
}
