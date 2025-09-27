import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";


export const validateSchema = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
        return res.status(422).json({ error: "Invalid data input!" })
    }

    req.body = result.data
    next()
}