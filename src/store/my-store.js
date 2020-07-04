let myVue
//实现Store类
class Store {
    constructor(options){
        
        //数据响应式的state
        this._vm = new myVue({
            data:{
                $$state:options.state
            },
            computed
        })

        //保存mutations
        this._mutations = options.mutations
        //保存actions
        this._actions = options.actions
        //保存getters
        this._getters = options.getters

        //绑定this到store实例
        const store = this;
        const {commit, dispatch} = store
        this.commit = function bundMutation(type, payload){
            return commit.call(store, type, payload)
        }
        this.dispatch = function bundDispatch(type, payload){
            return dispatch.call(store, type, payload)
        }

        this.getters = {}
        let computed = {}
        function saveFn(fn, state){
            return function(){
                return fn(state)
            }
        }
        const allGetters = Object.keys(this._getters)
        //遍历所有getters，值就是它的执行结果
        allGetters.forEach(key => {
            const fn = this._getters[key]
            //缓存
            computed[key] = saveFn(fn, store.state)
            //响应式数据
            Object.defineProperty(store.getters, key, {
                get: () => store._vm[key],
                enumerable: true,
            })
        })
        console.log(computed)

        store._vm = new myVue({
            data:{
                $$state:options.state
            },
            computed
        })

    }
    get state(){
        return this._vm._data.$$state
    }
    set state(v){
        throw('Please use replaceState to reset state')
    }
    commit(type, payload){
        const entry = this._mutations[type]

        if(!entry){
            throw('Unknown mutation type')
        }

        entry(this.state, payload)
    }
    dispatch(type, payload){
        const entry = this._actions[type]

        if(!entry){
            throw('Unknown action type')
        }
        //这里直接传Store实例，用户可能会使用结构式
        entry(this, payload)
    }
}
//实现插件
function install(Vue){
    //保存Vue
    myVue = Vue

    Vue.mixin({
        beforeCreate(){
            if(this.$options.store){
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default { Store, install }