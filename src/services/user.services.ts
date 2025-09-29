import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient()

async function getUser(userId: number) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }, select: { id: true, name: true, email: true }
        })
        if (!user) return false
        return user
    } catch (error) {
        console.error("Service error: ", error)
        throw error
    }
}


export const userServices = {
    getUser
}