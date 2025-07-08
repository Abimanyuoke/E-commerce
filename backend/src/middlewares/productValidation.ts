// import { NextFunction, Request, Response } from 'express'
// import Joi from 'joi'

// /** create schema when add new product data, all fields are required */
// const addDataSchema = Joi.object({
//     name: Joi.string().required(),
//     price: Joi.number().min(0).required(),
//     category: Joi.string().valid(
//         'PAKAIAN_PRIA',
//         'PAKAIAN_WANITA',
//         'PAKAIAN_ANAK',
//         'AKSESORIS',
//         'SEPATU',
//         'TAS',
//         'BAJU_MUSLIM',
//         'BAJU_SANTAI',
//         'PAKAIAN_FORMAL',
//         'PAKAIAN_OLAHRAGA'
//     ).uppercase().required(),
//     description: Joi.string().required(),
//     picture: Joi.allow().optional(),
//     user: Joi.optional()
// })

// /** create schema when editing product data, all fields are optional */
// const editDataSchema = Joi.object({
//     name: Joi.string().optional(),
//     price: Joi.number().min(0).optional(),
//     category: Joi.string().valid(
//         'PAKAIAN_PRIA',
//         'PAKAIAN_WANITA',
//         'PAKAIAN_ANAK',
//         'AKSESORIS',
//         'SEPATU',
//         'TAS',
//         'BAJU_MUSLIM',
//         'BAJU_SANTAI',
//         'PAKAIAN_FORMAL',
//         'PAKAIAN_OLAHRAGA'
//     ).uppercase().optional(),
//     description: Joi.string().optional(),
//     picture: Joi.allow().optional(),
//     user: Joi.optional()
// })

// export const verifyAddMenu = (request: Request, response: Response, next: NextFunction) => {
//     const { error } = addDataSchema.validate(request.body, { abortEarly: false })

//     if (error) {
//         return response.status(400).json({
//             status: false,
//             message: error.details.map(it => it.message).join()
//         })
//     }
//     return next()
// }

// export const verifyEditMenu = (request: Request, response: Response, next: NextFunction) => {
//     const { error } = editDataSchema.validate(request.body, { abortEarly: false })

//     if (error) {
//         return response.status(400).json({
//             status: false,
//             message: error.details.map(it => it.message).join()
//         })
//     }
//     return next()
// }


import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

/** mapping kategori dan subkategori */
const categoryMap = {
    WANITA: ['BLOUSE', 'DRESS', 'ROK', 'TUNIK', 'OUTER', 'HIJAB', 'SETELAN_FORMAL'],
    PRIA: ['KAOS', 'KEMEJA', 'CELANA', 'JAKET', 'BATIK', 'SWEATER', 'SETELAN_FORMAL'],
    ANAK: ['BAJU_ANAK', 'SETELAN_ANAK', 'KAOS_ANAK', 'CELANA_ANAK'],
    SEPATU: ['SEPATU_PRIA', 'SEPATU_WANITA', 'SNEAKERS', 'SEPATU_ANAK', 'SEPATU_OLAHRAGA'],
    TAS: ['TAS_PRIA', 'TAS_WANITA', 'RANSEL', 'SELEMPANG'],
    SPORTS: ['JERSEY', 'TRAINING', 'LEGGING', 'SPORT_BRA', 'CELANA_OLAHRAGA']
}

/** schema tambah produk */
const addDataSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(0).required(),
    mainCategory: Joi.string().valid(...Object.keys(categoryMap)).required(),
    subCategory: Joi.string().required(),
    description: Joi.string().required(),
    picture: Joi.allow().optional(),
    user: Joi.optional()
}).custom((value: { mainCategory: keyof typeof categoryMap; subCategory: string }, helpers) => {
    const allowedSubs = categoryMap[value.mainCategory]
    if (!allowedSubs?.includes(value.subCategory)) {
        return helpers.error('any.invalid', {
            message: `subCategory '${value.subCategory}' tidak cocok dengan mainCategory '${value.mainCategory}'`
        })
    }
    return value
})

/** schema edit produk */
const editDataSchema = Joi.object({
    name: Joi.string().optional(),
    price: Joi.number().min(0).optional(),
    mainCategory: Joi.string().valid(...Object.keys(categoryMap)).optional(),
    subCategory: Joi.string().optional(),
    description: Joi.string().optional(),
    picture: Joi.allow().optional(),
    user: Joi.optional()
}).custom((value: { mainCategory?: keyof typeof categoryMap; subCategory?: string }, helpers) => {
    if (value.mainCategory && value.subCategory) {
        const allowedSubs = categoryMap[value.mainCategory]
        if (!allowedSubs?.includes(value.subCategory)) {
            return helpers.error('any.invalid', {
                message: `subCategory '${value.subCategory}' tidak cocok dengan mainCategory '${value.mainCategory}'`
            })
        }
    }
    return value
})

/** middleware validasi tambah produk */
export const verifyAddProduct= (request: Request, response: Response, next: NextFunction) => {
    const { error } = addDataSchema.validate(request.body, { abortEarly: false })
    if (error) {
        return response.status(400).json({
            status: false,
            message: error.details.map(it => it.message).join()
        })
    }
    return next()
}

/** middleware validasi edit produk */
export const verifyEditProduct = (request: Request, response: Response, next: NextFunction) => {
    const { error } = editDataSchema.validate(request.body, { abortEarly: false })
    if (error) {
        return response.status(400).json({
            status: false,
            message: error.details.map(it => it.message).join()
        })
    }
    return next()
}
