- props

  ```javascript
  props: {
      title: {
          // 默认属性
          default: '456',
          // 验证
          validator(val) {
              return val === 'a' || val === 'b';
          },
          type: String
      }
  }
  ```
  
- v-model

  ```javascript
  props: ['value'],
  this.$emit('input', false);
  
  // 事件名默认 input，使用 event 修改发出的事件名
  props: ['visible'],
  model: {
      prop: 'visible',
      event: 'close'
  },
  this.$emit('close', false);
  
- sync:
  
    ```javascript
    <Foo :visible.sync="isShow" :title.sync="titleValue" />
    
    props: ['visible', 'title'],
    this.$emit('update:visible', false);
    this.$emit('update:title', 'hello world');
    ```
    
- slot

  ```javascript
  v-slot --> #
  <template #two>想要插入的内容</>
      -->  <slot name="two"></slot>
  
  <Foo v-slot="data">{{data.count}}</>
      -->  <slot :count="countValue"></>
  ```

- directive

  ```javascript
  Vue.directive('名称', {
      // 初始化设置
      bind(el, binging) {
          el.focus();
      },
      // 被绑定元素插入父节点前
      inserted(el) {
          el.focus()
      }
  
      update
      componentUpdated
      unbind
  })
  ```

- vue/cli

  ```javascript
  npm i @vue/cli -g
  vue create [projectName]
  vue add @vue/eslint
  vue ui
  ```

- 测试

  ```javascript
  // jest
  npm i jest @types/jest -D
  
  describe('add', () => {
      // 写作 test / it
      it('1+1=2', () => {
          // 准备数据
          const a = 1, b = 1;
          // 触发动作
          const r = add(a, b);
  		// 验证
          expect(r).toBe(2);
          expect(r).toEqual(2);
          expect(r).not.toBe(2);
      })
  })
  
  // vue-test-unit
  vue add @vue/unit-jest
  // input
  // 1. props 2. click-event  3.slot
  // output
  // 1. event  2. render-view 3. function call -- axios
  
  // 1. 引入
  import {mount} from '@vue/test-utils';
  import TodoItem from '...';
  
  describe('TodoItem.vue', () => {
      it('input props && output render view', () => {
          const wrapper = mount(TodoItem, {
              propsData: {
                  todo: {
                  	content: '吃饭'
              	}
              }
          })
          expect(wrapper.text()).toContain('吃饭');
      })
  
      it('input click && output event', () => {
          const wrapper = mount(TodoItem);
          wrapper.get('#removeBtn').trigger('click');
          // remove 是绑定的事件名称
          expect(wrapper.emitted('remove')[0]).toEqual([1])
      })
  
      it('slot', () => {
          const wrapper = mount(TodoItem, {
              propsData: {},
              slots: {
                  default: 'xixi'
              }
          });
          expect(wrapper.text()).toContain('xixi');
      })
  })
  ```

- router

  ```javascript
  // 复用组件
  watch: {
      $route(){}
  }
  beforeRouteUpdate() {}
  // 路由传参
  1. this.$route.params;
  2. this.$route.query;
  3. props: true;
  	props(route) {
  		return { id: route.params.id }  
  	}
  接收：props: ['id'];
  // 嵌套路由： 以 / 开头
  ```

- 组件通信

  **父子通信**

  ```javascript
  // 1. props / $emit
  // 2. ref / $refs ---> 需要注册
  	<Child ref="child" />
  	this.$refs.child // 获取 Child 实例
  // 3. $parent / $children ---> children 位置会变动
  	this.$children[0].setName('111'); // 一个数组，存放着所有子组件，顺序从上到下
  	this.$parent.setTitile('child');  // 获取父组件实例
  ```
  **多层级组件通信以及非关系**

  ```javascript
  // 1. provide / inject
  // provide 对象形式
  provide: {
      title: 'hello' --> 不能有 this
  }
  // provide 函数形式
  provide() {
      return {
          title: 'hello',
          childA: this
      }
  }
  // inject 数组形式
  inject: ['title', 'childA'],
  // inject 对象形式
  from、default
  ```

  ```javascript
  // 2. $attrs / $listeners
    inheritAttrs: false // 使标签上不显示冗余内容
    $attrs: 
    // 包含了父作用域中不被 prop 识别的 attribute 绑定(class、style除外)
    // 当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件
    $listeners:
    // 包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器
    // 它可以通过 v-on="$listeners" 传入内部组件
  
    // 下游组件获取上游组件--->收集所有的子组件--->组件库中常用
    addChild(child) {
        this.echildren.push(child);
    }
  
  
    // 3. EventBud
    // 定义bus--->bus.js
    import Vue from 'vue';
    export const bus = new Vue();
  
    // 引入bus
    import {bus} from '..';
    bus.$on('lqf', this.callback);
    bus.$emit('lqf');
  ```

- Vuex

  ```javascript
  import Vuex from "vuex";
  import Vue from "vue";
  
  // 安装插件
  Vue.use(Vuex);
  
  // new store
  const store = new Vuex.Store({
    state: {
      age: 18,
      username: "xiaohong",
    },
    mutations: {
      // 都是同步的！！！
      changeAge(state, payload) {
        console.log(state);
        console.log(payload);
  
        setTimeout(() => {
          state.age = payload.age;
        }, 2000);
        // state.age = payload.age;
      },
      changeUsername(state, payload) {
        setTimeout(() => {
          state.age = payload.age;
        }, 5000);
        //   const { username } = payload;
        //   state.username = username;
      },
    },
  
    actions: {
      // 异步 都给我放到这里
      changeAge({ commit }, payload) {
        const { age } = payload;
        setTimeout(() => {
          //异步逻辑之后呢
          commit("changeAge", {
            age,
          });
        }, 2000);
      },
    },
  
    getters: {
      // 全局的计算属性
      tenYearsOld(state) {
        return state.age + 10;
      },
    },
  });
  export default store;
  
  ```
