const express = require('express');
const auth = require('./auth');
const router = express.Router();

// auth route untuk registrasi
router.post('/api/v1/register', auth.registrasi);

// auth route untuk login
router.post('/api/v1/login', auth.login);

module.exports = router;