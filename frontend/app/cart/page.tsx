'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdPlaylistPlay } from 'react-icons/md';
import { BASE_IMAGE_PRODUCT } from '@/global';
import { FaBoxOpen } from 'react-icons/fa';

type Product = {
    name: string;
    price: number;
    picture: string;
};

type OrderList = {
    Product: Product;
};

type User = {
    name: string;
};

type Carts= {
    uuid: string;
    customer: string;
    status: string;
    size: string;
    total_price: number;
    alamat: string;
    User: User;
    orderLists: OrderList[];
};

const STATUS_OPTIONS = ['ALL', 'NEW', 'PROCESSING', 'DONE'];

export default function PlaylistPage() {
    const [carts, setCarts] = useState<Carts[]>([]);
    const [filtered, setFiltered] = useState<Carts[]>([]);
    const [selectedStatus, setSelectedStatus] = useState('ALL');
    const router = useRouter();

    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const res = await fetch('http://localhost:7000/order');
                const data = await res.json();
                setCarts(data.data || []);
                setFiltered(data.data || []);
            } catch (error) {
                console.error('Failed to fetch playlists:', error);
            }
        };

        fetchCarts();
    }, []);

    useEffect(() => {
        if (selectedStatus === 'ALL') {
            setFiltered(carts);
        } else {
            setFiltered(carts.filter((p) => p.status === selectedStatus));
        }
    }, [selectedStatus, carts]);

    return (
        <div className="min-h-screen pt-24 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-center text-orange-700 flex items-center justify-center gap-2">
                    <MdPlaylistPlay size={30} />
                    Riwayat Pemesanan
                </h1>

                {/* FILTER BUTTON */}
                <div className="flex justify-center gap-2 flex-wrap">
                    {STATUS_OPTIONS.map((status) => (
                        <button
                            key={status}
                            onClick={() => setSelectedStatus(status)}
                            className={`px-4 py-1 text-sm rounded-full border transition-all ${
                                selectedStatus === status
                                    ? 'bg-orange-500 text-white border-orange-500'
                                    : 'text-gray-700 bg-white hover:bg-orange-100 border-gray-300'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {/* CARD GRID */}
                {filtered.length === 0 ? (
                    <p className="text-center text-gray-500 text-sm">Tidak ada pesanan dengan status "{selectedStatus}".</p>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {filtered.map((cart) => {
                            const productImage = cart.orderLists?.[0]?.Product?.picture;
                            return (
                                <div
                                    key={cart.uuid}
                                    className="bg-white rounded-2xl shadow-md border group transition-all duration-300 overflow-hidden flex flex-col max-w-md"
                                >
                                    {productImage && (
                                        <img
                                            src={`${BASE_IMAGE_PRODUCT}/${productImage}`}
                                            alt="Product"
                                            className="max-w-[150px] min-h-[150px] object-cover mx-auto mt-4 rounded-lg group-hover:scale-105 transition-transform duration-300"
                                        />
                                    )}

                                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <h2 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 truncate">
                                                    {cart.customer}
                                                </h2>
                                                <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                                                    cart.status === 'NEW'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : cart.status === 'PROCESSING'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-green-100 text-green-700'
                                                }`}>
                                                    {cart.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">Ukuran: <b>{cart.size}</b></p>
                                            <p className="text-sm text-gray-600 truncate">Alamat: {cart.alamat}</p>
                                            <p className="text-sm text-gray-700 font-medium mt-1">
                                                Total: Rp{cart.total_price.toLocaleString()}
                                            </p>
                                        </div>

                                        <div className="mt-4 flex justify-between items-center">
                                            <button
                                                onClick={() => router.push(`/cart/${cart.uuid}`)}
                                                className="text-sm text-white bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded-md transition">
                                                Lihat Detail
                                            </button>
                                            <FaBoxOpen className="text-orange-400" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
