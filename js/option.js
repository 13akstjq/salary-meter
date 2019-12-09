const optionIcon = document.querySelector("#optionIcon");
const optionContainer = document.querySelector("#optionContainer");
const salaryDateInput = document.querySelector("#salaryDateInput");
const preTexSalaryInput = document.querySelector("#preTexSalaryInput");

// 설정 창 토글 메소드
const optionShowToggle = () => optionContainer.classList.toggle("option__hide");

// 설정 폼 제출 메소드
const optionSubmitHandler = e => {
  e.preventDefault();
  if (salaryDateInput.value && preTexSalaryInput.value) {
    if (meterInterval) stopMeter();
    salaryDate = salaryDateInput.value;
    preTexSalary = preTexSalaryInput.value;
    setStoragePreTexSalary(preTexSalary);
    setStorageSalaryDate(salaryDate);
    optionContainer.classList.toggle("option__hide");
    start(salaryDate, preTexSalary);
  }
};

optionIcon.addEventListener("click", optionShowToggle);
optionContainer.addEventListener("submit", optionSubmitHandler);
