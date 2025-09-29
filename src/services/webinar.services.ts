
import { PrismaClient, Prisma, UserWebinar } from '../../generated/prisma'

const prisma = new PrismaClient()


async function getAllWebinar(userId: number, userEnrolled: boolean) {
    try {
        const webinarList = await prisma.webinar.findMany({
            include: {
                categories: {
                    include: {
                        category: {
                            select: {
                                description: true
                            }
                        }
                    },
                },
                speakers: {
                    include: {
                        speaker: {
                            select: {
                                name: true
                            }
                        }
                    },
                },
                userWebinars: true
            }
        })

        if (!webinarList) return false
        const formattedWebinarList = webinarList.map(item => ({
            id: item.id,
            title: item.title,
            summary: item.summary,
            duration: item.duration,
            datetime: item.datetime,
            language: item.language,
            categories: item.categories.map(i => i.category.description),
            speakers: item.speakers.map(i => i.speaker.name),
            userEnrolled: item.userWebinars.some(item => item.idUser === userId)
        }))

        const filteredPastWebinarList = filterPastWebinar(formattedWebinarList)


        if (userEnrolled) {
            const filteredWebinarList = filterUserWebinar(filteredPastWebinarList)
            return filteredWebinarList
        }

        return filteredPastWebinarList

    } catch (error) {
        console.error("Service error: ", error)
        throw error
    }
}

function filterPastWebinar(webinars: { id: number, title: string, summary: string, duration: number, datetime: Date, language: string, categories: string[], speakers: string[], userEnrolled: boolean, }[]) {
    if (!webinars) return []
    const today = new Date()
    const webinarList = webinars.filter(item => item.datetime.getTime() > today.getTime())
    return webinarList
}

function filterUserWebinar(webinars: { id: number, title: string, summary: string, duration: number, datetime: Date, language: string, categories: string[], speakers: string[], userEnrolled: boolean, }[]) {
    if (!webinars) return false
    const webinarList = webinars.filter(item => item.userEnrolled)
    return webinarList
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