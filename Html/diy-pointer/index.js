canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let arrList = [];

const context = canvas.getContext("2d");
// 设置文本属性
context.fillStyle = "red";
context.font = "30px Arial";
context.fillText("Hello World!", 50, 50);

context.fillStyle = "rgba(255, 255, 255, 0)";

var op = 0;
canvas.addEventListener("mousemove", (e) => {
  arrList.push(new Circle(e.clientX, e.clientY));
  op = op + 0.005;
  document
    .getElementsByClassName("fontstyle")[0]
    .style.setProperty("opacity", op);
});

function Circle(x, y) {
  this.x = x;
  this.y = y;

  // - 创建一个随机的速度值
  this.vx = (Math.random() - 0.5) * 3;
  this.vy = (Math.random() - 0.5) * 3;

  // 颜色
  this.color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
    Math.random() * 256
  )},${Math.floor(Math.random() * 256)})`;
  console.log(this.color);

  // 透明度
  this.a = 1;
}

Circle.prototype = {
  // 画圆
  draw() {
    context.beginPath();
    context.fillStyle = this.color;
    context.globalAlpha = this.a;
    context.globalCompositeOperation = "lighter";
    context.arc(this.x, this.y, 30, 0, Math.PI * 2);
    context.fill();
    this.update();
  },
  // 运动
  update() {
    this.x += this.vx;
    this.y += this.vy;

    this.a *= 0.98;
  },
};

//- 渲染函数

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  arrList.forEach((circleData, index) => {
    circleData.draw();
    if (circleData.a < 0.05) {
      arrList.splice(index, 1);
    }
  });
  requestAnimationFrame(render);
}

render();

const styleList = [
  "--left: 20%; --hue: 0; --size: 20; --rate: 1; --delay: 1;",
  "--left: 50%; --hue: 120; --size: 15; --rate: 3; --delay: 3;",
  "--left: 70%; --hue: 240; --size: 12; --rate: 5; --delay: 5;",
  "--left: 35%; --hue: 0; --size: 18; --rate: 1; --delay: 1;",
  "--left: 50%; --hue: 120; --size: 21; --rate: 3; --delay: 3;",
  "--left: 89%; --hue: 240; --size: 22; --rate: 5; --delay: 5;",
  "--left: 94%; --hue: 57; --size: 38; --rate: 3; --delay: 5;",
  "--left: 90%; --hue: 124; --size: 36; --rate: 5; --delay: 7;",
  "--left: 46%; --hue: 228; --size: 24; --rate: 7; --delay: 10;",
  "--left: 59%; --hue: 196; --size: 20; --rate: 2; --delay: 8;",
  "--left: 62%; --hue: 225; --size: 24; --rate: 9; --delay: 9;",
  "--left: 16%; --hue: 190; --size: 18; --rate: 4; --delay: 5;",
  "--left: 67%; --hue: 105; --size: 28; --rate: 1; --delay: 10;",
  "--left: 23%; --hue: 64; --size: 16; --rate: 2; --delay: 4;",
  "--left: 84%; --hue: 287; --size: 30; --rate: 1; --delay: 10;",
  "--left: 87%; --hue: 191; --size: 34; --rate: 5; --delay: 0;",
  "--left: 77%; --hue: 313; --size: 24; --rate: 9; --delay: 7;",
  "--left: 6%; --hue: 178; --size: 38; --rate: 7; --delay: 2;",
  "--left: 20%; --hue: 184; --size: 30; --rate: 7; --delay: 6;",
  "--left: 24%; --hue: 79; --size: 18; --rate: 6; --delay: 2;",
  "--left: 78%; --hue: 167; --size: 20; --rate: 6; --delay: 7;",
  "--left: 2%; --hue: 321; --size: 25; --rate: 2; --delay: 4;",
  "--left: 83%; --hue: 9; --size: 39; --rate: 5; --delay: 1;",
  "--left: 10%; --hue: 257; --size: 49; --rate: 6; --delay: 1;",
  "--left: 96%; --hue: 346; --size: 38; --rate: 7; --delay: 0;",
  "--left: 60%; --hue: 117; --size:33; --rate: 4; --delay: 7;",
  "--left: 17%; --hue: 152; --size: 35; --rate: 9; --delay: 8;",
  "--left: 57%; --hue: 286; --size: 31; --rate: 5; --delay: 4;",
  "--left: 73%; --hue: 116; --size: 15; --rate: 5; --delay: 8;",
  "--left: 53%; --hue: 28; --size: 26; --rate: 1; --delay: 6;",
  "--left: 83%; --hue: 198; --size: 35; --rate: 9; --delay: 10;",
  "--left: 25%; --hue: 162; --size: 19; --rate: 6; --delay: 3;",
  "--left: 25%; --hue: 165; --size: 32; --rate: 1; --delay: 1;",
  "--left: 99%; --hue: 153; --size: 17; --rate: 3; --delay: 4;",
  "--left: 58%; --hue: 111; --size: 27; --rate: 2; --delay: 6;",
  "--left: 91%; --hue: 87; --size: 17; --rate: 9; --delay: 2;",
  "--left: 59%; --hue: 332; --size: 26; --rate: 9; --delay: 5;",
  "--left: 71%; --hue: 291; --size: 32; --rate: 2; --delay: 10;",
  "--left: 79%; --hue: 79; --size: 21; --rate: 9; --delay: 8;",
  "--left: 29%; --hue: 278; --size: 24; --rate: 2; --delay: 0;",
  "--left: 91%; --hue: 193; --size: 40; --rate: 3; --delay: 5;",
  "--left: 17%; --hue: 147; --size: 27; --rate: 6; --delay: 4;",
  "--left: 90%; --hue: 112; --size: 39; --rate: 4; --delay: 1;",
  "--left: 33%; --hue: 179; --size: 26; --rate: 9; --delay: 6;",
  "--left: 59%; --hue: 38; --size: 50; --rate: 6; --delay: 10;",
  "--left: 49%; --hue: 92; --size: 24; --rate: 3; --delay: 8;",
  "--left: 91%; --hue: 145; --size: 34; --rate: 1; --delay: 4;",
  "--left: 39%; --hue: 218; --size: 34; --rate: 3; --delay: 10;",
  "--left: 99%; --hue: 245; --size: 36; --rate: 8; --delay: 5;",
  "--left: 8%; --hue: 66; --size: 15; --rate: 6; --delay: 10;",
  "--left: 83%; --hue: 51; --size: 27; --rate: 7; --delay: 8;",
  "--left: 71%; --hue: 81; --size: 27; --rate: 3; --delay: 1;",
  "--left: 54%; --hue: 274; --size: 28; --rate: 1; --delay: 8;",
  "--left: 25%; --hue: 70; --size: 15; --rate: 6; --delay: 2;",
  "--left: 99%; --hue: 282; --size: 27; --rate: 6; --delay: 4;",
  "--left: 17%; --hue: 312; --size: 27; --rate: 8; --delay: 3;",
  "--left: 30%; --hue: 157; --size: 27; --rate: 1; --delay: 8;",
  "--left: 90%; --hue: 299; --size: 38; --rate: 6; --delay: 0;",
  "--left: 91%; --hue: 162; --size: 35; --rate: 5; --delay: 7;",
  "--left: 50%; --hue: 213; --size: 19; --rate: 5; --delay: 5;",
  "--left: 37%; --hue: 227; --size: 24; --rate: 7; --delay: 6;",
  "--left: 61%; --hue: 182; --size: 31; --rate: 9; --delay: 7;",
  "--left: 97%; --hue: 161; --size: 37; --rate: 1; --delay: 7;",
  "--left: 5%; --hue: 113; --size: 21; --rate: 4; --delay: 4;",
  "--left: 48%; --hue: 17; --size: 37; --rate: 2; --delay: 1;",
  "--left: 79%; --hue: 31; --size: 47; --rate: 9; --delay: 6;",
  "--left: 53%; --hue: 54; --size: 22; --rate: 5; --delay: 5;",
  "--left: 24%; --hue: 311; --size: 38; --rate: 9; --delay: 8;",
  "--left: 89%; --hue: 48; --size: 17; --rate: 4; --delay: 10;",
  "--left: 65%; --hue: 97; --size: 31; --rate: 3; --delay: 8;",
  "--left: 57%; --hue: 9; --size: 17; --rate: 6; --delay: 0;",
  "--left: 9%; --hue: 14; --size: 36; --rate: 4; --delay: 1;",
  "--left: 96%; --hue: 100; --size: 24; --rate: 8; --delay: 5;",
  "--left: 14%; --hue: 228; --size: 25; --rate: 7; --delay: 1;",
  "--left: 90%; --hue: 216; --size: 32; --rate: 7; --delay: 5;",
  "--left: 92%; --hue: 220; --size: 24; --rate: 5; --delay: 3;",
  "--left: 72%; --hue: 276; --size: 18; --rate: 8; --delay: 1;",
  "--left: 43%; --hue: 26; --size: 28; --rate: 4; --delay: 6;",
  "--left: 68%; --hue: 97; --size: 37; --rate: 5; --delay: 0;",
  "--left: 40%; --hue: 119; --size: 20; --rate: 6; --delay: 5;",
  "--left: 20%; --hue: 338; --size: 37; --rate: 6; --delay: 6;",
  "--left: 55%; --hue: 336; --size: 36; --rate: 2; --delay: 5;",
  "--left: 81%; --hue: 10; --size: 17; --rate: 2; --delay: 5;",
  "--left: 69%; --hue: 314; --size: 20; --rate: 10; --delay: 1;",
  "--left: 59%; --hue: 169; --size: 22; --rate: 7; --delay: 10;",
  "--left: 93%; --hue: 165; --size: 38; --rate: 7; --delay: 2;",
  "--left: 7%; --hue: 271; --size: 33; --rate: 1; --delay: 3;",
  "--left: 21%; --hue: 349; --size: 36; --rate: 8; --delay: 7;",
  "--left: 13%; --hue: 38; --size: 35; --rate: 2; --delay: 9;",
  "--left: 55%; --hue: 164; --size: 27; --rate: 9; --delay: 7;",
  "--left: 70%; --hue: 66; --size: 37; --rate: 5; --delay: 0;",
  "--left: 5%; --hue: 264; --size: 15; --rate: 4; --delay: 9;",
  "--left: 24%; --hue: 265; --size: 40; --rate: 7; --delay: 6;",
  "--left: 11%; --hue: 101; --size: 26; --rate: 4; --delay: 5;",
  "--left: 25%; --hue: 207; --size: 40; --rate: 3; --delay: 0;",
];

function loadStyle(style) {
  const el = document.createElement("div");
  const childEl = document.createElement("div");
  childEl.className = "handle";
  el.className = "balloon";
  el.style = style;
  el.append(childEl);
  document.body.appendChild(el);
}

var flag = false;

var interval = setInterval(listenToVariable, 1000);

function listenToVariable() {
  console.log("op 值现在是:", op);
  if (op >= 1) {
    clearInterval(interval);
    for (let item in styleList) {
      loadStyle(styleList[item]);
    }
  }
}
