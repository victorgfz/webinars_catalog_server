import { Request, Response, NextFunction } from "express";
import * as jwt from "../utils/jwt"

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies
    if (!token) {
        return res.status(401).json({ message: "Authentication cookie missing." })
    }
    try {
        const decoded = jwt.verifyToken(token)
        req.user = decoded

        next()
    } catch (error) {
        res.status(403).json({ message: "Invalid token!" })
    }
}