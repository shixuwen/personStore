# canvas
  * HTML5新特性。可用来绘制图形，创建动画
  * canvas 本身标签有两个属性，width,height。不要通过css设置canvas的宽高，会影响内容的缩放比例
```js
/**
  canvs本身只是创建了一个固定大小的画布，如需绘制，还要获取他的渲染上下文
  还需判断该浏览器是否兼容canvas
 */
const canvas = document.querySelector('.canvas')
if (canvas.getContext) {
  const ctx = canvas.getContext('2d')
}
```

## 绘制矩形

``` js
/** 
* @desc 绘制矩形
* @param x  绘制矩形的起点坐标
* @param y 绘制矩形的起点坐标
* @param width 绘制矩形的宽高
* @param height 绘制矩形的宽高
*/
ctx.fillRect(x, y, width, height)     // 填充矩形
ctx.strokeRect(x, y, width, height)   // 矩形边框
ctx.clearRect(x, y ,width, height)    // 清除指定的矩形区域，让清除部分完全透明

/** 
 * 边框像素渲染问题：canvas的线段渲染时占据上下两个像素各一半。
 * 解决方法：x，y的值向上浮动0.5
*/

ctx.fillStyle = '#000000'     // 设置图形的填充颜色，默认#000000
ctx.strokeStyle = '#000000'   // 设置图形的轮廓的颜色，默认#000000
ctx.lineWidth = 1             // 设置线段的粗细，属性值必须为正。

// 设定线段与线段接触的地方的样式 round： 圆角，bevel： 斜角，miter：直角（默认）
ctx.lineJoin = 'round' 
```

## 绘制路径
* canvas绘制路径，就是通过不同宽高长短的线段或者曲线连成的点的集合
例如：
``` js

// 首先要新建一条路径，相当于画画的时候，拿起画笔准备画画
ctx.beginPath()
// 然后移动到指定坐标，落下画笔
ctx.moveTo(100, 100)
// 然后从落下的点移动到指定的点，移动画笔
ctx.lineTo(100, 200)
ctx.lineTo(200, 200)
ctx.lineTo(100, 100) // 或者  ctx.closePath()
ctx.stroke() // 描边
ctx.fill() // 填充

```
* 必须在每一次画画的时候要写beiginPath()，不然会导致画笔不抬起来，后续的颜色填充等会视为一个路径容器


* 关于canavs的save(),restore()方法。
* save() 方法保存保存一些样式的值，类似storkeStyle，lineWith等
* restore() 方法会将上一个save或未save的样式恢复到上一个记录的样式

``` js
// 绘制路径的小demo(签名)
const canvas = document.querySelector('.canvas');
if (canvas.getContext) {
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  canvas.addEventListener('mousedown', function(e) {
    e = e || window.event;
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    document.onmousemove = function(e) {
      e = e || window.event;
      ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      ctx.stroke();
    }
    document.onmouseup = function(e) {
      e = e || window.event;
      document.onmousedown = document.onmousemove = null;
      if (document.releaseCapture) {
        document.releaseCapture();
      }
    }
  });
}
```

## 绘制曲线

```js

/** 
 * @desc 绘制圆
 * @param x， y  以x，y为圆心
 * @param radius radius是想要画的半径
 * @param startAngle, endAngle 开始的角度和结束的角度
 * @param anticlockwise 旋转的方式，默认为false，顺时针
*/
ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)

/** 
 * @desc 绘制圆弧 最起码要确定3个点。
 * @param x1， y1  第一个点
 * @param x2, y2 第二个点
 * @param radius 半径
*/
ctx.arcTo(x1, y1, x2, y2, radius)
// 例子 第一个点，第二个点
ctx.arcTo(50, 50, 100, 50, 50);
// 确定 第二个点到第三个点
ctx.arcTo(100, 50, 100, 100, 50);

ctx.stroke();


```

## 绘制贝塞尔曲线

