const width = window.innerWidth;
const height = window.innerHeight;

const observeWatermarkContainer = (targetNode) => {
    const cb = function (mutationList, observer) {
        for (const mutation of mutationList) {
            if (mutation.type === 'childList') {
                const { removedNodes = [] } = mutation;
                console.log(removedNodes);
                const node = Array.prototype.find.apply(removedNodes, [(node => node.id === 'page-watermark')])
                if (node) {
                    targetNode.innerHTML = '';
                    window.location.reload();
                }
            }
        }
    }
    const observer = new MutationObserver(cb);
    observer.observe(targetNode, {
        attributes: true,
        childList: true
    });
}

/**
 * 生成全局水印
 * @returns 水印容器
 */
const generateWatermarkContainer = () => {
    const body = document.querySelector('#watermark-body');
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style = `position: absolute; width: ${width}; height: ${height}; top: 0; left: 0; z-index: 1000; pointer-events: none;`;
    canvas.setAttribute('id', 'page-watermark');
    generateWatermark(canvas);
    body.appendChild(canvas);
    return canvas;
}

/**
 * 生成全局的水印
 * @param {HTMLCanvasElement} canvas 画布
 */
const generateWatermark = canvas => {
    const ctx = canvas.getContext('2d');
    ctx.font = '20px YaHei';
    ctx.fillStyle = "black";
    ctx.rotate(-45 * Math.PI / 180);

    for (let x = -width; x < 2 * width; x += 200) {
        for (y = -height; y < 2 * height; y += 100) {
            writeInfo(ctx, x, y);
        }
    }
}

/**
 * 绘制信息
 * @param {CanvasRenderingContext2D} ctx 绘制上下文
 * @param {number} x 水平偏移
 * @param {number} y 垂直偏移
 */
const writeInfo = (ctx, x, y) => {
    ctx.beginPath();

    ctx.fillText('贪婪的君子', x, y);

    ctx.closePath();
}