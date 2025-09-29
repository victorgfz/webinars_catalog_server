import { Prisma, PrismaClient, User } from '../../generated/prisma'
import { compareHash, hashPassword } from '../utils/hash'
import * as jwt from '../utils/jwt'
const prisma = new PrismaClient()

async function register(data: Prisma.UserCreateInput) {
    try {
        const { name, email, password } = data
        const newPassword = await hashPassword(password)
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: newPassword
            },
            select: { id: true, name: true, email: true }
        })

        if (!newUser) return false

        return newUser
    } catch (error) {
        console.error("Service error: ", error)
        throw error
    }
}

function generateToken(user: User) {
    const token = jwt.signIn({ userId: user.id })
    return token
}

async function login(email: string, password: string) {
    try {
        if (!email || !password) return false
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (!user) return false
        const passwordDecrypted = await compareHash(password, user.password)
        if (!passwordDecrypted) return false

        return generateToken(user)
    } catch (error) {
        console.error("Service error: ", error)
        throw error
    }
}


export const authServices = {
    register,
    login
}