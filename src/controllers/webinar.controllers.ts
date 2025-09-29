import { Request, Response } from 'express'
import { webinarServices } from '../services/webinar.services'
import { Prisma } from '../../generated/prisma'

export async function getWebinarList(req: Request, res: Response) {
    try {
        const { userEnrolled } = req.query
        const { userId } = req.user
        const userEnrolledBool = userEnrolled === 'true'
        const webinarList = await webinarServices.getAllWebinar(userId, userEnrolledBool)

        if (!webinarList) return res.status(404).json({ message: "Not found!" })
        res.status(200).json(webinarList)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getWebinarById(req: Request, res: Response) {
    try {
        const webinarId = Number(req.params.id)
        const { userId } = req.user
        const webinar = await webinarServices.getWebinar(webinarId, userId)

        if (!webinar) return res.status(404).json({ message: "Not found!" })

        res.status(200).json(webinar)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function enrollUserToWebinar(req: Request, res: Response) {
    try {
        const { userId } = req.user
        const webinarId = Number(req.params.id)
        const { name, email, linkedin } = req.body
        const data: Prisma.UserWebinarCreateInput = {
            user: { connect: { id: userId } },
            webinar: { connect: { id: webinarId } },
            name,
            email,
            linkedin
        }
        const enrollment = await webinarServices.enrollment(data)
        if (!enrollment) return res.status(400).json({ message: "Unexpected error occurred!" })

        res.status(201).json({ message: "Enrollment registered successfully!", enrollment })
    } catch (error) {

        res.status(500).json({ message: "Internal server error" })
    }
}