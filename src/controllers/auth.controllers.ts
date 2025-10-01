import { Request, Response } from 'express'
import { authServices } from '../services/auth.services'

export async function registerNewUser(req: Request, res: Response) {
    try {
        const user = await authServices.register(req.body)
        if (!user) return res.status(400).json({ message: "Unexpected error occurred!" })
        res.status(201).json({ message: "User registered successfully!", user })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function loginUser(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        const loginToken = await authServices.login(email, password)

        if (!loginToken) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const isProduction = process.env.NODE_ENV === 'production'

        res.status(200).cookie("token", loginToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "strict",
            maxAge: 1000 * 60 * 60 * 24
        }).json({ message: "Login successful!" })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export function logoutUser(req: Request, res: Response) {
    const isProduction = process.env.NODE_ENV === 'production'

    res.clearCookie('token', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "strict"
    });
    return res.status(200).json({ ok: true });
}