* 二次贝塞尔曲线 

```js
/**
 * @desc 通过贝塞尔曲线的方法绘制曲线 需要一个开始的点。比如 moveTo(x,y)
 * @param cp1x, cp1y 为第二个控制点，意思是将要画的这条曲线会趋向这个控制点
 * @param x，y  为结束点
 */

ctx.beginPath()
ctx.moveTo(50, 50)
ctx.quadraticCurveTo(100, 50, 100, 100)
ctx.stroke()
```
* 三次贝塞尔曲线

```js
/**
 * @desc 通过贝塞尔曲线的方法绘制曲线 需要一个开始的点。比如 moveTo(x,y)
 * @param cp1x, cp1y 为第二个控制点，意思是将要画的这条曲线会趋向这个控制点
 * @param cp2x, cp2y 为第三个控制点，意思是将要画的这条曲线会趋向这个控制点
 * @param x，y  为结束点
 */

ctx.beginPath()
ctx.moveTo(50, 50)
ctx.bezierCurveTo(100, 50, 0, 300, 200, 200)
ctx.stroke()
```

## canvas 变换

### translate(x, y)
* 和css3的translate一样，以canvas的原点为基础，移动到指定位置。这个数字是累加的。

```js
ctx.translate(50, 50)
// 目前canvas的原点移动到了100， 100的位置
ctx.translate(50, 50)

```
* 由于canvas的translate效果是累加的，所以如果不想要这么效果，可以配合save(),restore()方法

### rotate(radian)
* 和css3的rotate一样，顺时针，传的值为弧度，同样是会累加的，与上面的translate一样

* deg = 180 * rad / Math.PI
* rad = deg * Math.PI / 180
```js
ctx.rotate(90 * Math.PI / 180)
```
### scale(x, y)

* scale 与上面的一样，x，y分别代表横轴与纵轴的缩放因子，比1大，放大，比1小缩放。
* 同样，在canvas中scale是累加的。
* css像素是一个虚拟抽象单位。
* 放大时，物理像素时没有变化的，canvas内css像素个体放大，总数变少。
* 缩小时，同理。

```js
ctx.scale(2, 2)
```

## canvas中图片使用

### 在canvas中插入图片

* drawImage(image, x, y, width, height)

```js
/** 
 * @desc canvas操作图片时，必须要等图片加载完才能操作。
 * @param image 图像源，是image对象 或者canvas对象
 * @param x， y  图片在canvas中开始绘制的起始坐标
 * @param width， height 图片的大小
*/
const image = new Image()
image.src = './image.png'
image.onload = () => {
  ctx.drawImage(image, 0, 0, 100, 100)
}

```

### 在canvas中设置背景

* createPattern (image, repetition)

```js
/** 
 * @desc canvas一般情况可将createPattern返回的值作为fillStyle的值
 * @param image 图像源，是image对象 或者canvas对象
 * @param repetition  可选值： repeat | repeat-x | repeat-y | no-repeat
*/
const image = new Image()
image.src = './image.png'
image.onload = () => {
  ctx.fillStyle = ctx.createPattern(image, 'repeat')
  ctx.fillRect(0, 0, 100, 100)
}

```

### 在canvas中使用渐变

* 线性渐变
* const gradient = createLinearGradient(x1, y1, x2, y2)
* gradient.addColorStop(position, color)

```js 
/** 
 * @desc createLinearGradient方法会返回一个值
 * @param position 0 - 1之间，表示渐变在canvas中对应的位置
 * @param color  色值
*/

const gradient = ctx.createLinearGradient(0, 0, 300, 200)
gradient.addColorStop(0, 'red')
gradient.addColorStop(.5, 'yellow')
gradient.addColorStop(1, 'green')
ctx.fillStyle = gradient
ctx.fillRect(0, 0, canvas.width, canvas.height)


```

* 径向渐变
* createRadialGradient(x1, y1, r1, x2, y2, r2)

