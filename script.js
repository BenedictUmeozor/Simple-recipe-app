const addFormBtn = document.getElementById("add-form-btn");
const closeFormBtn = document.getElementById("close-form-btn");
const formContainer = document.querySelector(".add-form");
const loader = document.querySelector(".loader");

const showForm = () => {
  loader.classList.add("show");
  setTimeout(() => {
    loader.classList.remove("show");
    formContainer.classList.add("show");
  }, 1500);
};

const hideForm = () => {
  loader.classList.add("show");
  formContainer.classList.remove("show");
  setTimeout(() => {
    loader.classList.remove("show");
  }, 1500);
};

addFormBtn.addEventListener("click", showForm);
closeFormBtn.addEventListener("click", hideForm);
