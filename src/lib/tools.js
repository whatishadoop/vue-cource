// 拿一个值与集合对比
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}

// 判断两个对象是否相等
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true  // 空对象表示没有参数传递
  else return !keysArr1.some(key => obj1[key] !== obj2[key])  // 数组的 some用法，有一条匹配返回true，都不匹配返回flase,有任何一个key不同则返回true,最后取反为false表示不相同， 对应的是every 有一个false就返回false, 都配置才返回true ,
}
