import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ errorFormat: "pretty" })

export const getDashboard = async (request: Request, response: Response): Promise<void> => {
    try {
        /** process to get order, contains means search name or table number of customer's order based on sent keyword */
        const allUsers = await prisma.user.findMany()
        const allMenus = await prisma.menu.findMany()
        const newOrders = await prisma.order.findMany({
            where: {
                OR: [
                    { status: "NEW" },
                    { status: "PAID"}
                ]},
        })
        const doneOrders = await prisma.order.findMany({
            where: {status:  'DONE'},
        })
        response.json({
            status: true,
            data: {
                allUser: allUsers.length,
                allMenus: allMenus.length,
                newOrder: newOrders.length,
                doneOrder: doneOrders.length,
            },
            message: `Order list has retrieved`
        }).status(200)
    } catch (error) {
        response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const getFavourite = async (request: Request, response: Response): Promise<void> => {
    try {
        // Mengambil semua order list yang ada
        const orderLists = await prisma.orderList.findMany({
            include: {
                Menu: true, // Mengambil informasi menu
            },
        });

        // Membuat objek untuk menyimpan jumlah pemesanan per menu
        const menuCount: { [key: string]: number } = {};

        // Menghitung jumlah pemesanan untuk setiap menu
        orderLists.forEach((orderList) => {
            const menuName = orderList.Menu?.name;
            if (menuName) {
                if (!menuCount[menuName]) {
                    menuCount[menuName] = 0; 
                }
                menuCount[menuName] += orderList.quantity; 
            }
        });

        // Mengubah objek menjadi array untuk dikirim sebagai respons
        const result = Object.entries(menuCount).map(([name, count]) => ({
            name,
            count,
        }));

        response.json({
            status: true,
            data: result,
            message: "All report menu are retrieved",
        }).status(200);
    } catch (error) {
        response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}