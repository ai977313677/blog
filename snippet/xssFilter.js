const htmlText = '<div style="font-size: 18px; color: blue;" onclick="alert(1)">I\'m iron man! <span style="font-size: 12px: color: orange;">funny mud pee!</span><script>console.log("ni bei wo chui le:)");</script></div>';

const securityAttr = ['style', 'id']; // 通用的安全标签属性
const whiteList = {
    div: [...securityAttr, ''], // 定制每个标签的安全属性
    span: [...securityAttr, ''],
}; // 白名单

const domToString = dom => {
    const wrapper = document.createElement('div');
    if (dom.nodeName != '#document') {
        wrapper.appendChild(dom);
    } else {
        const children = dom.children;
        const len = children.length;
        for (let i = 0; i < len; i++) {
            wrapper.appendChild(children[i]);
        }
    }
    return wrapper.innerHTML;
}; // dom转string

const xssFilter = text => {
    if (!text) { return ; }
    const parser = new DOMParser();
    const dom = parsFer.parseFromString(text, 'text/xml'); // string转dom
    const dfs = root => {
        if (!root) { return ; }
        const children = root.children;
        const len = children.length;
        for (let i = 0; i < len; i++) {
            const child = children[i];
            console.log(child.tagName);
            if (!whiteList[child.tagName]) {
                child.remove(); // 过滤白名单外的标签
            } else {
                const attrs = child.attributes;
                for (let attr of attrs) {
                    const isSecurity = whiteList[child.tagName].find(item => item === attr.name);
                    if (!isSecurity) {
                        child.removeAttribute(attr.name); // 过滤不安全的属性
                    }
                }
            }
            dfs(child);
        }
    }
    dfs(dom);
    return domToString(dom);
}
const securityText = xssFilter(htmlText);
