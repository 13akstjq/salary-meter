// dom
const dateTime = document.querySelector("#date");
const salaryFront = document.querySelector("#salaryFront");
const meter = document.querySelector("#meter");
const meterContainer = document.querySelector("#meterContainer");
const mainForm = document.querySelector("#mainForm");
const mainSalaryDateInput = document.querySelector("#mainSalaryDateInput");
const mainPreTexSalaryInput = document.querySelector("#mainPreTexSalaryInput");

let meterInterval;
// 변수
let salaryDate,
  preTexSalary,
  postTexSalary,
  monthSalary,
  insurance = [],
  nowSalary,
  money,
  ms = 100,
  moneyType = "coin";

// 오늘 날짜를 가져오는 함수
const getToday = () => {
  const toDay = new Date();
  const year = toDay.getFullYear();
  const month = toDay.getMonth() + 1;
  const date = (toDay.getDate() + "").padStart(2, 0) / 1;
  return { toDay, year, month, date };
};

// 오늘 날짜를 셋팅하는 메소드
const settingDate = () => {
  const { year, month, date } = getToday();
  dateTime.innerHTML = `${year}.${(month + "").padStart(2, 0)}.${(
    date + ""
  ).padStart(2, 0)}`;
};

// 메인 폼 제출 이벤트
const mainFormSubmitHandler = e => {
  e.preventDefault();
  const mainPreTexSalary = mainPreTexSalaryInput.value;
  const mainSalaryDate = mainSalaryDateInput.value;
  console.log(mainPreTexSalary, mainSalaryDate);
  if (mainPreTexSalary && mainSalaryDate) {
    mainForm.classList.add("hide");
    meterContainer.classList.remove("hide");
    setStoragePreTexSalary(mainPreTexSalary);
    setStorageSalaryDate(mainSalaryDate);
    start(mainSalaryDate, mainPreTexSalary);
  }
};

mainForm.addEventListener("submit", mainFormSubmitHandler);

// 크롬 스토리지에 월급날짜 저장하는 메소드
const setStorageSalaryDate = salaryDate => {
  chrome.storage.sync.set({ salaryDate: salaryDate });
};

// 크롬 스토리지에 세전 연봉 저장하는 메소드
const setStoragePreTexSalary = preTexSalary => {
  chrome.storage.sync.set({ preTexSalary: preTexSalary });
};

// 크롬 스토리지의 값을 불러오는 메소드
const getStorageData = () => {
  chrome.storage.sync.get("salaryDate", ({ salaryDate }) => {
    if (salaryDate) salaryDateInput.value = salaryDate;
    chrome.storage.sync.get("preTexSalary", ({ preTexSalary }) => {
      if (preTexSalary) preTexSalaryInput.value = preTexSalary;

      if (salaryDate && preTexSalary) {
        start(salaryDate, preTexSalary);
        showMeter();
      } else {
        hideMeter();
      }
    });
  });
};

const toggleMainMeter = () => {};

const showMeter = () => {
  mainForm.classList.add("hide");
  meterContainer.classList.remove("hide");
};

const hideMeter = () => {
  mainForm.classList.remove("hide");
  meterContainer.classList.add("hide");
};

const toStringFormat = money => {
  money = money.split(".");
  money[0] = money[0].split(",").join("");
  money = money.join(".");
  return money;
};

