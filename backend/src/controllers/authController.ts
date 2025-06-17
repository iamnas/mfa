import { Request, Response } from "express";
import User, { UserType } from "../models/user";
import { hash } from 'bcryptjs';
import speakeasy from 'speakeasy';
import qrCode from 'qrcode';
import jwt from 'jsonwebtoken';
import { Document } from "mongoose";

const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;

        if(!email || !password || !name){
            res.status(400).json({ message: 'Please provide all the required fields' });
            return;
        }

        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const hashPassword = await hash(password, 10);
        const newUser = new User({ email, password: hashPassword, name, isMfaActive: false });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        res.status(500).json({ message: error, error: 'Error registering user' });
    }
};

const login = async (req: Request, res: Response) => {
    try {

        const user = req.user as UserType;
        if (!user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({
            message: "Logged in successfully",
            username: user.name,
            email: user.email,
            isMfaActive: user.isMfaActive,

        })



    } catch (error) {
        res.status(500).json({ message: error, error: 'Error logging in user' });
    }
};

const authStatus = async (req: Request, res: Response) => {
    try {
        const user = req.user as UserType;
        if (!req.user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({
            message: "Logged in successfully",
            username: user.name,
            email: user.email,
            isMfaActive: user.isMfaActive,
        })

    } catch (error) {
        res.status(500).json({ message: error, error: 'Error getting auth status' });
    }
};

const logout = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized user' });
            return;
        }

        req.logout((error) => {
            if (error) {
                res.status(500).json({ message: error, error: 'Error logging out user' });
                return;
            }

            res.status(200).json({ message: 'Logged out successfully' });
        });



    } catch (error) {
        res.status(500).json({ message: error, error: 'Error logging out user' });
    }
};


// 2FA Routes

// 2FA Setup Routes
const setup2FA = async (req: Request, res: Response) => {
    try {

        const user = req.user as UserType & Document;
        if (!user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }

        const secret = speakeasy.generateSecret();

        user.twoFactorSecret = secret.base32;
        user.isMfaActive = true;
        await user.save();

        const url = speakeasy.otpauthURL({
            secret: secret.base32,
            label: user.name,
            issuer: "www.mfa.com",
            encoding: "base32",
        })


        const qrImageUrl = await qrCode.toDataURL(url);


        res.status(200).json({
            secret: secret.base32,
            qrCode: qrImageUrl,
        });
    } catch (error) {
        res.status(500).json({ message: error, error: 'Error setting up 2FA' });
    }
};

// verify 2FA Routes
const verify2FA = async (req: Request, res: Response) => {
    try {

        const { token } = req.body;
        const user = req.user as UserType & Document;
        if (!user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }

        if (!user.twoFactorSecret) {
            res.status(400).json({ message: '2FA secret not set for user' });
            return;
        }

        const isVerifed = speakeasy.totp.verify({
            secret: user.twoFactorSecret as string,
            encoding: 'base32',
            token: token,
        });
        if (!isVerifed) {
            res.status(401).json({ message: 'Invalid 2FA token' });
            return;
        }

        const jwtToken = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        res.status(200).json({ token: jwtToken, message: '2FA verified successfully' });

    } catch (error) {
        res.status(500).json({ message: error, error: 'Error verifying 2FA' });
    }
};

// reset 2FA Routes
const reset2FA = async (req: Request, res: Response) => {
    try {

        const user = req.user as UserType & Document;
        if (!user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }

        if (!user.twoFactorSecret) {
            res.status(400).json({ message: '2FA secret not set for user' });
            return;
        }
        user.twoFactorSecret = null;
        user.isMfaActive = false;
        await user.save();

        res.status(200).json({ message: '2FA reset successfully' });


    } catch (error) {
        res.status(500).json({ message: error, error: 'Error resetting 2FA' });
    }
};


export default {
    register,
    login,
    authStatus,
    logout,
    setup2FA,
    verify2FA,
    reset2FA,
};