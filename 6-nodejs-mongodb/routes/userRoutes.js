const express = require('express');
const userController = require('../controllers/userControllers');
const authController = require('../controllers/authControllers');

const router = express.Router();

// kullanıcların kaydolması için
router.post('/signup', authController.signup);

// kulalnıcıların varolan hesaba giriş yapması için
router.post('/login', authController.login);

// kullanıcı şifresini unuttuysa
router.post('/forgot-password', authController.forgotPassword);

// epostasına gönderdiğimiz linke istek attınca
router.patch('/reset-password/:token', authController.resetPassword);

// bu satırdan sonraki bütün route'lardan önce protect middleware çalışsın
router.use(authController.protect);

// şifreyi güncellemek istiyorsa
router.patch('/update-password', authController.updatePassword);

// hesabına güncellemek isteyince
router.patch('/update-me', userController.updateMe);

// hesabını silmek isteğdinde
router.delete('/delete-me', userController.deleteMe);

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
