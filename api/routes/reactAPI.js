const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('API is working correctly');
});

module.exports = router;