```js 
/** 
 * @desc createRadialGradient方法会返回一个值
 * @param x1, y1 ,r1 表示在x1，y1的位置创建一个半径为r1的圆
 * @param x2, y2 ,r2 表示在x2，y2的位置创建一个半径为r2的圆
 * @param position 0 - 1之间，表示渐变在canvas中对应的位置
 * @param color  色值
*/

const gradient = ctx.createRadialGradient(150， 150， 50， 150， 150， 150)
gradient.addColorStop(0, 'red')
gradient.addColorStop(.5, 'yellow')
gradient.addColorStop(1, 'green')
ctx.fillStyle = gradient
ctx.fillRect(0, 0, canvas.width, canvas.height)


```

## canvas 绘制文本

* fillText(text, x, y)
* strokeText(text, x, y)

```js
// font = value 
//     默认字体是 '10px sans-serif'
//     这个字符串使用和 css font属性的语法相同
//     注意：font属性在指定时，必须要有字体大小 和 字体 缺一不可，并且只有sans-serif这种字体可用，写错了也默认使用sans-serif
// textAlign = value
//     设置文本水平对齐方式
//     文本对齐选项：
//         left: 文本左对齐
//         right: 文本右对齐
//         center: 文本居中对齐。
//             值得注意的是，这里的文本居中是基于你在fillText的时候所给x值，文本的一半在x位置的左边一半内容在右边
// textBaseline = value
//     设置文本基线的属性
//     top|middle|bottom
//         文本基线在文本块的顶部|中间|底部
        
// measureText: 返回TextMetrics对象，包含文本尺寸信息
ctx.font = '26px sans-serif'
ctx.textAlign = 'left'
ctx.fillText('hello world', 150, 150)
// 计算文本的宽度等信息
const textMetrics = ctx.measureText('hello world');

```

### 文本阴影 & 盒模型阴影
* shadowOffsetX = float 默认为0  阴影在x轴的延伸距离
* shadowOffsetY = float 默认为0  阴影在y轴的延伸距离
* shadowOffsetBlur = float 默认为0  阴影的模糊程度
* shadowOffsetColor = color（必传） 默认为全透明黑色

```js
ctx.font = '26px sans-serif';
ctx.shadowOffsetX = 3;
ctx.shadowOffsetY = 3;
ctx.shadowBlur = 0.5;
ctx.shadowColor = 'rgba(0, 0, 0, .6)';
ctx.fillText('hello world', 150, 150); 

```

## 像素操作

* getImageData() 获取一个含画布场景像素数据的imageData对象
* 注意： canvas的getImgeData()方法在chrome浏览器读取画布上指定区域的像素数据时，如果获取的是图片信息，图片需放到服务器上，不然会报跨域

``` js
/** 
 * @param sx 将要被提取的图形像素数据的左上角的x坐标
 * @param sy 将要被提取的图形像素数据的左上角的y坐标
 * @param sw 将要被提取的图形像素数据的width
 * @param sh 将要被提取的图形像素数据的height
*/
const imageData = ctx.getImageData(sx, sy, sw,sh)
/** 
 * @desc 以上方法会返回一个imgaeData对象
 * @param width 横向像素的个数
 * @param height 纵向像素的个数
 * @param data 一组像素的数组，包含rgba的信息
 *              [r: 0, g: 0, b: 0, a: 0, r: 0, g: 0, b: 0, a: 0, r: 0, g: 0, b: 0, a: 0]
*/

const imageData = ctx.getImageData(0, 0, 10, 10)
console.log(imageData.width) // 10
console.log(imageData.height) // 10
console.log(imageData.data) // [0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0 ...]
```
* putImageData() 修改画布对象位置的内容

