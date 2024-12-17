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
    return res.status(500).json({ message: "Erreur serveur" });
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
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// Création d'une nouvelle recette
const createRecipe = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null;
    const { ingredients, steps, ...recipeData } = req.body;
    recipeData.ingredients = JSON.parse(ingredients);
    recipeData.steps = JSON.parse(steps);
    if (image) {
      recipeData.image = image;
    }
    const recipe = await Recipe.create(recipeData);

    if (!recipe) {
      return res.status(404).json({ message: "No recipe created" });
    }
    return res.status(201).json(recipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// Suppression d'une recette
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({ _id: req.params._id });
    if (!recipe) {
      return res.status(404).json({ message: "No recipe found" });
    }
    return res.status(200).json({ message: "Recipe deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
module.exports = {
  getRecipes,
  getRecipe,
  searchRecipe,
  createRecipe,
  deleteRecipe,
};
