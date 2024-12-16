const Types = require('../data/types.js');
const Categories = require('../data/categories.js');

const getCategories = (req, res) => {
  if (!Categories) return res.status(404).json({ message: "No categories found" });
  res.status(200).json(Categories);
}

const getTypes = (req, res) => {
  if (!Types) return res.status(404).json({ message: "No types found" });
  res.status(200).json(Types);
}

module.exports = {
  getCategories,
  getTypes,
}