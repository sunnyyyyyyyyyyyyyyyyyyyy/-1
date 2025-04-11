let points = [[-3, 5], [3, 7], [1, 5], [2, 4], [4, 3], [5, 2], [6, 2], [8, 4], [8, -1], [6, 0], [0, -3], [2, -6], [-2, -3], [-4, -2], [-5, -1], [-6, 1], [-6, 2]];
let shapes = [];
let bgMusic;
let amplitude;

function preload() {
  bgMusic = loadSound('sunset-beach-259654.mp3'); // 載入背景音樂
}

function setup() { //設定
  createCanvas(windowWidth, windowHeight); //建立畫布，畫布的寬為400，高為400
  bgMusic.loop(); // 背景音樂循環播放
  amplitude = new p5.Amplitude(); // 創建振幅分析器
  for (let i = 0; i < 100; i++) { // 將數量改為100
    shapes.push({
      x: random(width),
      y: random(height),
      dx: random(-2, 2),
      dy: random(-2, 2),
      size: random(0.5, 2), // 圖案的大小範圍從0.5到2
      color: color(random(255), random(255), random(255)) // 隨機顏色
    });
  }
}

function draw() { //畫圖
  background("#f5ebe0"); //改變背景顏色為f5ebe0 (米白色)
  stroke("#d6ccc2"); //線條顏色為d6ccc2 (淺灰色)
  strokeWeight(10); //線條粗細為10
  fill("#e3d5ca"); //填充顏色為e3d5ca (淺米色)

  let level = amplitude.getLevel(); // 獲取當前音樂的振幅
  let sizeFactor = map(level, 0, 1, 1, 2); // 將振幅映射到大小因子

  for (let shape of shapes) {
    shape.x += shape.dx * shape.size; // 根據大小調整速度
    shape.y += shape.dy * shape.size; // 根據大小調整速度

    if (shape.x < 0 || shape.x > width) shape.dx *= -1;
    if (shape.y < 0 || shape.y > height) shape.dy *= -1;

    push();
    translate(shape.x, shape.y);
    scale(shape.size * sizeFactor); // 根據大小和振幅縮放圖案
    fill(shape.color); // 使用隨機顏色填充
    beginShape();
    for (let point of points) {
      vertex(point[0] * 20, point[1] * 20); // 繪製頂點，放大座標
    }
    endShape(CLOSE); // 關閉形狀
    pop();
  }
}
