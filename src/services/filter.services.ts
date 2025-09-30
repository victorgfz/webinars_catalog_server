
import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient()


async function getFilterList() {
    try {
        const categories = await prisma.category.findMany()
        const speakers = await prisma.speaker.findMany()
        const languages = await prisma.webinar.findMany({
            distinct: ["language"],
            select: { language: true }
        });
        if (!categories || !speakers || !languages) return false

        const formattedCategories = {
            type: "categories",
            items: categories.map(item => item.description)
        }
        const formattedSpeakers = {
            type: "speakers",
            items: speakers.map(item => item.name)
        }
        const formattedLanguages = {
            type: "languages",
            items: languages.map(item => item.language)
        }


        return [formattedCategories, formattedSpeakers, formattedLanguages]
    } catch (error) {
        console.error("Service error: ", error)
        throw error
    }
}

export const filterServices = {
    getFilterList,
}