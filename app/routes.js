import express from 'express';
import userController from './controllers/userController';
import loginController from './controllers/loginController';

const router = express.Router();

router.post('/login', loginController.login);
router.post('/token', loginController.refreshTokenFunction);
router.delete('/logout', loginController.logout);
router.post('/user', userController.createUser);

// All routes bellow will pass through jwt authorization
router.use(loginController.authenticateToken);

router.get('/users', userController.getAll);

module.exports = router;
