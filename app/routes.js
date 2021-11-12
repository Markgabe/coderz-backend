import express from 'express';
import userController from './controllers/userController';
import loginController from './controllers/loginController';
import challengeController from './controllers/challengeController';
import testCaseController from './controllers/testCaseController';

const router = express.Router();

router.get('/', (req, res) => res.sendStatus(200));
router.post('/login', loginController.login);
router.post('/token', loginController.refreshTokenFunction);
router.delete('/logout', loginController.logout);
router.post('/user', userController.createUser);

// All routes bellow will pass through jwt authorization
router.use(loginController.authenticateToken);

router.get('/users', userController.getAll);

router.get('/challenges', challengeController.findAllChallenges);
router.post('/challenge', challengeController.createChallenge);
router.get('/challenge/:id/testCases', challengeController.findOneWithTestCases);

router.post('/testCase', testCaseController.createTestCase);

module.exports = router;
