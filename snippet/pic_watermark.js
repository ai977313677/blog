/**
 * 创建带水印的图片
 * create image with watermark.
 * @param {HTMLImageElement} img 图片结点 - image element.
 * @param {HTMLCanvasElement} canvas canvas结点 - canvas element.
 * @returns 处理后的图片地址 - pic with watermark.
 */
const createImageWithWatermark = (img, canvas) => {
    const imgWidth = img.width;
    const imgHeight = img.height;
    canvas.width = imgWidth;
    canvas.height = imgHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
    ctx.font = '16px YaHei';
    ctx.fillStyle = 'black';
    ctx.fillText('Photo by Claudio Schwarz | @purzlbaum on Unsplash', 20, 20);

    const image = canvasToImage(canvas.toDataURL('image/jpg'));
    return canvas.toDataURL('image/jpg');
}

/**
 * canvas结点转换为img结点
 * convert canvas node to img node.
 * @param {string}} base64 图片base64 - pic's base64 code.
 * @returns 图片 - pic
 */
const canvasToImage = (base64) => {
    const image = new Image();
    image.crossOrigin = '';
    image.src = base64;
    return image;
}