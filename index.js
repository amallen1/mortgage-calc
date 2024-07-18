const form = document.getElementById("mortgage-form");
const clearBtn = document.getElementById("clear-btn");
const mortgageAmt = document.getElementById("mortgage-amt");
const mortgageTerm = document.getElementById("mortgage-term");
const interestRate = document.getElementById("interest-rate");
const radioGroup = document.getElementById("radio-group");
const monthlyRepaymentAmount = document.getElementById(
  "monthlyRepaymentAmount"
);
const totalRepaymentAmount = document.getElementById("totalRepaymentAmount");
const emptyResults = document.getElementById("empty-section");
const completedResults = document.getElementById("completed-section");

const formatCurrency = (amount) => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const calculateInterest = () => {
  const principal = parseInt(mortgageAmt.value);
  const term = parseInt(mortgageTerm.value) * 12;
  const rate = parseFloat(interestRate.value) / 100;

  const monthlyPayment = (rate * principal) / 12;
  const total = monthlyPayment * term;

  monthlyRepaymentAmount.innerHTML = formatCurrency(monthlyPayment);
  totalRepaymentAmount.innerHTML = formatCurrency(total);

  emptyResults.classList.add("hidden");
  completedResults.classList.add("show");
};

const calculateRepayment = () => {
  let principal = parseInt(mortgageAmt.value);
  let term = parseInt(mortgageTerm.value) * 12;
  let rate = parseFloat(interestRate.value) / 100 / 12;

  const monthlyPayment =
    principal *
    [(rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1)];

  const total = monthlyPayment * term;

  monthlyRepaymentAmount.innerHTML = formatCurrency(monthlyPayment);
  totalRepaymentAmount.innerHTML = formatCurrency(total);

  emptyResults.classList.add("hidden");
  completedResults.classList.add("show");
};

const removeError = (inputElement) => {
  inputElement.classList.remove("error");
  inputElement.previousElementSibling.classList.remove("error");
  inputElement.parentElement.nextElementSibling.classList.remove("show");
};

const showError = (inputElement) => {
  if (!inputElement.value) {
    inputElement.parentElement.nextElementSibling.innerHTML =
      "This field is required";
  } else {
    inputElement.parentElement.nextElementSibling.innerHTML =
      "Please enter a positive value";
  }

  inputElement.classList.add("error");
  inputElement.previousElementSibling.classList.add("error");
  inputElement.parentElement.nextElementSibling.classList.add("show");
};

const onSubmit = (e) => {
  e.preventDefault();
  let isValid = true;

  const mortgageType = document.querySelector(
    'input[name="mortgage-type"]:checked'
  );

  if (parseInt(mortgageAmt.value) <= 0 || !mortgageAmt.value) {
    showError(mortgageAmt);
    isValid = false;
  }

  if (parseInt(mortgageTerm.value) <= 0 || !mortgageTerm.value) {
    showError(mortgageTerm);
    isValid = false;
  }

  if (parseInt(interestRate.value) <= 0 || !interestRate.value) {
    showError(interestRate);
    isValid = false;
  }

  if (!mortgageType) {
    radioGroup.nextElementSibling.classList.add("show");
    isValid = false;
  }

  let formData = {
    mortgageAmt: mortgageAmt.value,
    mortgageTerm: mortgageTerm.value,
    interestRate: interestRate.value,
    mortgageType: mortgageType ? mortgageType.value : null,
  };

  if (isValid) {
    console.log("Form Data:", formData);

    if (mortgageType.value === "Repayment") {
      calculateRepayment();
    } else {
      calculateInterest();
    }
  }
};

clearBtn.addEventListener("click", () => {
  form.reset();
  emptyResults.classList.remove("hidden");
  completedResults.classList.remove("show");
  removeError(mortgageAmt);
  removeError(mortgageTerm);
  removeError(interestRate);
});

mortgageAmt.addEventListener("focus", () => {
  removeError(mortgageAmt);
});
mortgageTerm.addEventListener("focus", () => {
  removeError(mortgageTerm);
});
interestRate.addEventListener("focus", () => {
  removeError(interestRate);
});

radioGroup.addEventListener("click", (e) => {
  const target = e.target;
  const radioInput = target.querySelector('input[type="radio"]');
  if (radioInput) {
    radioInput.checked = true;
    radioGroup.classList.remove("error");
    radioGroup.nextElementSibling.classList.remove("show");
  }
});

form.addEventListener("submit", onSubmit);
