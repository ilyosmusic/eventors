const Users = require("../model/Users")
const { JWT_KEY } = require("../config/config")
const { sign } = require("jsonwebtoken")
const path = require("path")
const slugify = require("slugify")
const Joi = require('joi');

// register function 
const register = async (req, res) => {
  try {
    const { body, files } = req

    const user = await Users.findOne({ email: body.email })

    if (user) {
      return res.status(400).json({ success: false, msg: "user already exist" })
    }

    else if (files) {
      const schema = Joi.object().keys({
        name: Joi.string().min(8).required(),
        categoryId: Joi.number().integer().required(),
        phoneNumber: Joi.string().length(13).required(),
        bio: Joi.string().min(16).required(),
        locationLink: Joi.string().required(),
        password: Joi.string().min(8).required(),
        email: Joi.string().email(),
        jobTitle: Joi.string().min(8)
      });

      const newUser = await schema.validateAsync(body);

      const imageName = `uploads/${Date.now()}-${slugify(files.image.name, { lower: true })}`
      await files.image.mv(path.join(__dirname, "../", imageName))

      newUser.imgSrc = imageName

      const user = await Users.create(newUser)
      const TOKEN = sign({ role: user.user_role, id: user.user_id }, JWT_KEY)

      return res.status(201).json({ success: true, msg: "successfuly", token: TOKEN, userId: user.user_id })
    }
    
    res.status(400).json({ success: false, msg: "Please put avatar image" })

  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message })
  }
}
// login function
const login = async (req, res) => {
  const { body } = req

  if (!body.email || !body.password) {
    return res.status(400).json({ success: false, msg: "Please complete fields" })
  }

  const user = await Users.findOne({ email: body.email })
  if (!user) {
    return res.status(401).json({ success: false, msg: "Password or email wrong" })
  }

  const { is_valid: isValid } = await Users.comparePassword(body.password, user.password)

  if (!isValid) {
    return res.status(401).json({ success: false, msg: "Password or email wrong" })
  }

  const TOKEN = sign({ role: user.user_role, id: user.user_id }, JWT_KEY)

  res.status(200).json({ success: true, msg: "successfuly", token: TOKEN, userId: user.user_id })
}
// rendering login page
const getLogin = (req, res) => {
  res.render("login")
}
// rendering register page
const getRegister = (req, res) => {
  res.render("register")
}

module.exports = {
  register,
  login,
  getLogin,
  getRegister
}