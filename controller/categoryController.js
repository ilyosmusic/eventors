const Categories = require("../model/Categories")
// getting categories
const getAllCategory = async (req, res) => {
  const categories = await Categories.findAll()
  res.status(200).json({ success: true, msg: "successfuly", data: categories })

}


module.exports = {
  getAllCategory
}