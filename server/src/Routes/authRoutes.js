const express = require('express')
const { Register, Login, Logout, HydrateUser } = require('../controller/AuthController');
const authenticateMe = require('../middleware/authenticate.me');

const router = express.Router();



router.post('/register', Register)
router.post('/login', Login)
router.get('/logout', Logout)
router.get('/me', authenticateMe, HydrateUser)

module.exports = router;