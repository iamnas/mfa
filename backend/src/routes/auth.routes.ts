import { Router } from 'express';
import passport from 'passport';
import authController from '../controllers/authController';

const authRouter = Router();

// Registration Routes
authRouter.post('/register', authController.register);
// Login Routes
authRouter.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), authController.login);
// Auth Status Routes
authRouter.get('/status', authController.authStatus);
// Logout Routes
authRouter.post('/logout', authController.logout);



// 2FA Routes
// 2FA Setup Routes
authRouter.post('/2fa/setup', authController.setup2FA);

// verify 2FA Routes
authRouter.post('/2fa/verify', authController.verify2FA);

// reset 2FA Routes
authRouter.post('/2fa/reset', authController.reset2FA);


export default authRouter;