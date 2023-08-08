// Variables

const addFormBtn = document.getElementById("add-form-btn");
const closeFormBtn = document.getElementById("close-form-btn");
const formContainer = document.querySelector(".add-form");
const main = document.querySelector("main");
const loader = document.querySelector(".loader");
const form = formContainer.querySelector("form");
const formName = form.querySelector("#name");
const formIngredient = form.querySelector("#ingredients");
const formProcedure = form.querySelector("#procedure");
const box = form.querySelector(".box");
const addIngredientIcon = form.querySelector(".input-div img");
const recipesDiv = document.querySelector(".recipes");
const recipeNumberSpan = document.querySelector(".recipe-number span");
const editContainer = document.querySelector(".edit-form");
const editCloseBtn = editContainer.querySelector(".close-form-btn");
const editForm = editContainer.querySelector("form");
const editFormName = editForm.querySelector(".name");
const editFormIngredient = editForm.querySelector(".ingredients");
const editFormProcedure = editForm.querySelector(".procedure-textarea");
const editBox = editForm.querySelector(".box");
const editIngredientIcon = editForm.querySelector(".input-div img");
const searchInput = document.querySelector(".search-bar input");

let localIngredients = [];
let ingredientsToEdit = [];
let editId;

// Primary functions

function addRecipe(e) {
  e.preventDefault();

  if (!localIngredients.length || !formName.value || !formProcedure.value) {
    alert("Please fill in all fields");
    return;
  }

  const obj = {
    id: crypto.randomUUID(),
    name: formName.value,
    ingredients: localIngredients,
    procedure: formProcedure.value,
  };

  let recipes = getRecipes();
  recipes = [obj, ...recipes];

  saveRecipes(recipes);

  formName.value = "";
  formProcedure.value = "";
  formIngredient.value = "";
  localIngredients = [];
  box.innerHTML = ``;

  updateUI();
  hideForm();
}

function editRecipe(e) {
  e.preventDefault();

  if (
    !ingredientsToEdit.length ||
    !editFormName.value ||
    !editFormProcedure.value
  ) {
    alert("Please fill in all fields");
    return;
  }

  let recipes = getRecipes();

  const updatedRecipes = recipes.map((recipe) => {
    if (recipe.id === editId) {
      return {
        ...recipe,
        name: editFormName.value,
        ingredients: ingredientsToEdit,
        procedure: editFormProcedure.value,
      };
    } else {
      return recipe;
    }
  });

  saveRecipes(updatedRecipes);

  editFormName.value = "";
  editFormProcedure.value = "";
  formIngredient.value = "";
  ingredientsToEdit = [];
  editBox.innerHTML = ``;
  editId = "";

  updateUI();
  hideEditForm();
}

// User Interface functions

function updateUI(data, string) {
  let recipes = getRecipes();
  let message = !string ? "You have no recipes" : string;

  recipesDiv.innerHTML = ``;
  recipeNumberSpan.textContent = recipes.length;

  if (data) {
    recipes = data;
  }

  if (recipes.length === 0) {
    recipesDiv.className = "recipes";
    recipesDiv.innerHTML = `<div class="centered">${message}</div>`;
    return;
  }

  recipes.forEach((recipe) => {
    recipesDiv.className = "recipes grid";

    const ingredientsList = recipe.ingredients
      .map((ingredient) => `<li>${ingredient.value}</li>`)
      .join("");

    const div = `<div class="recipe">
    <div class="recipe-header">
      <img src="./images/cutlery.png" alt="recipe" />
      <h3 class="name">${recipe.name}</h3>
    </div>
    <div class="recipe-body">
      <h5>Ingredients</h5>
      <ul>
        ${ingredientsList}
      </ul>
    </div>
    <div class="footer">
      <div class="actions">
        <img class="edit" data-id="${recipe.id}" src="./images/edit.svg" alt="edit" />
        <img class="delete" data-id="${recipe.id}" src="./images/trash.svg" alt="delete" />
      </div>
      <button>Procedure</button>
    </div>
  </div>`;

    recipesDiv.innerHTML += div;
  });
}

function hideForm() {
  loader.classList.add("show");
  formContainer.classList.remove("show");
  setTimeout(() => {
    main.style.display = "block";
    loader.classList.remove("show");
  }, 1500);
}

function showForm() {
  loader.classList.add("show");
  main.style.display = "none";
  setTimeout(() => {
    loader.classList.remove("show");
    formContainer.classList.add("show");
  }, 1500);
}

