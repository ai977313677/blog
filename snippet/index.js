const demonstrate = () => {
    const pic = document.getElementById('original-pic');
    const width = pic.clientWidth;
    const height = pic.clientHeight;

    const canvas = document.createElement('canvas');
    canvas.id = 'result';
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(pic, 0, 0, width, height);
    const imgData = ctx.getImageData(0, 0, width, height);
    const [utilCanvas, afterCodeImg] = codeImage(imgData);
    const [resultCanvas] = decodeImage(afterCodeImg);

    const body = document.getElementById('body');
    body.appendChild(utilCanvas);
    body.appendChild(resultCanvas);
}

/**
 * 编码图片水印
 * @param {ImageData} imgData 图片原始信息
 * @returns 新的图片内容 - canvas容器, 图片数据
 */
const codeImage = (imgData) => {
    // 编码是4个元素一组，代表的含义是RGBA，A（Alpha）表示透明度的
    // 这里只在单通道写入加密信息
    const width = imgData.width;
    const height = imgData.height;
    const util = document.createElement('canvas');
    util.width = width;
    util.height = height;
    util.id = 'util';

    const ctx = util.getContext('2d');
    ctx.fillStyle = 'rgb(0, 0, 255)';
    for (let x = 0; x < width; x += 5*12) {
        for (let y = 0; y < height; y += 12) {
            ctx.fillText('贪婪的君子', x, y);
        }
    }
    // 水印信息
    const watermark = ctx.getImageData(0, 0, width, height);
    // 新的图片
    const newImgData = handleOriginalData(imgData);
    
    for (let i = 0; i < watermark.data.length; i++) {
        // 将水印信息写入新图片的R分量
        if (i % 4 === 2 && watermark.data[i] > 0) {
            newImgData.data[i] |= 0x00000001;
        }
    }
    // ctx.putImageData(watermark, 0, 0);
    ctx.putImageData(newImgData, 0, 0);
    return [util, newImgData];
}

/**
 * 处理原始图片
 * @param {ImageData} imgData 原始图片信息
 */
const handleOriginalData = (imgData) => {
    const { data } = imgData;
    for (let i = 0; i < data.length; i++) {
        // 只处理R通道
        // R分量的最后一位全部变为0
        data[i] &= 0xfffffffe;
    }
    return imgData;
}

/**
 * 解码图片水印
 * @param {Uint8ClampedArray} imgData 带水印的图片信息
 * @returns 图片水印
 */
const decodeImage = (imgData) => {
    const { data } = imgData;
    for(let i = 0; i < data.length; i++) {
        if (i % 4 === 2) {
            if (data[i] & 0x00000001 > 0) {
                data[i] = 255;
            } else {
                data[i] = 0;
            }
        } else if (i % 4 === 3) {
            continue;
        } else {
            data[i] = 0;
        }
    }
    const result = document.createElement('canvas');
    result.width = imgData.width;
    result.height = imgData.height;
    result.id = 'result';
    const ctx = result.getContext('2d');
    ctx.putImageData(imgData, 0, 0);
    return [result, imgData];
}