/* h函数 */
const h = (tag, props, children) => {
    // VNode -> javaScript对象 -> {}
    return {
        tag, props, children
    }
}

/* mount函数 */
const mount = (vnode, container) => {
    /* vnode -> element */
    // 1、创建真实的原生，并在vnode上保留el
    const el = vnode.el = document.createElement(vnode.tag);

    // 2、处理props
    if (vnode.props) {
        for (const key in vnode.props) {
            const value = vnode.props[key];
            if (key.startsWith('on')) {
                el.addEventListener(key.slice(2).toLocaleLowerCase(), value);
            } else {
                el.setAttribute(key, value);
            }
        }
    }

    // 3、处理children
    if (vnode.children) {
        if (typeof vnode.children === 'string') {
            el.textContent = vnode.children;
        } else {
            vnode.children.forEach(item => {
                mount(item, el);
            });
        }
    }

    // 4、将el挂载到container上
    container.appendChild(el);
}

/* patch函数 */
const patch = (n1, n2) => {
    if (n1.tag !== n2.tag) {
        const n1ElParent = n1.el.parentElement;
        n1ElParent.removeChild(n1.el); // 移除旧节点
        mount(n2, n1ElParent) // 挂载新节点
        console.log('patch');
    } else {

    }
}
