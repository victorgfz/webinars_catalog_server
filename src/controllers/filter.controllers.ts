import { Request, Response } from 'express'
import { Prisma } from '../../generated/prisma'
import { filterServices } from '../services/filter.services'


export async function getFilterList(req: Request, res: Response) {
    try {
        const filterList = await filterServices.getFilterList()

        if (!filterList) res.status(404).json({ message: "Not found!" })
        res.status(200).json(filterList)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}