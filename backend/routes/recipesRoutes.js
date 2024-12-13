const express = require('express');
const router = express.Router();
const { getRecipes, getRecipe, createRecipe, deleteRecipe } = require('../controllers/recipesController.js');
const multer = require('../middleware/multer.js');

router.get('/', getRecipes)
router.get('/:_id', getRecipe)
router.post('/create', multer, createRecipe)
router.delete('/delete/:title', deleteRecipe)

module.exports = router;