const toMoneyFormat = money => {
  money = money.split(".");
  let front = money[0],
    len = front.length,
    res = money[0][len - 1];

  // console.log(money[0][len - 1]);
  for (let i = len - 2; i >= 0; i--) {
    if ((len - 1 - i) % 3 == 0) res = "," + res;
    res = money[0][i] + res;
  }
  money[0] = res;
  money = money.join(".");
  return money;
};
// 월급 날짜와 세전 연봉을 넣어주면 타이머를 시작시키는 메소드
const start = (salaryDate, preTexSalary) => {
  // 현재 번 돈 구하기
  const lastSalaryDate = calcLastSalaryDate(salaryDate),
    nextSalaryDate = calcNextSalaryDate(salaryDate),
    postTexMonthSalary = getPostTexSalary(preTexSalary) * 10000,
    totalTime = (nextSalaryDate.getTime() - lastSalaryDate.getTime()) / 1000,
    salaryPerSec = (postTexMonthSalary / totalTime).toFixed(2) / 1;

  nowSalary = getNowSalary(salaryPerSec, lastSalaryDate);
  moneyInit(nowSalary, salaryPerSec);
  money = toMoneyFormat(nowSalary.toFixed(2));

  money = money.split(".");
  salaryFront.innerHTML = money[0];
  salaryBack.innerHTML = ". " + money[1].padStart(2, 0);
  startMeter(salaryPerSec);
};

// 월급 증가
const increaseSalary = salaryPerSec => {
  nowSalary += salaryPerSec;
  money = toMoneyFormat(nowSalary.toFixed(2));
  money = money.split(".");
  salaryFront.innerHTML = money[0];
  salaryBack.innerHTML = ". " + money[1].padStart(2, 0);
};

// 미터기 시작
const startMeter = salaryPerSec => {
  meterInterval = setInterval(() => {
    if (ms == 0) increaseSalary(salaryPerSec);
    ms = ms <= 0 ? 100 : ms - 1;
    meter.innerHTML = ms;
  }, 10);
};

const stopMeter = () => clearInterval(meterInterval);

// 현재까지 번 돈 구하기
const getNowSalary = (salaryPerSec, lastSalaryDate) => {
  const toDay = new Date();
  return ((toDay.getTime() - lastSalaryDate.getTime()) / 1000) * salaryPerSec;
};

// 이전 월급 날짜 구하기
const calcLastSalaryDate = salaryDate => {
  const { year, month, date } = getToday();
  let lastYear = year,
    lastMonth;
  if (date < salaryDate) {
    lastMonth = month - 1;
    if (lastMonth == 0) {
      lastMonth = 12;
      lastYear = year - 1;
    }
  } else {
    lastMonth = month;
  }

  const lastSalaryDate = `${lastYear}-${lastMonth}-${salaryDate}`;
  return new Date(lastSalaryDate);
};

// 다음 월급 날짜 구하기
const calcNextSalaryDate = salaryDate => {
  const { year, month, date } = getToday();
  let nextYear = year,
    nextMonth;
  if (date >= salaryDate) {
    nextMonth = month + 1;
    if (nextMonth == 13) {
      nextMonth = 1;
      nextYear = year + 1;
    }
  } else {
    nextMonth = month;
  }

  const nextSalaryDate = `${nextYear}-${nextMonth}-${salaryDate}`;
  return new Date(nextSalaryDate);
};

// 크롬 스토리지 초기화 메소드
const clearStorage = () => {
  chrome.storage.sync.clear();
};
// clearStorage();

// 월급 날짜를 셋팅하는 메소드
const setSalaryDate = date => {
  salaryDate = date;
};

// 세전 연봉을 입력하면 세후 월급을 구해주는 메소드
const getPostTexSalary = preTexSalary => {
  return (preTexSalary - calcTex(preTexSalary)) / 12;
};

// 세금을 계산하는 메소드
const calcTex = preTexSalary => {
  let totalTex = 0;
  for (const a in insurance) {
    totalTex += preTexSalary * insurance[a];
  }

  return totalTex;
};

// 각 세금 퍼센트를 초기화하는 메소드
const setInsurance = () => {
  insurance["pension"] = 0.045;
  insurance["health"] = 0.0323;
  insurance["care"] = 0.00274;
  insurance["hire"] = 0.008;
  insurance["salary"] = 0.0225;
  insurance["regionSalary"] = 0.00225;
};

// 초기화 메소드
const init = () => {
  setInsurance();
  settingDate();
  getStorageData();

  // if (preTexSalary && salaryDate) setSalary(preTexSalary);
};

// 월급미터기 초기화
init();
