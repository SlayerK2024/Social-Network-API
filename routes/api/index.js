const express = require('express');
const router = express.Router();

// Import route modules
const userRoutes = require('./userRoutes');  
const thoughtRoutes = require('./thoughtRoutes');  

// Use imported routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
