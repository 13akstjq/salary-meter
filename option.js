const optionIcon = document.querySelector("#optionIcon");
const optionContainer = document.querySelector("#optionContainer");

// option toggle func
const optionShowToggle = () => optionContainer.classList.toggle("option__show");

optionIcon.addEventListener("click", optionShowToggle);
