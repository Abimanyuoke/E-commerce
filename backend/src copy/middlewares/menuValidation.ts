import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

/** create schema when add new menu's data, all of fileds have to be required */
const addDataSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().valid(
        'BENIH_BIBIT',
        'PUPUK_PESTISIDA',
        'ALAT_PERLENGKAPAN',
        'TANAH_MEDIA_TANAM',
        'TANAMAN_HIAS',
        'TANAMAN_BUAH',
        'TANAMAN_SAYUR',
        'TANAMAN_HERBAL',
        'AKSESORIS_BERKEBUN',
        'PAKET_BERKEBUN'
    ).uppercase().required(),
    description: Joi.string().required(),
    picture: Joi.allow().optional(),
    user: Joi.optional()
})

/** create schema when edit new menu's data, all of fileds have to be required */
const editDataSchema = Joi.object({
    name: Joi.string().optional(),
    price: Joi.number().min(0).optional(),
    category: Joi.string().valid(
        'BENIH_BIBIT',
        'PUPUK_PESTISIDA',
        'ALAT_PERLENGKAPAN',
        'TANAH_MEDIA_TANAM',
        'TANAMAN_HIAS',
        'TANAMAN_BUAH',
        'TANAMAN_SAYUR',
        'TANAMAN_HERBAL',
        'AKSESORIS_BERKEBUN',
        'PAKET_BERKEBUN'
    ).uppercase().optional(),
    description: Joi.string().optional(),
    picture: Joi.allow().optional(),
    user: Joi.optional()
})

export const verifyAddMenu = (request: Request, response: Response, next: NextFunction) => {
    /** validate a request body and grab error if exist */
    const { error } = addDataSchema.validate(request.body, { abortEarly: false })

    if (error) {
        /** if there is an error, then give a response like this */
        return response.status(400).json({
            status: false,
            message: error.details.map(it => it.message).join()
        })
    }
    return next()
}

export const verifyEditMenu = (request: Request, response: Response, next: NextFunction) => {
    /** validate a request body and grab error if exist */
    const { error } = editDataSchema.validate(request.body, { abortEarly: false })

    if (error) {
        /** if there is an error, then give a response like this */
        return response.status(400).json({
            status: false,
            message: error.details.map(it => it.message).join()
        })
    }
    return next()
}