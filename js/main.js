// dom
const date = document.querySelector("#date");

// variables
let salaryDate,
  preTexSalary,
  postTexSalary,
  monthSalary,
  insurance = [];

const settingDate = () => {
  const toDay = new Date();
  const year = toDay.getFullYear();
  const month = toDay.getMonth + 1;
  const date = (toDay.getDate() + "").padStart(2, 0);
  date.innerHTML = `${year}.${month}.${date}`;
};

// chrome.storage.sync.set({ value: theValue }, function() {});

const getStorageData = () => {
  chrome.storage.sync.get("salaryDate", setSalaryDate);
};

const setSalaryDate = date => {
  salaryDate = date;
};

const setPreTexSalary = salary => {
  preTexSalary = salary;
  calcTex(preTexSalary);
};

const calcTex = preTexSalary => {
  const res = reduce((a, b) => a + b, [1, 2, 3, 4]);
  console.log(res);
};

const setInsurance = () => {
  insurance["pension"] = 0.045;
  insurance["health"] = 0.0323;
  insurance["care"] = 0.0851;
  insurance["salary"] = 0.03;
};

const init = () => {
  setInsurance();
  settingDate();
  setPreTexSalary(3400);
};

init();
