const Recipe = require("../models/recipesModel.js");

// Toutes les recettes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    if (!recipes) {
      return res.status(404).json({ message: "No recipes found" });
    }
    return res.status(200).json(recipes);
  } catch (error) {
    return res.status(500).json();
  }
};

// Une seule recette à partir de son id
const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ _id: req.params._id });
    if (!recipe) {
      return res.status(404).json({ message: "No recipe found" });
    }
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json();
  }
};

// Recherche d'une recette par son titre
const searchRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ title: req.params.title });
    if (!recipe) {
      return res.status(404).json({ message: "No recipe found" });
    }
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json();
  }
};

// Création d'une nouvelle recette
const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    if (!recipe) {
      return res.status(404).json({ message: "No recipe created" });
    }
    return res.status(201).json(recipe);
  } catch (error) {}
};

// Suppression d'une recette
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({ title: req.params.title });
    if (!recipe) {
      return res.status(404).json({ message: "No recipe deleted" });
    }
    return res.status(200).json(recipe);
  } catch (error) {}
};

module.exports = {
  getRecipes,
  getRecipe,
  searchRecipe,
  createRecipe,
  deleteRecipe,
};
