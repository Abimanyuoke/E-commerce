// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// import { v4 as uuidv4 } from "uuid";
// import { BASE_URL } from "../global";
// import fs from "fs"

// const prisma = new PrismaClient({ errorFormat: "pretty" })

// export const getAllMenus = async (request: Request, response: Response) => {
//     try {
//         /** get requested data (data has been sent from request) */
//         const { search } = request.query

//         /** process to get menu, contains means search name of menu based on sent keyword */
//         const allMenus = await prisma.menu.findMany({
//             where: { name: { contains: search?.toString() || "" } }
//         })

//         return response.json({
//             status: true,
//             data: allMenus,
//             message: `Menus has retrieved`
//         }).status(200)
//     } catch (error) {
//         return response
//             .json({
//                 status: false,
//                 message: `There is an error. ${error}`
//             })
//             .status(400)
//     }
// }

// export const createMenu = async (request: Request, response: Response) => {
//     try {
//         /** get requested data (data has been sent from request) */
//         const { name, price, category, description } = request.body
//         const uuid = uuidv4()

//         /** variable filename use to define of uploaded file name */
//         let filename = ""
//         if (request.file) filename = request.file.filename /** get file name of uploaded file */

//         /** process to save new menu, price and stock have to convert in number type */
//         const newMenu = await prisma.menu.create({
//             data: { uuid, name, price: Number(price), category, description, picture: filename }
//         })

//         return response.json({
//             status: true,
//             data: newMenu,
//             message: `New Menu has created`
//         }).status(200)
//     } catch (error) {
//         return response
//             .json({
//                 status: false,
//                 message: `There is an error. ${error}`
//             })
//             .status(400)
//     }
// }

// export const updateMenu = async (request: Request, response: Response) => {
//     try {
//         /** get id of menu's id that sent in parameter of URL */
//         const { id } = request.params
//         /** get requested data (data has been sent from request) */
//         const { name, price, category, description } = request.body

//         /** make sure that data is exists in database */
//         const findMenu = await prisma.menu.findFirst({ where: { id: Number(id) } })
//         if (!findMenu) return response
//             .status(200)
//             .json({ status: false, message: `Menu is not found` })

//         /** default value filename of saved data */
//         let filename = findMenu.picture
//         if (request.file) {
//             /** update filename by new uploaded picture */
//             filename = request.file.filename
//             /** check the old picture in the folder */
//             let path = `${BASE_URL}/../public/menu_picture/${findMenu.picture}`
//             let exists = fs.existsSync(path)
//             /** delete the old exists picture if reupload new file */
//             if (exists && findMenu.picture !== ``) fs.unlinkSync(path)
//         }

//         /** process to update menu's data */
//         const updatedMenu = await prisma.menu.update({
//             data: {
//                 name: name || findMenu.name,
//                 price: price ? Number(price) : findMenu.price,
//                 category: category || findMenu.category,
//                 description: description || findMenu.description,
//                 picture: filename
//             },
//             where: { id: Number(id) }
//         })

//         return response.json({
//             status: true,
//             data: updatedMenu,
//             message: `Menu has updated`
//         }).status(200)
//     } catch (error) {
//         return response
//             .json({
//                 status: false,
//                 message: `There is an error. ${error}`
//             })
//             .status(400)
//     }
// }

// export const deleteMenu = async (request: Request, response: Response) => {
//     try {
//         /** get id of menu's id that sent in parameter of URL */
//         const { id } = request.params

//         /** make sure that data is exists in database */
//         const findMenu = await prisma.menu.findFirst({ where: { id: Number(id) } })
//         if (!findMenu) return response
//             .status(200)
//             .json({ status: false, message: `Menu is not found` })

//         /** check the old picture in the folder */
//         let path = `${BASE_URL}/../public/menu_picture/${findMenu.picture}`
//         let exists = fs.existsSync(path)
//         /** delete the old exists picture if reupload new file */
//         if (exists && findMenu.picture !== ``) fs.unlinkSync(path)

//         /** process to delete menu's data */
//         const deletedMenu = await prisma.menu.delete({
//             where: { id: Number(id) }
//         })
//         return response.json({
//             status: true,
//             data: deletedMenu,
//             message: `Menu has deleted`
//         }).status(200)
//     } catch (error) {
//         return response
//             .json({
//                 status: false,
//                 message: `There is an error. ${error}`
//             })
//             .status(400)
//     }
// }

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL } from "../global";
import fs from "fs";

const prisma = new PrismaClient({ errorFormat: "pretty" });

/** GET ALL PRODUCTS (optional search) */
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { search, mainCategory, subCategory } = req.query;

    const products = await prisma.product.findMany({
      where: {
        name: { contains: search?.toString() || "" },
        ...(mainCategory ? { mainCategory: mainCategory.toString() } : {}),
        ...(subCategory ? { subCategory: subCategory.toString() } : {}),
      },
    });

    return res.status(200).json({
      status: true,
      data: products,
      message: "Products retrieved",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: `Error: ${error}`,
    });
  }
};

/** CREATE PRODUCT */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, mainCategory, subCategory, description } = req.body;
    const uuid = uuidv4();

    let filename = "";
    if (req.file) filename = req.file.filename;

    const newProduct = await prisma.product.create({
      data: {
        uuid,
        name,
        price: Number(price),
        mainCategory,
        subCategory,
        description,
        picture: filename,
      },
    });

    return res.status(200).json({
      status: true,
      data: newProduct,
      message: "Product created",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: `Error: ${error}`,
    });
  }
};

/** UPDATE PRODUCT */
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, mainCategory, subCategory, description } = req.body;

    const product = await prisma.product.findFirst({ where: { id: Number(id) } });
    if (!product) {
      return res.status(404).json({ status: false, message: "Product not found" });
    }

    let filename = product.picture;
    if (req.file) {
      filename = req.file.filename;
      const path = `${BASE_URL}/../public/product_picture/${product.picture}`;
      if (fs.existsSync(path) && product.picture !== "") {
        fs.unlinkSync(path);
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: name || product.name,
        price: price ? Number(price) : product.price,
        mainCategory: mainCategory || product.mainCategory,
        subCategory: subCategory || product.subCategory,
        description: description || product.description,
        picture: filename,
      },
    });

    return res.status(200).json({
      status: true,
      data: updatedProduct,
      message: "Product updated",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: `Error: ${error}`,
    });
  }
};

/** DELETE PRODUCT */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findFirst({ where: { id: Number(id) } });
    if (!product) {
      return res.status(404).json({ status: false, message: "Product not found" });
    }

    const path = `${BASE_URL}/../public/product_picture/${product.picture}`;
    if (fs.existsSync(path) && product.picture !== "") {
      fs.unlinkSync(path);
    }

    const deletedProduct = await prisma.product.delete({ where: { id: Number(id) } });

    return res.status(200).json({
      status: true,
      data: deletedProduct,
      message: "Product deleted",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: `Error: ${error}`,
    });
  }
};
