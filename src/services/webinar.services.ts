
import { PrismaClient, Prisma } from '../../generated/prisma'

const prisma = new PrismaClient()


async function getAllWebinar(
    userId: number,
    userEnrolled?: boolean,
    categories?: string | string[],
    speakers?: string | string[],
    languages?: string | string[],
    search?: string
) {
    try {

        const where: any = {
            datetime: {
                gte: new Date()
            }
        }

        if (userEnrolled) {
            where.userWebinars = {
                some: {
                    idUser: userId
                }
            }
        }

        if (categories) {
            const categoriesArray = Array.isArray(categories) ? categories : [categories]
            where.categories = {
                some: {
                    category: {
                        description: {
                            in: categoriesArray,
                            mode: "insensitive"
                        }
                    }
                }
            }
        }

        if (speakers) {
            const speakersArray = Array.isArray(speakers) ? speakers : [speakers]
            where.speakers = {
                some: {
                    speaker: {
                        name: {
                            in: speakersArray,
                            mode: "insensitive"
                        }
                    }
                }
            }
        }

        if (languages) {
            const languagesArray = Array.isArray(languages) ? languages : [languages]
            where.language = {
                in: languagesArray,
                mode: "insensitive"
            }
        }

        if (search) {
            where.OR = [
                { title: { contains: search, mode: "insensitive" } },
                { summary: { contains: search, mode: "insensitive" } },
                { language: { contains: search, mode: "insensitive" } },
                {
                    categories: {
                        some: {
                            category: {
                                description: { contains: search, mode: "insensitive" }
                            }
                        }
                    }
                },
                {
                    speakers: {
                        some: {
                            speaker: {
                                name: { contains: search, mode: "insensitive" }
                            }
                        }
                    }
                }
            ]
        }

        const webinarList = await prisma.webinar.findMany({
            where,
            include: {
                categories: {
                    include: {
                        category: {
                            select: { description: true }
                        }
                    }
                },
                speakers: {
                    include: {
                        speaker: {
                            select: { name: true }
                        }
                    }
                },
                userWebinars: true
            }
        })

        return webinarList.map(item => ({
            id: item.id,
            title: item.title,
            summary: item.summary,
            duration: item.duration,
            datetime: item.datetime,
            language: item.language,
            categories: item.categories.map(i => i.category.description),
            speakers: item.speakers.map(i => i.speaker.name),
            userEnrolled: item.userWebinars.some(u => u.idUser === userId)
        }))
    } catch (error) {
        console.error("Service error: ", error)
        throw error
    }
}


async function getWebinar(webinarId: number, userId: number) {
    try {
        const webinar = await prisma.webinar.findFirst({
            where: {
                id: webinarId
            },
            include: {
                categories: {
                    include: {
                        category: {
                            select: {

                                description: true
                            }
                        }
                    }
                },
                speakers: {
                    include: {
                        speaker: {
                            select: {

                                name: true
                            }
                        }
                    }
                },
                userWebinars: true

            }
        })
        if (!webinar) return false

        const formattedWebinar = {
            id: webinar.id,
            title: webinar.title,
            summary: webinar.summary,
            duration: webinar.duration,
            datetime: webinar.datetime,
            language: webinar.language,
            categories: webinar.categories.map(item => item.category.description),
            speakers: webinar.speakers.map(item => item.speaker.name),
            userEnrolled: webinar.userWebinars.some(item => item.idUser === userId)
        }
        return formattedWebinar

    } catch (error) {
        console.error("Service error: ", error)
        throw error
    }
}

async function enrollment(data: Prisma.UserWebinarCreateInput) {
    try {
        const enroll = await prisma.userWebinar.create({
            data
        })
        if (!enroll) return false

        return enroll
    } catch (error) {
        console.error("Service error: ", error)
        throw error
    }
}



export const webinarServices = {
    getAllWebinar,
    getWebinar,
    enrollment
}