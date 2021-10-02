class Dep {
    constructor() {
        this.subscribers = new Set()
    }

    depend () {
        if (activeEffect) {
            this.subscribers.add(activeEffect)
        }
    }

    notify () {
        this.subscribers.forEach(effect => {
            effect()
        });
    }
}

let activeEffect = null
function watchEffect (effect) {
    activeEffect = effect
    effect() // 原始数据执行
    activeEffect = null
}

const targetMap = new WeakMap()
function getDep (target, key) {
    // 根据对象（target）取出对应的Map对象
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }

    // 取出具体的dep对象
    let dep = depsMap.get(key)
    if (!dep) {
        dep = new Dep()
        depsMap.set(key, dep)
    }
    return dep
}

// vue2对raw进行数据劫持
/* function reactive (raw) {
    Object.keys(raw).forEach(key => {
        const dep = getDep(raw, key)
        let value = raw[key]

        Object.defineProperty(raw, key, {
            get () {
                dep.depend()
                return value
            },
            set (newValue) {
                if (value !== newValue) {
                    value = newValue
                    dep.notify()
                }
            }
        })
    })
    return raw
} */

// vue3进行raw数据劫持
function reactive (raw) {
    return new Proxy(raw, {
        get (target, key) {
            const dep = getDep(target, key)
            dep.depend()
            return target[key]
        },
        set (target, key, newValue) {
            const dep = getDep(target, key)
            target[key] = newValue
            dep.notify()
        }

    })

}


