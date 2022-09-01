import { Router } from 'express';
import validateRequestBody from '../middlewares/validateReqBody';
import { login, register } from '../controllers/userController';
import requestSchema from '../requestSchema/requestSchema';
const router: Router = Router();

router.get('/');
router.post('/register', validateRequestBody(requestSchema.registerSchema), register);
router.post('/login', validateRequestBody(requestSchema.loginSchema), login);
router.delete('/');
router.put('/');

export default router;