"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { IProduct, IOrder } from "@/app/types";
import { getCookies } from "@/lib/client-cookies";
import { BASE_API_URL, BASE_IMAGE_PRODUCT } from "../global";
import { get } from "@/lib/bridge";
import { AlertToko } from "../components/alert";
import { ButtonPrimary, ButtonDanger, ButtonOrder } from "../components/button";
import { TiShoppingCart } from "react-icons/ti";
import { toast } from "sonner";
import { InputGroupComponent, TextGroupComponent } from "../components/InputComponent";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import CardSelect from "../components/card";
import Image from "next/image";
import Search from "./search";
import axios from "axios";
import Navbar_Products from "../components/navbar_products/page";

const OrderPage = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || "";
    const router = useRouter();

    const subCategoryMap: Record<string, string[]> = {
        WANITA: ["BLOUSE", "DRESS", "ROK", "TUNIK", "OUTER", "HIJAB", "SETELAN_FORMAL"],
        PRIA: ["KAOS", "KEMEJA", "CELANA", "JAKET", "BATIK", "SWEATER"],
        ANAK: ["BAJU_ANAK", "SETELAN_ANAK", "KAOS_ANAK", "CELANA_ANAK"],
        SEPATU: ["SEPATU_PRIA", "SEPATU_WANITA", "SNEAKERS", "SEPATU_ANAK", "SEPATU_OLAHRAGA"],
        TAS: ["TAS_PRIA", "TAS_WANITA", "RANSEL", "SELEMPANG"],
        SPORTS: ["JERSEY", "TRAINING", "LEGGING", "SPORT_BRA", "CELANA_OLAHRAGA"],
    };

    const [selectedMainCategory, setSelectedMainCategory] = useState<string>("ALL");
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>("ALL");



    /** ---------- STATE ---------- */
    const [product, setProduct] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [orderQty, setOrderQty] = useState<{ [key: number]: number }>({});
    const [order, setOrder] = useState(false);
    const [selectedOrderIds, setSelectedOrderIds] = useState<number[]>([]);
    const [orderNote, setOrderNote] = useState<string>("");

    const [orderForm, setOrderForm] = useState<IOrder>({
        id: 0,
        uuid: "",
        customer: "",
        alamat: "",
        total_price: 0,
        payment_method: "",
        status: "NEW",
        createdAt: "",
        updatedAt: "",
        userId: 0,
        orderLists: [],
    });

    const formRef = useRef<HTMLFormElement>(null);

    /** ---------- HELPER ---------- */
    const handleCart = () => setOrder(!order);

    const resetOrderState = () => {
        setOrderQty({});
        setSelectedOrderIds([]);
        setOrderForm({
            id: 0,
            uuid: "",
            customer: "",
            alamat: "",
            total_price: 0,
            payment_method: "",
            status: "",
            createdAt: "",
            updatedAt: "",
            userId: 0,
            orderLists: [],
        });
        setOrderNote("");
        setOrder(false);
    };

    /** ---------- FETCH MENU ---------- */
    const getMenu = async () => {
        try {
            const TOKEN = getCookies("token") || "";
            const url = `${BASE_API_URL}/product?search=${search}`;
            const { data } = await get(url, TOKEN);
            if ((data as { status: boolean; data: IProduct[] }).status) {
                setProduct((data as { status: boolean; data: IProduct[] }).data);
            }
        } catch (error) {
            console.error("Error getmenu menu:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMenu();
    }, [search]);

    /** ---------- CART ---------- */
    const handleAddToCart = (id: number) => {
        if (!selectedOrderIds.includes(id)) {
            setSelectedOrderIds((prev) => [...prev, id]);
            setOrderQty((prevQty) => ({ ...prevQty, [id]: 1 }));
        } else {
            updateQty(id, true);
        }
    };

    { /*  */ }

    //     const handleAddToCart = (id: number) => {
    //     const updatedIds = [...selectedOrderIds, id];
    //     const uniqueIds = Array.from(new Set(updatedIds)); // avoid duplicates

    //     setSelectedOrderIds(uniqueIds);
    //     setOrderQty((prevQty) => ({ ...prevQty, [id]: (prevQty[id] || 0) + 1 }));

    //     const idsParam = uniqueIds.join(",");
    //     router.push(`/checkout?ids=${idsParam}`);
    // };


    const handleRemoveFromCart = (id: number) => {
        setSelectedOrderIds((prev) => prev.filter((item) => item !== id));
        setOrderQty((prev) => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
        });
    };

    const updateQty = (id: number, increment: boolean) => {
        setOrderQty((prevQty) => {
            const currentQty = prevQty[id] || 0;
            const newQty = increment ? currentQty + 1 : currentQty - 1;

            if (newQty <= 0) {
                setSelectedOrderIds((prev) => prev.filter((itemId) => itemId !== id));
                const updatedQty = { ...prevQty };
                delete updatedQty[id];
                return updatedQty;
            }
            return { ...prevQty, [id]: newQty };
        });
    };

    const totalTransaction = selectedOrderIds.reduce((total, orderId) => {
        const menuItem = product.find((item) => item.id === orderId);
        const qty = orderQty[orderId] || 0;
        return total + (menuItem ? qty * menuItem.price : 0);
    }, 0);

    /** ---------- SUBMIT ORDER ---------- */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const TOKEN = getCookies("token") || "";
        const userId = Number(getCookies("id"));

        if (!userId) {
            toast.error("User not found", { duration: 2000 });
            return;
        }

        const orderlists = Object.keys(orderQty)
            .filter((id) => orderQty[Number(id)] > 0)
            .map((id) => ({
                menuId: Number(id),
                quantity: orderQty[Number(id)],
                note: orderNote || "",
            }));

        const payload = {
            customer: orderForm.customer,
            alamat: orderForm.alamat,
            payment_method: orderForm.payment_method,
            status: orderForm.status,
            orderlists,
            user: { id: userId },
        };

        try {
            const response = await axios.post(`${BASE_API_URL}/order`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TOKEN}`,
                },
            });

            const data = response.data as { status: boolean; message: string };
            if (data.status) {
                toast.success(data.message, { duration: 2000 });
                setTimeout(() => {
                    resetOrderState();
                    router.refresh();
                }, 1500);
            } else {
                toast.warning(data.message, { duration: 2000 });
            }
        } catch (error) {
            toast.error("Something went wrong", { duration: 2000 });
        }
    };

    const mainCategoryLabel: Record<string, { label: string; color: string }> = {
        WANITA: { label: "Wanita", color: "bg-pink-100 text-pink-800" },
        PRIA: { label: "Pria", color: "bg-green-100 text-green-800" },
        ANAK: { label: "Anak", color: "bg-yellow-100 text-yellow-800" },
        SEPATU: { label: "Sepatu", color: "bg-blue-100 text-blue-800" },
        TAS: { label: "Tas", color: "bg-purple-100 text-purple-800" },
        SPORTS: { label: "Olahraga", color: "bg-teal-100 text-teal-800" },
    };

    const subCategoryLabel: Record<string, string> = {
        BLOUSE: "Blouse",
        DRESS: "Dress",
        ROK: "Rok",
        TUNIK: "Tunik",
        OUTER: "Outer",
        HIJAB: "Hijab",
        SETELAN_FORMAL: "Setelan Formal",
        KAOS: "Kaos",
        KEMEJA: "Kemeja",
        CELANA: "Celana",
        JAKET: "Jaket",
        BATIK: "Batik",
        SWEATER: "Sweater",
        BAJU_ANAK: "Baju Anak",
        SETELAN_ANAK: "Setelan Anak",
        KAOS_ANAK: "Kaos Anak",
        CELANA_ANAK: "Celana Anak",
        SEPATU_PRIA: "Sepatu Pria",
        SEPATU_WANITA: "Sepatu Wanita",
        SNEAKERS: "Sneakers",
        SEPATU_ANAK: "Sepatu Anak",
        SEPATU_OLAHRAGA: "Sepatu Olahraga",
        TAS_PRIA: "Tas Pria",
        TAS_WANITA: "Tas Wanita",
        RANSEL: "Ransel",
        SELEMPANG: "Selempang",
        JERSEY: "Jersey",
        TRAINING: "Training",
        LEGGING: "Legging",
        SPORT_BRA: "Sport Bra",
        CELANA_OLAHRAGA: "Celana Olahraga",
    };


    /** ---------- BADGE CATEGORY ---------- */
    const renderCategoryBadge = (mainCat: string, subCat?: string): React.ReactNode => {
        const main = mainCategoryLabel[mainCat];
        const sub = subCat ? subCategoryLabel[subCat] : null;

        return (
            <div className="flex flex-wrap gap-2">
                {main && (
                    <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${main.color}`}>
                        {main.label}
                    </span>
                )}
                {sub && (
                    <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-gray-200 text-gray-800">
                        {sub}
                    </span>
                )}
            </div>
        );
    };


    /** ---------- RENDER ---------- */
    return (
        <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
            <div className="sticky top-0 z-50 shadow-md">
                <Navbar_Products />
            </div>
            {/* ----------------- CART BUTTON ----------------- */}
            <div className="fixed z-50 right-0 pr-10 pt-4">
                <button onClick={() => setOrder(true)}>
                    <div className="bg-black py-1 px-2 flex items-center justify-center rounded-md relative">
                        <TiShoppingCart className="text-2xl text-white" />
                        <p className="text-white font-semibold text-lg">Cart</p>
                    </div>
                    {selectedOrderIds.length > 0 && (
                        <span className="absolute top-2 right-8 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                            {selectedOrderIds.length}
                        </span>
                    )}
                </button>
            </div>

            {/* ----------------- HEADER & SEARCH ----------------- */}
            <div className="mt-2 rounded-lg">
                <div className="flex flex-col my-5 px-10">
                    <h4 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Shopsy Pakaian Yang Tersedia
                    </h4>
                    <p className="mb-2 text-lg">Silakan pilih tanaman yang ingin dipesan.</p>
                </div>

                {/* ⭐️ KATEGORI FILTER */}
                <div className="flex flex-wrap gap-2 px-10 mb-4">
                    {["ALL", ...Object.keys(subCategoryMap)].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setSelectedMainCategory(cat);
                                setSelectedSubCategory("ALL"); // reset subcategory on main category change
                            }}
                            className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${selectedMainCategory === cat
                                ? "bg-green-600 text-white border-green-600"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                }`}
                        >
                            {cat === "ALL" ? "Semua Kategori" : cat}
                        </button>
                    ))}
                </div>

                {selectedMainCategory !== "ALL" && (
                    <div className="flex flex-wrap gap-2 px-10 mb-6">
                        <button
                            onClick={() => setSelectedSubCategory("ALL")}
                            className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${selectedSubCategory === "ALL"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                }`}
                        >
                            Semua Subkategori
                        </button>
                        {subCategoryMap[selectedMainCategory].map((subcat) => (
                            <button
                                key={subcat}
                                onClick={() => setSelectedSubCategory(subcat)}
                                className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${selectedSubCategory === subcat
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                    }`}
                            >
                                {subcat.replace(/_/g, " ")}
                            </button>
                        ))}
                    </div>
                )}


                {/* ----------------- LIST PRODUCT ----------------- */}
                {loading ? (
                    <p className="text-white">Loading...</p>
                ) : product.length === 0 ? (
                    <AlertToko title="Informasi">No data available</AlertToko>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 place-items-center gap-4 my-10 p-6 ">
                        {product
                            .filter((data) => {
                                const mainMatch =
                                    selectedMainCategory === "ALL" || data.mainCategory === selectedMainCategory;
                                const subMatch =
                                    selectedSubCategory === "ALL" || data.subCategory === selectedSubCategory;
                                return mainMatch && subMatch;
                            })

                            .map((data) => (
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4" key={data.id} data-aos="zoom-in">
                                    <div
                                        className="rounded-2xl bg-white dark:bg-gray-900 shadow-xl group transition-all duration-300 hover:bg-black/80 hover:text-white hover:scale-[1.02] hover:shadow-2xl w-[250px] h-[450px] overflow-hidden flex flex-col">
                                        {/* Badge Kategori */}
                                        <div className="p-4 mb-5">
                                            {renderCategoryBadge(data.mainCategory, data.subCategory)}
                                        </div>

                                        {/* Gambar Produk */}
                                        <div className="relative z-10 flex justify-center mb-2">
                                            <Image
                                                width={300}
                                                height={300}
                                                src={`${BASE_IMAGE_PRODUCT}/${data.picture}`}
                                                className="w-36 h-36 object-contain transform group-hover:scale-105 transition duration-300 drop-shadow-md"
                                                alt="preview"
                                                unoptimized/>
                                        </div>

                                        {/* Konten dan Tombol */}
                                        <div className="flex flex-col flex-1 justify-between px-4 pb-4">
                                            <div className="space-y-1 text-left">
                                                <h5 className="font-bold text-xl text-gray-800 group-hover:text-white dark:text-white">{data.name}</h5>
                                                <p className="text-sm text-gray-600 group-hover:text-white dark:text-gray-300 line-clamp-2">{data.description}</p>
                                                <span className="font-bold text-primary text-lg block mt-1">
                                                    Rp {data.price.toLocaleString()}
                                                </span>
                                            </div>

                                            {/* Tombol Order Now */}
                                            <div className="mt-auto pt-4">
                                                <ButtonOrder
                                                    type="button"
                                                    onClick={() => handleAddToCart(data.id)}
                                                    className="w-full py-3 rounded-xl text-white bg-primary hover:bg-orange-600 transition">
                                                    Order Now
                                                </ButtonOrder>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}

                {/* ----------------- MODAL CART ----------------- */}
                {order && (
                    <div className="fixed bg-black/60 backdrop-blur-sm flex items-center justify-center inset-0 z-[9999]">
                        <div className="relative bg-white shadow-lg p-6 rounded-xl w-[90%] max-w-8xl overflow-y-auto max-h-[90vh]">
                            <form onSubmit={handleSubmit} ref={formRef}>
                                {selectedOrderIds.length === 0 ? (
                                    <div className="text-center text-gray-500 my-10">
                                        <button
                                            onClick={handleCart}
                                            className="text-red-500 text-xl absolute top-5 right-5"
                                        >
                                            <IoIosCloseCircleOutline />
                                        </button>
                                        <p className="text-lg font-semibold">Keranjang Kosong</p>
                                        <p className="text-sm">
                                            Silakan tambahkan menu terlebih dahulu.
                                        </p>
                                    </div>
                                ) : (
                                    product
                                        .filter((item) => selectedOrderIds.includes(item.id))
                                        .map((data) => {
                                            const qty = orderQty[data.id] || 0;
                                            return (
                                                <div key={data.id} className="mb-6 border-b pb-4">
                                                    <div className="grid grid-cols-4 text-black font-bold gap-x-67 mb-2">
                                                        <p>Product</p>
                                                        <p>Nama</p>
                                                        <p>Qty</p>
                                                        <p>Total</p>
                                                    </div>
                                                    <div className="grid grid-cols-4 gap-x-67 items-center">
                                                        <div className="flex items-center">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleRemoveFromCart(data.id);
                                                                }}
                                                                className="text-red-500 text-lg mr-10"
                                                            >
                                                                <FaTrashAlt />
                                                            </button>
                                                            <Image
                                                                width={100}
                                                                height={100}
                                                                src={`${BASE_IMAGE_PRODUCT}/${data.picture}`}
                                                                className="rounded-lg"
                                                                alt="preview"
                                                                unoptimized
                                                            />
                                                        </div>
                                                        <h5 className="font-bold text-base mt-2">
                                                            {data.name}
                                                        </h5>
                                                        <div className="flex items-center space-x-3 mt-2">
                                                            <button
                                                                className="text-gray-500 text-3xl cursor-pointer"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    updateQty(data.id, false);
                                                                }}
                                                                disabled={orderQty[data.id] <= 0}
                                                            >
                                                                <CiSquareMinus />
                                                            </button>
                                                            <span className="text-lg text-gray-900">
                                                                {orderQty[data.id] || 0}
                                                            </span>
                                                            <button
                                                                className="text-gray-500 text-3xl cursor-pointer"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    updateQty(data.id, true);
                                                                }}
                                                            >
                                                                <CiSquarePlus />
                                                            </button>
                                                        </div>
                                                        <span className="font-bold block mt-1">
                                                            Rp {(qty * data.price).toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })
                                )}

                                {selectedOrderIds.length > 0 && (
                                    <>
                                        {/* -------- FORM ORDER -------- */}
                                        <InputGroupComponent
                                            id="customer"
                                            type="text"
                                            value={orderForm.customer}
                                            onChange={(val: any) =>
                                                setOrderForm({ ...orderForm, customer: val })
                                            }
                                            required
                                            label="Customer"
                                            className="text-black"
                                        />
                                        <InputGroupComponent
                                            id="table_number"
                                            type="text"
                                            value={orderForm.alamat}
                                            onChange={(val: any) =>
                                                setOrderForm({ ...orderForm, alamat: val })
                                            }
                                            required
                                            label="Address"
                                            className="text-black"
                                        />
                                        <CardSelect
                                            value={orderForm.payment_method}
                                            onChange={(val: any) =>
                                                setOrderForm({ ...orderForm, payment_method: val })
                                            }
                                            label="Payment Method"
                                            required
                                            options={[
                                                { value: "CASH", label: "CASH" },
                                                { value: "QRIS", label: "QRIS" },
                                            ]}
                                        />
                                        <TextGroupComponent
                                            id="order-note"
                                            value={orderNote}
                                            onChange={(val: any) => setOrderNote(val)}
                                            label="Order Note"
                                            className="text-black"
                                            type="text"
                                        />

                                        {/* -------- DETAIL -------- */}
                                        <div className="mt-6 rounded-lg text-gray-700">
                                            <h4 className="text-lg font-bold">
                                                Transaction Details
                                            </h4>
                                            <ul className="text-sm">
                                                {selectedOrderIds.map((orderId) => {
                                                    const menuItem = product.find(
                                                        (item) => item.id === orderId
                                                    );
                                                    if (!menuItem) return null;
                                                    const qty = orderQty[orderId] || 0;
                                                    return (
                                                        <li
                                                            key={orderId}
                                                            className="flex justify-between border-b py-1"
                                                        >
                                                            <span>
                                                                {menuItem.name} x {qty}
                                                            </span>
                                                            <span>
                                                                Rp {(qty * menuItem.price).toLocaleString()}
                                                            </span>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                            <h4 className="text-lg font-bold mt-3">
                                                Total: Rp {totalTransaction.toLocaleString()}
                                            </h4>
                                        </div>

                                        {/* -------- ACTION -------- */}
                                        <div className="flex justify-end gap-2 mt-4">
                                            <ButtonDanger type="button" onClick={resetOrderState}>
                                                Cancel
                                            </ButtonDanger>
                                            <ButtonPrimary type="submit">
                                                Order Sekarang
                                            </ButtonPrimary>
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderPage;
