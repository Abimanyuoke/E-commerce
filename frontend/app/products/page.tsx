"use client"

import { IProduct } from "@/app/types";
import { getCookies } from "../../lib/client-cookies";
import { BASE_API_URL, BASE_IMAGE_PRODUCT } from "../global";
import { get } from "../../lib/bridge";
import { AlertInfo } from "../components/alert";
import Image from "next/image";
import Search from "./search";
// import AddProduct from "./addProduct";
// import EditProduct from "./editProduct";
// import DeleteProduct from "./deleteProduct";

interface ApiResponse {
    status: boolean;
    data: IProduct[];
}

const getProducts = async (search: string): Promise<IProduct[]> => {
    try {
        const TOKEN = getCookies("token") || "";
        const url = `${BASE_API_URL}/products?search=${search}`;
        const response = await get(url, TOKEN);
        const data = response.data as ApiResponse;
        return data.status ? [...data.data] : [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

const categoryDisplay = (main: string, sub: string): React.ReactNode => {
    return (
        <div className="flex flex-col">
            <span className="text-xs text-white bg-slate-700 px-2 py-1 rounded">
                Main: {main.replaceAll("_", " ")}
            </span>
            <span className="text-xs text-white bg-slate-600 px-2 py-1 rounded mt-1">
                Sub: {sub.replaceAll("_", " ")}
            </span>
        </div>
    );
};

const ProductPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const search = searchParams.search?.toString() || "";
    const products: IProduct[] = await getProducts(search);

    return (
        <div className="p-6 bg-slate-900 border-t-4 border-primary shadow-lg">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Product Data</h2>
                <p className="text-sm text-secondary">
                    Manage your products here by searching, adding, editing, or deleting items.
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="w-full md:w-1/2">
                    <Search url="/manager/product" search={search} />
                </div>
                <AddProduct />
            </div>

            {products.length === 0 ? (
                <AlertInfo title="Information">No data available</AlertInfo>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {products.map((data, index) => (
                        <div
                            key={`product-${index}`}
                            className="bg-slate-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                <div className="md:col-span-1 flex justify-center md:justify-start">
                                    <Image
                                        width={60}
                                        height={60}
                                        src={`${BASE_IMAGE_PRODUCT}/${data.picture}`}
                                        className="rounded-md object-cover"
                                        alt="Product Preview"
                                        unoptimized
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <p className="text-xs text-primary font-bold">Name</p>
                                    <p className="text-white">{data.name}</p>
                                </div>

                                <div className="md:col-span-1">
                                    <p className="text-xs text-primary font-bold">Price</p>
                                    <p className="text-white">{data.price}</p>
                                </div>

                                <div className="md:col-span-4">
                                    <p className="text-xs text-primary font-bold">Description</p>
                                    <p className="text-white line-clamp-2">{data.description}</p>
                                </div>

                                <div className="md:col-span-2">
                                    <p className="text-xs text-primary font-bold">Category</p>
                                    <div>{categoryDisplay(data.mainCategory, data.subCategory)}</div>
                                </div>

                                <div className="md:col-span-2">
                                    <p className="text-xs text-primary font-bold">Actions</p>
                                    <div className="flex gap-2 mt-1">
                                        <EditProduct selectedProduct={data} />
                                        <DeleteProduct selectedProduct={data} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductPage