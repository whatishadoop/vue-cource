1.vuex进阶-store插件----持久本地存储
a.定义插件saveInLocal.js，利用其回调函数进行处理

b. 在store/index.js中进行注册
export default new Vuex.Store({
  plugins: [ saveInLocal ]  //  注册插件
})
2.store下的严格模式：在严格模式下，不能直接修改state里面的值(this.$store.state.user.userName="newName")，需要在mutation提交中修改，否则会报错(虽然也会修改)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',   // 是否开启严格模式,process.env.NODE_ENV ==="devalopment"    ,在开发环境下是严格模式，否则不是
 })

3.v-model:如果绑定的属性不是组件data(){return{} }里面的属性，也是state里面的属性，就存在问题，因为state里面的属性时需要在mutation中修改。
   方法1：<input   :value="stateVal" @input="changeStateVal"/>
    ...mapMutations({"SET_STATE_VALUE"})
    changeStateVal(val){
        this.SET_STATE_VALUE(val)   //在mutations.js中设置：SET_STATE_VALUE(state,val){state.stateVal=val}     ,在state.js中设置stateVal:"abc"
    }
   方法2：<input   v-model="stateVal"/>  // 该属性值来自data,computer,props,其中computer监控的只来自data,state,props
    ...mapMutations({"SET_STATE_VALUE"})
    computed:{
        stateVal:{   //计算属性里stateVal是对象不是方法，有set()和get()方法
            get(){
                return this.$store.state.stateVal;
            },
            set(val){
                this.SET_STATE_VALUE(val)
            }
        }
    }