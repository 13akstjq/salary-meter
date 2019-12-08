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
    salaryDate = salaryDateInput.value;
    preTexSalary = preTexSalaryInput.value;
    console.log(salaryDate, preTexSalary);
    setStoragePreTexSalary(preTexSalary);
    setStorageSalaryDate(salaryDate);
    optionContainer.classList.toggle("option__hide");
  }
};

optionIcon.addEventListener("click", optionShowToggle);
optionContainer.addEventListener("submit", optionSubmitHandler);
