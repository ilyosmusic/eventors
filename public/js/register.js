const elRegisterForm = document.querySelector(".register__form")
const elRegisterCategories = document.querySelector(".register__form-select")
const elRegisterFormError = document.querySelector(".register__form-error")
const elOptionTemplate = document.querySelector(".category-option-template").content

const serverURL = "http://localhost:5000/" //rbcoder12345.fvds.ru

const createCategoryOption = (category) => {
  let categoryOptionClone = elOptionTemplate.cloneNode(true);
  categoryOptionClone.querySelector(".register__form-category").textContent = category.name;
  categoryOptionClone.querySelector(".register__form-category").value = category.category_id;
  return categoryOptionClone
}

let displayCategories = (arr) => {
  elRegisterCategories.innerHTML = "";
  let elMovieListFragment = document.createDocumentFragment();
  arr.forEach((category) => {
    elMovieListFragment.appendChild(createCategoryOption(category))
  })
  elRegisterCategories.appendChild(elMovieListFragment)
}

const fetchCategories = async () => {
  const response = await fetch(`${serverURL}categories`)
  const data = await response.json()
  return data.data
}

  ; (async () => {
    const categories = await fetchCategories()
    displayCategories(categories)
  })()

elRegisterForm.addEventListener("submit", async (evt) => {
  evt.preventDefault()
  const nameValue = elRegisterForm.querySelector("#name").value
  const passwordValue = elRegisterForm.querySelector("#password").value
  const emailValue = elRegisterForm.querySelector("#email").value
  const jobTitleValue = elRegisterForm.querySelector("#jobTitle").value
  const categoryIdValue = elRegisterForm.querySelector("#categorId").value
  const phoneNumberValue = elRegisterForm.querySelector("#phoneNumber").value
  const bioValue = elRegisterForm.querySelector("#bio").value
  const imageValue = elRegisterForm.querySelector("#image").files[0]
  const locationValue = elRegisterForm.querySelector("#locationLink").value

  let formData = new FormData();

  formData.append("name", nameValue);
  formData.append("email", emailValue);
  formData.append("password", passwordValue);
  formData.append("jobTitle", jobTitleValue);
  formData.append("categoryId", categoryIdValue);
  formData.append("bio", bioValue);
  formData.append("phoneNumber", phoneNumberValue);
  formData.append("locationLink", locationValue);
  formData.append("image", imageValue);

  const response = await fetch(`${serverURL}register`, {
    method: "POST",
    body: formData
  })
  const data = await response.json()

  if (!data.success) {
    return elRegisterFormError.textContent = data.msg
  }

  localStorage.setItem("token", data.token)
  localStorage.setItem("userId", data.userId)
  location.href = "/"

})