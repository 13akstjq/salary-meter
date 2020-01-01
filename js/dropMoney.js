// 상수
const COIN_UNIT = 10000;
const PAPER_UNIT = 1000;
const startX = 4;
const land = document.querySelector("#land");

let papers = [],
  coins = [],
  x = startX,
  y = 0,
  z = 0;
stack = [];

// 돈 갯수를 입력받아 해당 갯수만큼 돈을 만들어주는 메소드
const createMoneyDummy = cnt => {
  //   console.log(moneyType);
  //   coins.push(makeCoin());
  if (moneyType === "coin") {
    for (let i = 0; i < cnt; i++) {
      coins.push(makeCoin());
    }
  }
  //   if (moneyType === "paper") papers = Array(cnt).fill(makePaper());
};

// 지폐 만드는 함수
const makePaper = () => {
  const paper = document.createElement("div");
  paper.classList.add("paper");
  return paper;
};

// 떨어질 좌표를 담고 있는 동전 만드는 함수
const makeCoin = () => {
  const coin = document.createElement("div");
  coin.classList.add("coin");
  const coinTop = document.createElement("div");
  coinTop.classList.add("coin__top");
  const coinBottom = document.createElement("div");
  coinBottom.classList.add("coin__bottom");

  coin.appendChild(coinBottom);
  coin.appendChild(coinTop);

  coin.style.left = `${x}px`;
  coin.style.top = `${y}px`;
  calcNextPos();
  return coin;
};

// 돈이 떨어질 다음 좌표를 구하는 메소드
const calcNextPos = () => {
  // 다음 x가
  // let N = 300 - 12 * Math.floor(z / 3);
  // if (x + 25 < N - 12 + z * 3 + z) x += 25;
  // else {
  //   x = startX + 300 - N + 3 * z + z;
  //   y += 25;
  // }

  // if (y >= N - 12 + -z * 3) {
  //   z++;

  //   N = 300 - 12 * Math.floor(z / 3);
  //   y = -3 * z + 300 - N;
  //   x = startX + z * 3 + z + 300 - N;
  // }

  let N = 300;
  if (x + 25 < N + z * 3 + z) x += 25;
  else {
    x = startX + 3 * z + z;
    y += 25;
  }

  if (y >= N - 12 + -z * 3) {
    z++;

    y = -3 * z;
    x = startX + z * 3 + z;
  }
};

// cnt를 입력받아 해당 갯수만큼 동전을 떨어트리는 재귀함수
const dropByCount = cnt => {
  if (cnt == 0 || coins.length == 0) return;
  land.appendChild(coins.shift());
  dropByCount(cnt - 1);
};

// 현재 번 돈 드랍
const dropStart = () => {
  const dropInterval = setInterval(() => {
    dropByCount(10);
    if (coins.length == 0) clearInterval(dropInterval);
  }, 100);
};

// 변수를 초기화하는 메소드
const clearVariables = () => {
  coins = [];
  paper = [];
  x = 3;
  y = 0;
  z = 0;
};

// 현재 땅의 돈을 없애는 메소드
const clearLand = () => {
  land.innerHTML = "";
};

// 돈 떨어지는 애니메이션 초기화 함수
const moneyInit = (nowSalary, salaryPerSec) => {
  clearVariables();
  clearLand();
  let moneyUnit = moneyType === "coin" ? COIN_UNIT : PAPER_UNIT;
  let moneyCnt = Math.floor(nowSalary / moneyUnit);
  createMoneyDummy(moneyCnt);
  dropStart();
};
