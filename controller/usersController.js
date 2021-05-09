const Users = require("../model/Users")
const Views = require("../model/Views")
const Posts = require("../model/Posts")
// Functions for sorting by category of eventors
const getByCategory = async (req, res) => {

  const { params: { categoryId } } = req

  const users = await Users.findByCategory(categoryId)

  res.status(200).json({ success: true, msg: "successfuly", data: users })
}

const getAll = async (req, res) => {
  const users = await Users.findAll();

  res.status(200).json({ success: true, msg: "successfuly", data: users });
}
// search users 
const search = async (req, res) => {
  const { query: { search, page, limit } } = req

  const users = await Users.search({ keyword: search, page: page || 1, limit: limit || 20 })


  res.status(200).json({ success: true, msg: "successfuly", data: users })
}
// review profile 
const getSingle = async (req, res) => {
  const { params } = req
  const user = await Users.findOneDetails(params.id)
  const posts = await Posts.findByAuthor(params.id)

  if (!user) {
    return res.status(404).json({ success: false, msg: "not found" })
  }

  await Views.add(user.user_id)

  res.render("profile", { user, posts })
  
}



module.exports = {
  getByCategory,
  search,
  getAll,
  getSingle
}