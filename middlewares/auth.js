const { verify, sign } = require("jsonwebtoken")
const Users = require("../model/Users")
const { JWT_KEY } = require("../config/config")

const authLogin = async (req, res, next) => {
  try {
    const { headers } = req
    if (!headers.auth_token) throw new Error("Please put auth token")

    const userInfo = verify(headers.auth_token, JWT_KEY)
    if (!userInfo) throw new Error("token is not correct")

    const user = await Users.findOne({ userId: userInfo.id })

    if (!user) throw new Error("User not find")

    req.authUser = user;

    next()

  } catch (error) {
    res.status(401).json({ msg:  error.message, success: false })
  }
}

module.exports = {
  authLogin
}