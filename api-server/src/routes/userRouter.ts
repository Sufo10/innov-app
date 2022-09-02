import { Router } from 'express';
import validateRequestBody from '../middlewares/validateReqBody';
import { login, register, updateUser, deleteUser, getAllUsers } from '../controllers/userController';
import requestSchema from '../requestSchema/requestSchema';
import { verifyToken } from '../utils/utilFunctions';

const router: Router = Router();

router.get('/users', verifyToken, getAllUsers);
router.post('/register', validateRequestBody(requestSchema.registerSchema), register);
router.post('/login', validateRequestBody(requestSchema.loginSchema), login);
router.delete('/users/:id', verifyToken, deleteUser);
router.put('/users/:id', verifyToken, updateUser);

export default router;