const express = require('express');
const router = express.Router();
const { getCategories, getCategory, getTypes, getType } = require('../controllers/filtresController.js');

router.get('/categories', getCategories)
router.get('/categories/:id', getCategory)
router.get('/types', getTypes)
router.get('/types/:id', getType)

module.exports = router;