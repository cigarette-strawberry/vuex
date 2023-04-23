let Vue = null
class Store {
  constructor(options) {
    // options {state:{}, getters:{}, mutations:{}, actions:{}}
    // state中的数据是响应式的
    const vm = new Vue({
      data: {
        state: options.state
      }
    }) // 把 state 放入vue实例中
    this.state = vm.state // this 是 当前类 Store

    this.getters = {}
    let getters = options.getters || {}
    Object.keys(getters).forEach(key => {
      // Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key].call(this, this.state, getters) // this 是 当前类 Store
        }
      })
    })

    this.mutations = {}
    let mutations = options.mutations || {}
    Object.keys(mutations).forEach(key => {
      this.mutations[key] = value => {
        mutations[key].call(this, this.state, value) // this 是 当前类 Store
      }
    })

    this.actions = {}
    let actions = options.actions || {}
    Object.keys(actions).forEach(key => {
      this.actions[key] = value => {
        actions[key].call(this, this, value) // this 是 当前类 Store
      }
    })
  }

  commit(key, value) {
    this.mutations[key](value) // this 是 当前类 Store
  }

  dispatch(key, value) {
    this.actions[key](value) // this 是 当前类 Store
  }
}

// install 方法调用时，会将 Vue 作为参数传入。
function install(_vue) {
  Vue = _vue
  // 全局注册一个混入，影响注册之后所有创建的每个 Vue 实例。
  Vue.mixin({
    beforeCreate() {
      // this 是 vue实例
      if (this.$options.store) {
        // 证明是个跟组件；
        this.$store = this.$options.store
      } else if (this.$parent) {
        this.$store = this.$parent.$store
      }
    }
  })
}

export function mapState(ary) {
  let obj = {}
  ary.forEach(key => {
    obj[key] = function () {
      return this.$store.state[key] // this 是 vue实例
    }
  })
  return obj
}

export function mapGetters(ary) {
  let obj = {}
  ary.forEach(key => {
    obj[key] = function () {
      return this.$store.getters[key] // this 是 vue实例
    }
  })
  return obj
}

export function mapMutations(ary) {
  let obj = {}
  ary.forEach(key => {
    obj[key] = function (value) {
      return this.$store.commit(key, value) // this 是 vue实例
    }
  })
}

export function mapActions(ary) {
  let obj = {}
  ary.forEach(key => {
    obj[key] = function (value) {
      return this.$store.dispatch(key, value) // this 是 vue实例
    }
  })
}

export default {
  Store,
  install
}
