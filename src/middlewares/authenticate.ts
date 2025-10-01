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

    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: "Authentication token missing." })
    }


    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: "Token format invalid." })
    }

    try {
        const decoded = jwt.verifyToken(token)
        req.user = decoded
        next()
    } catch (error) {
        res.status(403).json({ message: "Invalid token!" })
    }
}