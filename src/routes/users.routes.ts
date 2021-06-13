import * as express from 'express';
import UserController from '../controllers/users.controller';
const router = express.Router();

router.get('/users', UserController.get)
router.post('/users', UserController.create)
router.patch('/users/:userId', UserController.update)
router.post('/users/auth', UserController.auth)

export default router;