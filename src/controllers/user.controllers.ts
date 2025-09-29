import { Request, Response } from 'express'
import { userServices } from '../services/user.services'

export async function getLoggedUserInfo(req: Request, res: Response) {
    try {

        const { userId } = req.user

        const user = await userServices.getUser(userId)
        if (!user) return res.status(404).json({ message: "User not found!" })

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }

}