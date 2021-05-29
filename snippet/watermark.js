window.onload = () => {
    
    const container = generateWatermarkContainer();
    // 监听包含水印结点的容器
    observeWatermarkContainer(container.parentNode);

    const pic = document.querySelector('#pic');
    const parent = pic.parentNode;

    const canvasNode = document.createElement('canvas');
    const picWithWatermark = createImageWithWatermark(pic, canvasNode);
    pic.src = picWithWatermark;
    // 也可以生成新结点直接替换旧的结点，parent.replace(newNode, oldNode)。

}