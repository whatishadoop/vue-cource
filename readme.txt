大数据量性能优化
1） 列表优化
在optimize.vue中引入vue-virtual-scroll-list 组件，30表示一个item列表像素，原始是只显示若部分数据，根据父高度以及条目高度计算，同chorme的element查看dom节点变化
 <virtual-list :size="30" :remain="6">
        <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </virtual-list>

 采用如下测试，渲染很慢，通过<virtual-list :size="30" :remain="10">优化
 <CheckboxGroup v-model="checkedArr">
       <virtual-list :size="30" :remain="10">
         <p v-for="item in list" :key="`check${item.value}`" style="height: 30px;">
           <Checkbox :label="item.value">
               <Icon type="logo-twitter"></Icon>
               <span>{{ item.label }}</span>
           </Checkbox>
         </p>
       </virtual-list>
     </CheckboxGroup>
2） 大型表单优化 form.vue
form-data.js 造表单数据，当页面表单项很多时，项表单中填入数据会很卡才会出现，选东西也会出现延迟选中现象，
因为表单中数据只要有一个发生变化，绑定在下面form-group组件上的数据从根节点都会重新渲染，非常耗时，通过chome的perfomermance进行分析， 录制操作过程，紫色为渲染过程，黄色为js执行过程，选择一段，排序显示这段中耗时比较长的js执行方法
 <div class="form-wrapper">
    <!-- <form-group :list="formList" :url="url"></form-group> -->

    采用新组件form-single.vue 每个表单对应一个form-single.vue 组件，类似分区作用，而不是都挂载在同一组件对象下
     <form-single
          ref="formSingle"
          v-for="(item, index) in formList"
          :key="`form_${index}`"
          :config="item"
          :value-data="valueData"
          :rule-data="ruleData"
          :error-store="errorStore"
        ></form-single>
3） 表格优化
使用vue-bigdata-table 插件，原理和下拉列表一样，每次只显示部分