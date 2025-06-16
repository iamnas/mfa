import { Request, Response } from "express";
import User, { UserType } from "../models/user";
import { hash } from 'bcryptjs';

const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;
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

        req.logout((error)=>{
            if(error){
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

        // res.status(200).json({ isMfaActive });
    } catch (error) {
        res.status(500).json({ message: error, error: 'Error setting up 2FA' });
    }
};

// verify 2FA Routes
const verify2FA = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error, error: 'Error verifying 2FA' });
    }
};

// reset 2FA Routes
const reset2FA = async (req: Request, res: Response) => {
    try {

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