function showEditForm(id) {
  loader.classList.add("show");
  getRecipe(id);
  main.style.display = "none";
  setTimeout(() => {
    loader.classList.remove("show");

    editContainer.classList.add("show");
  }, 1500);
}

function hideEditForm() {
  loader.classList.add("show");
  editContainer.classList.remove("show");
  setTimeout(() => {
    main.style.display = "block";
    loader.classList.remove("show");
  }, 1500);
}

function showHideLoader() {
  loader.classList.add("show");
  main.style.display = "none";
  setTimeout(() => {
    main.style.display = "block";
    loader.classList.remove("show");
  }, 2000);
}

// Utils

function getRecipes() {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  return recipes;
}

function saveRecipes(recipes) {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function deleteRecipe(id) {
  const recipes = getRecipes();
  const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
  saveRecipes(updatedRecipes);
  updateUI();
}

function getRecipe(id) {
  const recipes = getRecipes();
  const recipe = recipes.find((recipe) => recipe.id === id);
  editFormName.value = recipe.name;
  editFormProcedure.value = recipe.procedure;
  editBox.innerHTML = ``;
  editId = id;

  ingredientsToEdit = recipe.ingredients;

  ingredientsToEdit.forEach((item) => {
    const para = `<p>
          <img class="delete" data-id="${item.id}" src="./images/trash.svg" />
          <span>${item.value}</span>
        </p>`;
    editBox.innerHTML += para;
  });
}

function updateIngredient() {
  box.innerHTML = ``;
  localIngredients.forEach((item) => {
    const para = `<p>
        <img class="delete" data-id="${item.id}" src="./images/trash.svg" />
        <span>${item.value}</span>
      </p>`;
    box.innerHTML += para;
  });
}

function updateEditIngredients() {
  editBox.innerHTML = ``;
  ingredientsToEdit.forEach((item) => {
    const para = `<p>
              <img class="delete" data-id="${item.id}" src="./images/trash.svg" />
              <span>${item.value}</span>
            </p>`;
    editBox.innerHTML += para;
  });
}

function deleteIngredient(id) {
  localIngredients = localIngredients.filter((item) => item.id !== id);
  updateIngredient();
}

function deleteEditIngredients(id) {
  ingredientsToEdit = ingredientsToEdit.filter((item) => item.id !== id);
  updateEditIngredients();
}

function addIngredients() {
  if (!formIngredient.value) return;

  const obj = {
    id: crypto.randomUUID(),
    value: formIngredient.value,
  };

  localIngredients = [obj, ...localIngredients];

  formIngredient.value = "";
  formIngredient.focus();
  updateIngredient();
}

function addToEditIngredients() {
  if (!editFormIngredient.value) return;

  const obj = {
    id: crypto.randomUUID(),
    value: editFormIngredient.value,
  };

  ingredientsToEdit = [obj, ...ingredientsToEdit];

  editFormIngredient.value = "";
  editFormIngredient.focus();
  updateEditIngredients();
}

function searchRecipes() {
  const recipes = getRecipes();

  if (!searchInput.value) {
    updateUI();
    return;
  }

  searchedRecipe = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  updateUI(searchedRecipe, "No recipe matched your search");
}

// Event Listeners

addFormBtn.addEventListener("click", showForm);
closeFormBtn.addEventListener("click", hideForm);

box.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG" && e.target.classList.contains("delete")) {
    const id = e.target.dataset.id;
    deleteIngredient(id);
  }
});

editBox.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG" && e.target.classList.contains("delete")) {
    const id = e.target.dataset.id;
    deleteEditIngredients(id);
  }
});

editCloseBtn.addEventListener("click", hideEditForm);

form.addEventListener("submit", addRecipe);
addIngredientIcon.addEventListener("click", () =>
  addIngredients(formIngredient, localIngredients)
);

editForm.addEventListener("submit", editRecipe);
editIngredientIcon.addEventListener("click", addToEditIngredients);

recipesDiv.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG" && e.target.classList.contains("delete")) {
    deleteRecipe(e.target.dataset.id);
    return;
  }

  if (e.target.tagName === "IMG" && e.target.classList.contains("edit")) {
    showEditForm(e.target.dataset.id);
    return;
  }
});

searchInput.addEventListener("input", searchRecipes);

window.addEventListener("load", () => {
  showHideLoader();
  updateUI();
});
