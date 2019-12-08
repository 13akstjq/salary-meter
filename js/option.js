const optionIcon = document.querySelector("#optionIcon");
const optionContainer = document.querySelector("#optionContainer");

// option toggle func
const optionShowToggle = () => optionContainer.classList.toggle("option__hide");

optionIcon.addEventListener("click", optionShowToggle);
