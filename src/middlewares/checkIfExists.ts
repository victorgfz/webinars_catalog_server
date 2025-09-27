import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '../../generated/prisma'
const prisma = new PrismaClient()

export const checkIfExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await prisma.user.findFirst({
            where: {
                email: req.body.email
            }
        })

        if (result !== null) {
            return res.status(409).json({ error: "Email already registered!" })
        }

        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Internal server error" })
    }

}