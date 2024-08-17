const express = require('express');
const router = express.Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

router.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = router;
