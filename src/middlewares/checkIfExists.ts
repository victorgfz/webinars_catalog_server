import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '../../generated/prisma'
const prisma = new PrismaClient()

const emailInUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await prisma.user.findFirst({
            where: {
                email: req.body.email
            }
        })

        if (result !== null) {
            return res.status(409).json({ message: "Email already registered!" })
        }

        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal server error" })
    }

}

const emailInUserWebinar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await prisma.userWebinar.findFirst({
            where: {
                email: req.body.email,
                idWebinar: Number(req.params.id)
            }
        })
        if (result !== null) {
            return res.status(409).json({ message: "Email already registered!" })
        }

        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal server error" })
    }

}

const linkedinInUserWebinar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await prisma.userWebinar.findFirst({
            where: {
                linkedin: req.body.linkedin,
                idWebinar: Number(req.params.id)
            }
        })

        if (result !== null) {
            return res.status(409).json({ message: "Linkedin already registered!" })
        }

        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal server error" })
    }

}



export const checkIfExists = {
    emailInUser,
    emailInUserWebinar,
    linkedinInUserWebinar
}