
import { PrismaClient, Prisma } from '../../generated/prisma'

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

async function addCategory(data: Prisma.CategoryCreateInput) {
    try {
        const category = await prisma.category.create({ data })
        if (!category) return false
        return category
    } catch (error) {
        console.error("Service error: ", error)
        throw error
    }
}

async function getAllCategories() {
    try {
        const categories = await prisma.category.findMany()
        if (!categories) return false
        return categories
    } catch (error) {
        console.error("Service error: ", error)
        throw error
    }
}

async function getAllSpeakers() {
    try {
        const speakers = await prisma.speaker.findMany()
        if (!speakers) return false
        return speakers
    } catch (error) {
        console.error("Service error: ", error)
        throw error
    }
}

async function addSpeaker(data: Prisma.SpeakerCreateInput) {
    try {
        const speaker = await prisma.speaker.create({ data })
        if (!speaker) return false
        return speaker
    } catch (error) {
        console.error("Service error: ", error)
        throw error
    }
}
export const filterServices = {
    getFilterList,
    addCategory,
    addSpeaker,
    getAllCategories,
    getAllSpeakers
}