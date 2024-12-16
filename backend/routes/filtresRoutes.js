const express = require('express');
const router = express.Router();
const { getCategories, getTypes } = require('../controllers/filtresController.js');

router.get('/categories', getCategories)
router.get('/types', getTypes)

module.exports = router;