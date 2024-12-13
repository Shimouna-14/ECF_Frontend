const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  steps: {
    type: [String],
    required: true,
  },
  time: {
    type: String, 
    required: true,
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
