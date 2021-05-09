const Posts = require("../model/Posts")
const Views = require("../model/Views")
const path = require("path")
const slugify = require("slugify")

const getAll = async (req, res) => {
  const restaurants = await Posts.findByAuthor(req.query.page || 1, req.query.limit || 20)
  res.status(200).json({ success: true, msg: "Completed Succesully", data: restaurants })
}

const create = async (req, res) => {

  const { body: { title }, files, authUser: { user_id } } = req
  if (user_id && title && files) {

    const imageName = `uploads/${Date.now()}-${slugify(files.image.name, { lower: true })}`
    await files.image.mv(path.join(__dirname, "../", imageName))

    const article = await Posts.create({ authorId: user_id, title, img_src: imageName })

    return res.status(201).json({ success: true, msg: "Completed Succesully", data: article })

  }

  res.status(400).json({ success: false, msg: "Fields not completed" })

}

module.exports = {
  getAll,
  create
}