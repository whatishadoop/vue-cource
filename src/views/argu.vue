<template>
  <div>
    {{ id }}
  </div>
</template>

<script>
export default {
  props: {
    id: {   // 路由动态传入参数通过props接收解耦，另外路由传参也可以通过$router.params.id来获取耦合度较高
      type: String,
      default: 'lison'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // console.log(vm)
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log(to.name, from.name)
    next()
  }
}
</script>
