import "./style.css";

const formController = (() => {
  const email = document.querySelector("#email");
  const country = document.querySelector("#country");
  const zipCode = document.querySelector("#z-code");
  const password = document.querySelector("#password");
  const passwordConfirm = document.querySelector("#password-confirm");

  const showErrorBorder = (elem) => {
    elem.classList.remove("correct-border");
    elem.classList.add("error-border");
  };

  const showCorrectBorder = (elem) => {
    elem.classList.remove("error-border");
    elem.classList.add("correct-border");
  };

  const handleEmailValidity = () => {
    const errorMsgSpan = email.nextElementSibling;

    if (email.validity.valueMissing) {
      errorMsgSpan.innerText = "Please fill out this field";

      showErrorBorder(email);
    } else if (!email.validity.valid) {
      errorMsgSpan.innerText = "Please enter a valid email";

      showErrorBorder(email);
    } else {
      errorMsgSpan.innerText = "";

      showCorrectBorder(email);
    }
  };

  const handleCountryValidity = () => {
    const errorMsgSpan = country.nextElementSibling;
    const spaces = /\s/g;

    if (country.validity.valueMissing) {
      errorMsgSpan.innerText = "Please fill out this field";

      showErrorBorder(country);
    } else if (country.value.match(spaces)) {
      errorMsgSpan.innerText = "No spaces allowed";

      showErrorBorder(country);
    } else if (country.value.length < 2) {
      errorMsgSpan.innerText = "Country must be 2 characters long";

      showErrorBorder(country);
    } else {
      errorMsgSpan.innerText = "";

      showCorrectBorder(country);
    }
  };

  const handleZipCodeValidity = () => {
    const errorMsgSpan = zipCode.nextElementSibling;

    if (zipCode.validity.valueMissing) {
      errorMsgSpan.innerText = "Please fill out this field";

      showErrorBorder(zipCode);
    } else if (zipCode.validity.rangeUnderflow) {
      errorMsgSpan.innerText = "Zip code must be 5 numbers long";

      showErrorBorder(zipCode);
    } else if (zipCode.validity.rangeOverflow) {
      errorMsgSpan.innerText = "Zip code must not exceed 5 numbers";

      showErrorBorder(zipCode);
    } else {
      errorMsgSpan.innerText = "";

      showCorrectBorder(zipCode);
    }
  };

  const handlePasswordValidity = () => {
    const errorMsgSpan = password.nextElementSibling;
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const spaces = /\s/g;

    if (password.value.match(spaces)) {
      errorMsgSpan.innerText = "No spaces allowed";

      showErrorBorder(password);
    } else if (password.validity.valueMissing) {
      errorMsgSpan.innerText = "Please fill out this field";

      showErrorBorder(password);
    } else if (!password.value.match(lowerCaseLetters)) {
      errorMsgSpan.innerText = "Must contain at least one lowercase letter";

      showErrorBorder(password);
    } else if (!password.value.match(upperCaseLetters)) {
      errorMsgSpan.innerText = "Must contain at least one uppercase letter";

      showErrorBorder(password);
    } else if (!password.value.match(numbers)) {
      errorMsgSpan.innerText = "Must contain at least one number";

      showErrorBorder(password);
    } else if (password.value.length < 8) {
      errorMsgSpan.innerText = "Must be at least 8 characters long";

      showErrorBorder(password);
    } else {
      errorMsgSpan.innerText = "";

      showCorrectBorder(password);
    }
  };

  const handlePasswordConfirmValidity = () => {
    const errorMsgSpan = passwordConfirm.nextElementSibling;

    passwordConfirm.setCustomValidity("");

    if (
      passwordConfirm.validity.valueMissing ||
      passwordConfirm.value !== password.value
    ) {
      errorMsgSpan.innerText = "Passwords do not match";

      passwordConfirm.setCustomValidity("Passwords do not match");

      showErrorBorder(passwordConfirm);
    } else {
      errorMsgSpan.innerText = "";

      showCorrectBorder(passwordConfirm);
    }
  };

  return {
    handleEmailValidity,
    handleCountryValidity,
    handleZipCodeValidity,
    handlePasswordValidity,
    handlePasswordConfirmValidity,
  };
})();

const setupEventListeners = () => {
  const form = document.querySelector(".form");
  const email = document.querySelector("#email");
  const country = document.querySelector("#country");
  const zipCode = document.querySelector("#z-code");
  const password = document.querySelector("#password");
  const passwordConfirm = document.querySelector("#password-confirm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    formController.handleEmailValidity();
    formController.handleCountryValidity();
    formController.handleZipCodeValidity();
    formController.handlePasswordValidity();
    formController.handlePasswordConfirmValidity();

    const allValid = [email, country, zipCode, password, passwordConfirm].every(
      // eslint-disable-next-line no-shadow
      (e) => e.checkValidity()
    );

    // eslint-disable-next-line no-unused-expressions, no-alert
    allValid ? alert("Submitted!") : alert("Invalid fields found!");
  });
  email.addEventListener("input", formController.handleEmailValidity);
  country.addEventListener("input", formController.handleCountryValidity);
  zipCode.addEventListener("input", formController.handleZipCodeValidity);
  password.addEventListener("input", formController.handlePasswordValidity);
  passwordConfirm.addEventListener(
    "input",
    formController.handlePasswordConfirmValidity
  );
};

setupEventListeners();
