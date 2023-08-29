const express = require('express');
const router = express.Router();

// import controller
const ApiController = require('../controllers/api_controller');
const awaitHandler = require('../middleware/await_handler');

router.post('/in', awaitHandler(ApiController.inApi));
router.post('/out', awaitHandler(ApiController.resApi));

module.exports = router;