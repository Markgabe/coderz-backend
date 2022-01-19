import userController from './controllers/userController';
import loginController from './controllers/loginController';
import challengeController from './controllers/challengeController';
import challengeSubmissionController from './controllers/challengeSubmissionController';
import testCaseController from './controllers/testCaseController';
import rankController from './controllers/rankController';

const router = require('express').Router();

// Connection check route
router.get('/', (req, res) => res.sendStatus(200));

// Public routes
router.post('/login', loginController.login);
router.post('/token', loginController.refreshTokenFunction);
router.delete('/logout', loginController.logout);
router.post('/user', userController.create);

// All routes bellow will pass through jwt authorization
router.use(loginController.authenticateToken);

// User routes
router.get('/users', userController.index);

// Challenge routes
router.get('/challenges/testCases', challengeController.index);
router.get('/challenges', challengeController.indexWithUserCompletedInfo);
router.post('/challenge', challengeController.create);
router.get('/challenge/:id/testCases', challengeController.findOneWithTestCases);

// ChallengeSubmission routes
router.post('/challenge/:id/submit', challengeSubmissionController.create);

// TestCase routes
router.post('/testCase', testCaseController.create);

// Rank routes
router.get('/rank', rankController.index);

module.exports = router;
