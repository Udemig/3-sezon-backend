const express = require('express');
const userController = require('../controllers/userControllers');
const authController = require('../controllers/authControllers');

const router = express.Router();

// kullanıcların kaydolması için
router.post('/signup', authController.signup);

// kulalnıcıların varolan hesaba giriş yapması için
router.post('/login', authController.login);

// genellikle adminlerin kullanıcağı route'lar
router
  .route('/')
  .get(userController.getAllUsers) //
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
