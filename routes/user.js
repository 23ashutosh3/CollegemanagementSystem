const express = require('express');
const router = express.Router();
const passportLocal = require('../config/passport_jwt_strategy')
const passport = require('passport');


const usersController = require('../controllers/User');

router.post('/login', usersController.login)
router.post('/register', usersController.register);
router.put('/edit/:id', usersController.editUser)
router.post('/upload', usersController.upload)

router.get("/verify", passport.authenticate("jwt", { session: false }), usersController.verify)






module.exports = router;