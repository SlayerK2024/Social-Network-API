const express = require('express');
const router = express.Router();

// Import API routes
const apiRoutes = require('./api');

// Route requests starting with `/api` to the API routes
router.use('/api', apiRoutes);

// 404 Error Handler for unmatched routes
router.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// 500 Error Handler for server errors
router.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = router;
