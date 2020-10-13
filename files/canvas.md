# canvas
  * HTML5新特性。可用来绘制图形，创建动画
  * canvas 本身标签有两个属性，<width>,<height>。不要通过css设置canvas的宽高，会影响内容的缩放比例
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