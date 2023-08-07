const addFormBtn = document.getElementById("add-form-btn");
const closeFormBtn = document.getElementById("close-form-btn");
const formContainer = document.querySelector(".add-form");

const showForm = () => {
  formContainer.classList.add("show");
};

const hideForm = () => {
  formContainer.classList.remove("show");
};

addFormBtn.addEventListener("click", showForm);
closeFormBtn.addEventListener("click", hideForm);
