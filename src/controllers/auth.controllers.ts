import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'
const prisma = new PrismaClient()



export async function registerNewUser(req: Request, res: Response) {
    try {

        const { name, email, password } = req.body

        console.log("cheguei no final")
        res.status(201).json
    } catch (error) {
        console.log(error)
    }
}