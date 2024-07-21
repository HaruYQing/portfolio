/** @type {HTMLCanvasElement} */
const cvs = document.getElementById("myCanvas");
const cvsH = cvs.height;
const cvsW = cvs.width;
const ctx = cvs.getContext("2d");
const btnSlow = document.getElementById("btnSlow");
const btnNormal = document.getElementById("btnNormal");
const btnQuick = document.getElementById("btnQuick");

// 設定圓的半徑、起始位置
let circleX = 160;
let circleY = 60;
let r = 20;
// 設定圓圈移動變數
let xSpeed = 20;
let ySpeed = 20;
// 設定球拍起始位置、寬高
let racketX = 500;
let racketY = 500;
let racketW = 200;
let racketH = 10;
// 存放磚塊的倉庫
let brickArray = [];
// 打到磚塊的計數器
let count = 0;

// 產生磚塊的方式
class Brick {
  // 生產方式
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    // 存放方式
    brickArray.push(this);
    // 是否可見
    this.visible = true;
  }

  // 上架方式
  drawBrick() {
    ctx.fillStyle = "lightskyblue";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  // 被打到
  hitByBall(ballX, ballY) {
    return (
      ballX >= this.x - r &&
      ballX <= this.x + this.w + r &&
      ballY >= this.y - r &&
      ballY <= this.y + this.h + r
    );
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 實際製作磚塊
for (var i = 0; i < 10; i++) {
  new Brick(getRandom(0, 950), getRandom(0, 300));
}

// 移動球拍 => 偵測游標移動
cvs.addEventListener("mousemove", (e) => {
  racketX = e.clientX - racketW / 2;
});

function drawCircle() {
  // 打到磚塊
  brickArray.forEach((brick, index) => {
    // 讓球反彈
    if (brick.visible && brick.hitByBall(circleX, circleY)) {
      // 計算打到磚塊數量
      count++;
      // 讓磚塊消失
      brick.visible = false;
      // 從磚塊的上下撞擊
      if (circleY >= brick.y + brick.h || circleY <= brick.y) {
        ySpeed *= -1;
      }
      // 從磚塊的左右撞擊
      else if (circleX >= brick.x + brick.w || circleX <= brick.x) {
        xSpeed *= -1;
      }
      // 確認磚塊剩餘數量
      if (count == 10) {
        alert("遊戲結束");
        clearInterval(myGame);
      }
    }
  });

  // 遇到球拍反彈
  if (
    circleX >= racketX - r &&
    circleX <= racketX + racketW + r &&
    circleY >= racketY - r &&
    circleY <= racketY + racketH + r
  ) {
    if (ySpeed > 0) {
      circleY -= r * 2;
    } else {
      circleY += r * 2;
    }
    ySpeed *= -1;
  }

  // 遇到邊界反彈
  // 左右邊界
  if (circleX >= cvsW - r || circleX <= r) {
    xSpeed *= -1;
  }
  // 上下邊界
  if (circleY >= cvsH - r || circleY <= r) {
    ySpeed *= -1;
  }

  // 移動圓 => 改變圓心的座標
  circleX += xSpeed;
  circleY += ySpeed;

  // 更新背景
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cvsW, cvsH);

  // 畫磚塊
  brickArray.forEach((brick) => {
    brick.visible ? brick.drawBrick() : "";
  });

  // 畫球拍
  ctx.fillStyle = "yellow";
  ctx.fillRect(racketX, racketY, racketW, racketH);

  // 畫圓
  ctx.beginPath();
  ctx.arc(circleX, circleY, r, 0, 2 * Math.PI);
  // arc的 5個參數：x,y為圓心位置，radius為半徑，初始角度，終點角度
  ctx.stroke();
  ctx.fillStyle = "pink";
  ctx.fill();
}

let gameSpeed = 25;
let myGame;

function startGame() {
  clearInterval(myGame);
  myGame = setInterval(drawCircle, gameSpeed);
}

btnSlow.onclick = () => {
  gameSpeed = 50;
  startGame();
};

btnNormal.onclick = () => {
  gameSpeed = 25;
  startGame();
};

btnQuick.onclick = () => {
  gameSpeed = 15;
  startGame();
};

// 初始啟動遊戲
startGame();
