const isMainPage = document.querySelector(".main-page")
const serverURL = "http://localhost:5000/" //rbcoder12345.fvds.ru

if (isMainPage) {

  const elUserTemplate = document.querySelector(".user-template").content
  const elUsersCategorySectionAllist = document.querySelector(".category-section--all .users")
  const elUsersCategorySectionAll = document.querySelector(".category-section--all")
  const elUsersSearch = document.querySelector(".search-result .users")
  const elSearchResultSection = document.querySelector(".search-result")
  const elCategoriesList = document.querySelector(".categories")
  const elSearchResultCount = document.querySelector(".search-result__count")

  const elSearchFormInput = document.querySelector(".search__input")

  const createCard = (user) => {
    let userCardClone = elUserTemplate.cloneNode(true);
    userCardClone.querySelector(".users__link").href = `/user/${user.user_id}`;
    userCardClone.querySelector(".user__name").textContent = user.name;
    userCardClone.querySelector(".user__img").src = user.img_src || "/assets/images/avatar.png";
    // "/assets/images/noimage.png"
    userCardClone.querySelector(".user__job-title").textContent = user.job_title;
    userCardClone.querySelector(".user__category").textContent = user.cat_name;
    userCardClone.querySelector(".user__views-count").textContent = user.views_count;
    console.log(user);
    return userCardClone
  }

  let displayItems = (arr, list) => {
    list.innerHTML = "";
    let listFragment = document.createDocumentFragment();
    arr.forEach((category) => {
      listFragment.appendChild(createCard(category))
    })
    list.appendChild(listFragment)
  }

  const fetchUsersByCategory = async (id) => {
    const response = await fetch(`${serverURL}users/category/${id}`)
    const data = await response.json()
    return data.data
  }
  const fetchAllUsers = async (id) => {
    const response = await fetch(`${serverURL}users/all`)
    const data = await response.json()
    return data.data
  }

  const searchUsers = async (keyword) => {
    const response = await fetch(`${serverURL}users?search=${keyword}`)
    const data = await response.json()
    return data.data
  }

    ; (async () => {
      const users = await fetchAllUsers()
      displayItems(users, elUsersCategorySectionAllist)
    })()


  elSearchFormInput.addEventListener("input", async (evt) => {
    evt.preventDefault()
    console.log(elSearchFormInput.value);

    if (elSearchFormInput.value === "") {
      return elSearchResultSection.classList.add("close")
    }

    const result = await searchUsers(elSearchFormInput.value)

    elSearchResultSection.classList.remove("close")

    elSearchResultCount.textContent = result.length
    displayItems(result, elUsersSearch)

  })

  elCategoriesList.addEventListener("click", async evt => {
    if (evt.target.matches(".categories__link")) {

      if (evt.target.dataset.value === "0") {
        const users = await fetchAllUsers()
        displayItems(users, elUsersCategorySectionAllist)
      } else {
        const users = await fetchUsersByCategory(evt.target.dataset.value)
        displayItems(users, elUsersCategorySectionAllist)
      }

    }
  })

}

// header 
const elNavLogin = document.querySelector(".nav__item--login")
const elNavRegister = document.querySelector(".nav__item--register")
const elNavProfile = document.querySelector(".nav__item--profile")
const elNavLogout = document.querySelector(".nav__item--logout")
const elNavAddPost = document.querySelector(".nav__item--add")

// Modal
const elAddPostModal = document.querySelector(".modal.add-post")
const elAddPostModalError = document.querySelector(".add-post__form-error")

// Adding post
const elAddPostForm = document.querySelector(".add-post__form")
const elAddPostFormInput = document.querySelector(".add-post__form-input--title")
const elAddPostFormFile = document.querySelector(".add-post__form-input--file")

if (localStorage.getItem("token")) {
  elNavLogin.classList.add("close")
  elNavRegister.classList.add("close")
  elNavProfile.classList.remove("close")
  elNavLogout.classList.remove("close")
  elNavAddPost.classList.remove("close")
}

elAddPostForm.addEventListener("submit", async (evt) => {

  evt.preventDefault()

  const postText = elAddPostFormInput.value
  const postFile = elAddPostFormFile.files[0]

  let formData = new FormData();

  formData.append("title", postText);
  formData.append("image", postFile);

  const response = await fetch(`${serverURL}posts`, {
    method: "POST",
    headers: {
      "auth_token": localStorage.getItem("token")
    },
    body: formData
  })
  const data = await response.json()

  if (!data.success) {
    return elAddPostModalError.textContent = data.msg
  }

  elAddPostModal.classList.add("modal--close")
})

elNavAddPost.addEventListener("click", (evt) => {
  evt.preventDefault()

  elAddPostModal.classList.remove("modal--close")
})

elAddPostModal.addEventListener("click", (evt) => {
  console.log(evt.currentTarget === evt.target);
  if (evt.currentTarget === evt.target) {
    elAddPostModal.classList.add("modal--close");
  }

})


elNavLogout.addEventListener("click", (evt) => {
  evt.preventDefault()

  localStorage.clear()
  location.href = "/"
})

elNavProfile.addEventListener("click", (evt) => {
  evt.preventDefault()

  const userId = localStorage.getItem("userId")

  location.href = `/user/${userId}`
})
