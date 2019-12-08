// dom
const date = document.querySelector("#date");

// 변수
let salaryDate,
  preTexSalary,
  postTexSalary,
  monthSalary,
  insurance = [];

// 오늘 날짜를 셋팅하는 메소드
const settingDate = () => {
  const toDay = new Date();
  const year = toDay.getFullYear();
  const month = toDay.getMonth + 1;
  const date = (toDay.getDate() + "").padStart(2, 0);
  date.innerHTML = `${year}.${month}.${date}`;
};

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
        console.log(salaryDate, preTexSalary, "start");
      }
    });
  });
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

// 세전 연봉을 셋팅하는 메소드
const setSalary = salary => {
  preTexSalary = salary;
  postTexSalary = preTexSalary - calcTex(preTexSalary);
  monthSalary = postTexSalary / 12;
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
  if (preTexSalary && salaryDate) setSalary(preTexSalary);
};

// 월급미터기 초기화
init();