```js 

  putImageData(myImageData, dx, dy)

  /**
   * @param myImageData 参数表示获取到需要变更的内容的对象
   * @param dx 参数表示在场景内左上角绘制的像素所得到的设备坐标
   * @param dy 参数表示在场景内左上角绘制的像素所得到的设备坐标
  */
  ctx.fillRect(0, 0, 50, 50); // 默认绘制的矩形是黑色
  const imageData = ctx.getImageData(0, 0, 50, 50); // 获取场景矩形的像素数据
  
  for (let i = 0; i < imageData.data.length; i++) {
    const r = i*4;
    const g = i*4 + 1;
    const b = i*4 + 2;
    const a = i*4 + 3;
    imageData.data[r] = 100; 
  }
  ctx.putImageData(imageData, 0, 0); // 修改了场景所有像素点G为100变成了酒红色

```

### example 马赛克

```js 
const canvas = document.querySelector('canvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    ctx.save();
    ctx.fillStyle = 'pink';

    ctx.beginPath();
    ctx.fillRect(0, 0, 100,100);

    ctx.restore();
    const image = new Image();
    image.src = './image.jpeg'; 
    image.onload = function() {
      canvas.width = image.width * 2;
      canvas.height = image.height; 
      draw();
    }

    function draw() {
      ctx.drawImage(image, 0, 0, image.width, image.height);
      const oldImageData = ctx.getImageData(0, 0, image.width, image.height);
      // 根据 oldImageData 数据的修改成
      let newImageData = ctx.createImageData(image.width, image.height);
      // 1. 选取马赛克矩形
      // 2. 从马赛克矩形中随机抽出一个像素点的信息(rgba)
      // 3. 将整个马赛克矩形中的像素点信息统一调成随机抽取的那个(2中的)
      const size = 5;
      for (let i = 0; i < oldImageData.width/size;i++) {
        // 列的马赛克矩形
        for (let j = 0; j < oldImageData.height/size;j++) {
          // (i, j) 每一个马赛克矩形的坐标
          /*
            (0, 0)  (0, 0) - (4, 4)    (1, 0)  (5, 0) - (9, 4)
            (0, 1)  (0, 5) - (4, 9)    (1, 1)  (5, 5) - (9, 9)
          */
         // Math.random ---> [0, 1)
         const color = getPXInfo(oldImageData, Math.floor(Math.random()*size + size*i), Math.floor(Math.random()*size + size*j));
         // 循环每一个马赛克矩形  将整个马赛克矩形中的像素点信息统一调成随机抽取的那个(2中的)
         for (let a = 0; a < size; a++) {
            for (let b = 0; b < size; b++) {
              newImageData = setPXInfo(newImageData, size * i + a, size * j + b, color);
            }
         }
        }
      }
      ctx.putImageData(newImageData, image.width, 0);
    }
  }

  // 给定偏移量拿像素点的信息
  function getPXInfo (imageData, x, y) {
    const color = [];
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const theFirst = (y * width) + x; // 当前像素前面有多少个像素点
    // r
    color[0] = data[theFirst * 4];
    // g
    color[1] = data[theFirst * 4 + 1];
    // b
    color[2] = data[theFirst * 4 + 2];
    //a
    color[3] = data[theFirst * 4 + 3];

    return color;
  }

  function setPXInfo (imageData, x, y, color) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const theFirst = (y * width) + x; // 当前像素前面有多少个像素点
    // r
    data[theFirst * 4] = color[0];
    // g
    data[theFirst * 4 + 1] = color[1];
    // b
    data[theFirst * 4 + 2] = color[2];
    //a
    data[theFirst * 4 + 3] = color[3];
    return imageData;
  }
```

## canvas的优化

* 尽量避免浮点数的坐标，以整数取代。 用Math.floor()取整

* 不要用drawImage时缩放图像。最好缓存好图片的不同尺寸，再用drawImage引用

* 当canvas场景复杂时，可用多层画布去渲染。即将整块画布，分成多块

* 当canvas模糊时，可根据dpr放大，缩小来调整像素清晰度
