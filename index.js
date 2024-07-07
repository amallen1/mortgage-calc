const radioOptionContainer = document.querySelectorAll(".radio-option");

radioOptionContainer.forEach((option) => {
  option.addEventListener("click", () => {
    const radioInput = option.querySelector('input[type="radio"]');
    radioInput.checked = true;
  });
});
