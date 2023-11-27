function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  
  resetForm();
  modal.style.display = "none";
}

// Form reset
function resetForm() {
  removeError(firstname);
  removeError(lastname);
  removeError(email);
  removeError(message);
  document.getElementById("form").reset();
}

// F O R M  E R R O R  H A N D L I N G  D I S P L A Y
function displayError(inputField, errorMessage) {
  // highlight field border in red and display error message
  // Retrieve input field's parent class (formData)
  const formControl = inputField.parentElement;
  // insert attributes to field's parent class
  formControl.dataset.error = errorMessage;
  formControl.dataset.errorVisible = "true";
}

function removeError(inputField) {
  // Remove error attributes from input field's parent class
  const formControl = inputField.parentElement;
  // delete attributes
  delete formControl.dataset.error;
  delete formControl.dataset.errorVisible;
}

// F O R M  V A L I D A T I O N
// Regex used in validation form fields
const regName =
  /^([a-zA-Zçêëöéè]{2,20})(([\s|\-]{1})([a-zA-Zçêëöéè]{2,20})?)?$/i;
// Accept composed firstname with - in between and multiple name with at at least 2 caracters and max 20
const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

let form = document.getElementById("form");
/* Retrieve input fields */
let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let email = document.getElementById("email");
let message = document.getElementById("message");

/* retrieve each field value */

let formValidatedData = {
  Firstname: "",
  Lastname: "",
  Email: "",
  Message: "",
};

function formValidationCheck() {
  let firstnameValue = firstname.value.trim();
  let lastnameValue = lastname.value.trim();
  let emailValue = email.value.trim();
  let messageValue = message.value;
  // Email validation
  if (!regName.test(firstnameValue)) {
    console.log("firstname: ", firstnameValue);
    errorMessage = "Veuillez entrer au moins 2 caractères et 20 au maximum.";
    displayError(firstname, errorMessage);
  } else {
    formValidatedData.Firstname = firstnameValue;
    removeError(firstname);
  }

  // Email validation
  if (!regName.test(lastnameValue)) {
    errorMessage = "Veuillez entrer au moins 2 caractères et 20 au maximum.";
    displayError(lastname, errorMessage);
  } else {
    formValidatedData.Lastname = lastnameValue;
    removeError(lastname);
  }

  // Email validation
  errorMessage = "Veuillez entrer une adressse email valide";
  if (!regEmail.test(emailValue)) {
    displayError(email, errorMessage);
  } else {
    formValidatedData.Email = emailValue;
    removeError(email);
  }

  // Message validation
  errorMessage = "Le message doit contenir au moins 30 caratères";
  if (messageValue == null || messageValue.length < 30) {
    displayError(message, errorMessage);
  } else {
    formValidatedData.Message = messageValue;
    removeError(message);
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  formValidationCheck();

  // Check if any error remains  /  If not, form is validated
  const formError = document.querySelectorAll(".formGroup[data-error]");
  if (formError.length > 0) {
    console.log("formGroup.length: ", formError.length);
    return false;
  } else {
    console.log("formGroup.length: ", formError.length);
    console.log("Validation...", formValidatedData);
    closeModal();
    resetForm();
  }
});

// M O D A L  K E Y B O A R D  H A N D L I N G
// Keyboard ESC to close contact modal if not fulfilled

let modalESC = document.querySelector("#contact_modal");
document.addEventListener("keydown", (e) => {  
  if (e.code === "Escape" && modalESC.style.display === "block") {
    console.log("event: ", e);
    resetForm();
    closeModal();
  }
  console.log("event: ", e);
  console.log("style: ", modalESC.style.display === "block")

});
