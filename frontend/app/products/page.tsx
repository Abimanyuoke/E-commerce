"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { IProduct, IOrder } from "@/app/types";
import { getCookies } from "@/lib/client-cookies";
import { BASE_API_URL, BASE_IMAGE_PRODUCT } from "../global";
import { get } from "@/lib/bridge";
import { AlertToko } from "../components/alert";
import Image from "next/image";
import { ButtonPrimary, ButtonDanger } from "../components/button";
import { TiShoppingCart } from "react-icons/ti";
import { toast } from "sonner";
import { InputGroupComponent, TextGroupComponent } from "../components/InputComponent";
import CardSelect from "../components/card";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import Search from "./search";
import axios from "axios";

const OrderPage = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || "";
    const router = useRouter();

    /** ---------- STATE ---------- */
    const [product, setProduct] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [orderQty, setOrderQty] = useState<{ [key: number]: number }>({});
    const [order, setOrder] = useState(false);
    const [selectedOrderIds, setSelectedOrderIds] = useState<number[]>([]);

    // ⭐️ state filter kategori
    const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

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

    const [orderNote, setOrderNote] = useState<string>("");
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
            const url = `${BASE_API_URL}/menu?search=${search}`;
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

    /** ---------- BADGE CATEGORY ---------- */
    const category = (cat: string): React.ReactNode => {
        if (cat === "TANAMAN_HIAS")
            return (
                <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                    Tanaman Hias
                </span>
            );
        if (cat === "PUPUK_PESTISIDA")
            return (
                <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                    Pupuk Pestisida
                </span>
            );
        if (cat === "ALAT_PERLENGKAPAN")
            return (
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                    Alat Perlengkapan
                </span>
            );
        if (cat === "TANAMAN_HERBAL")
            return (
                <span className="bg-teal-100 text-teal-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                    Tanaman Herbal
                </span>
            );
        if (cat === "BENIH_BIBIT")
            return (
                <span className="bg-pink-100 text-pink-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                    Benih Bibit
                </span>
            );
        return (
            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                -
            </span>
        );
    };

    /** ---------- RENDER ---------- */
    return (
        <div>
            {/* ----------------- CART BUTTON ----------------- */}
            <div className="sticky top-4 z-50 flex justify-end pr-10 pt-4">
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
                <div className="flex flex-col my-10 px-10">
                    <h4 className="text-xl font-bold text-slate-900">
                        Plantify Yang Tersedia
                    </h4>
                    <p className="mb-2">Silakan pilih tanaman yang ingin dipesan.</p>
                    <div className="flex items-center w-full max-w-md flex-grow">
                        <Search url={`/user/marketplace`} search={search} />
                    </div>
                </div>

                {/* ⭐️ KATEGORI FILTER */}
                <div className="flex flex-wrap gap-2 px-10 mb-6">
                    {[
                        "ALL",
                        "TANAMAN_HIAS",
                        "PUPUK_PESTISIDA",
                        "ALAT_PERLENGKAPAN",
                        "TANAMAN_HERBAL",
                        "BENIH_BIBIT",
                    ].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${selectedCategory === cat
                                ? "bg-green-600 text-white border-green-600"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                }`}
                        >
                            {cat === "ALL"
                                ? "Semua Kategori"
                                : cat
                                    .replace(/_/g, " ")
                                    .toLowerCase()
                                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </button>
                    ))}
                </div>

                {/* ----------------- LIST PRODUCT ----------------- */}
                {loading ? (
                    <p className="text-white">Loading...</p>
                ) : product.length === 0 ? (
                    <AlertToko title="Informasi">No data available</AlertToko>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 place-items-center gap-4 my-10 p-6 ">
                        {product
                            .filter(
                                (data) =>
                                    selectedCategory === "ALL" ||
                                    data.mainCategory === selectedCategory
                            )
                            .map((data) => (
                                <div
                                    key={data.id}
                                    className="p-4 rounded-lg flex flex-col items-center text-left"
                                >
                                    <div className="bg-[#2E8B57] text-white rounded-lg overflow-hidden shadow-md flex flex-col h-[450px] w-[280px] mx-auto">
                                        <Image
                                            width={300}
                                            height={300}
                                            src={`${BASE_IMAGE_PRODUCT}/${data.picture}`}
                                            className="shadow-2xl object-cover bg-white w-[290px] h-[220px] rounded-t-lg"
                                            alt="preview"
                                            unoptimized
                                        />
                                        <div className="flex flex-col justify-between flex-1 p-4 ">
                                            <div className="space-y-1">
                                                <h5 className="font-bold text-xl">{data.name}</h5>
                                                <p className="text-xs">{data.description}</p>
                                                <span className="font-bold">
                                                    Rp {data.price.toLocaleString()}
                                                </span>
                                                <div className="mt-2">{category(data.mainCategory)}</div>
                                            </div>
                                            <ButtonPrimary
                                                type="button"
                                                onClick={() => handleAddToCart(data.id)}
                                                className="py-3.5"
                                            >
                                                Beli Sekarang
                                            </ButtonPrimary>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}

                {/* ----------------- MODAL CART ----------------- */}
                {order && (
                    <div className="fixed bg-black/60 backdrop-blur-sm flex items-center justify-center inset-0 z-99999">
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
