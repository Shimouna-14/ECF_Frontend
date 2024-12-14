const Types = require('../data/types.js');
const Categories = require('../data/categories.js');

const getCategories = (req, res) => res.status(200).json(Categories);

const getCategory = (req, res) => {
  const { id } = req.params;
  const category = Categories.find((category) => category.id === Number(id));
  if (!category) return res.status(404).json({ message: "No category found" });
  res.status(200).json(category);
};

const getTypes = (req, res) => {
  if (!Types) return res.status(404).json({ message: "No types found" });
  res.status(200).json(Types);
}

const getType =  (req, res) => {
  const { id } = req.params;
  const type = Types.find((type) => type.id === Number(id));
  if (!type) return res.status(404).json({ message: "No type found" });
  res.status(200).json(type);
};

module.exports = {
  getCategories,
  getCategory,
  getTypes,
  getType
}