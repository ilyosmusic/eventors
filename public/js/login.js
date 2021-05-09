const elLoginForm = document.querySelector(".login__form")
const elLoginFormError = document.querySelector(".login__form-error")
const serverURL = "http://localhost:5000/" 


elLoginForm.addEventListener("submit", async (evt) => {
  evt.preventDefault()
  const passwordValue = elLoginForm.querySelector("#password").value
  const emailValue = elLoginForm.querySelector("#email").value

  const response = await fetch(`${serverURL}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: emailValue,
      password: passwordValue
    })
  })

  const data = await response.json()

  if (data.success) {

    localStorage.setItem("token", data.token)
    localStorage.setItem("userId", data.userId)
    location.href = "/"
  } else {
    elLoginFormError.textContent = data.msg
  }

})