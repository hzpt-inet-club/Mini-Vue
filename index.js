function createApp (rootComponent) {
    return {
        mount (selector) {
            const container = document.querySelector(selector)
            let isMounted = false
            let oldVNode = null
            watchEffect(() => {
                if (!isMounted) {
                    oldVNode = rootComponent.render()
                    mount(oldVNode, container)
                    isMounted = true
                } else {
                    const newVNode = rootComponent.render()
                    patch(oldVNode, newVNode)
                    oldVNode = newVNode
                }
            })
        }
    }
}
