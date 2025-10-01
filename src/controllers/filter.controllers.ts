import { Request, Response } from 'express'
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

export async function addNewCategory(req: Request, res: Response) {
    try {
        const category = await filterServices.addCategory(req.body)
        if (!category) return res.status(400).json({ message: "Unexpected error occurred!" })
        res.status(201).json({ message: "New category added successfully!", category })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function addNewSpeaker(req: Request, res: Response) {
    try {
        const speaker = await filterServices.addSpeaker(req.body)
        if (!speaker) return res.status(400).json({ message: "Unexpected error occurred!" })
        res.status(201).json({ message: "New speaker added successfully!", speaker })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getAllCategories(req: Request, res: Response) {
    try {
        const categories = await filterServices.getAllCategories()
        if (!categories) return res.status(404).json({ message: "Not found!" })
        res.status(201).json(categories)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getAllSpeakers(req: Request, res: Response) {
    try {
        const speakers = await filterServices.getAllSpeakers()
        if (!speakers) return res.status(404).json({ message: "Not found!" })
        res.status(201).json(speakers)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}