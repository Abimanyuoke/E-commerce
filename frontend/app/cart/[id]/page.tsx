'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BASE_IMAGE_PRODUCT, BASE_IMAGE_PROFILE } from '@/global';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

type Product = {
    id: number;
    name: string;
    price: number;
    picture: string;
};

type OrderList = {
    id: number;
    uuid: string;
    quantity: number;
    note: string;
    Product: Product;
};

type User = {
    name: string;
    email: string;
    alamat: string;
    telephone: string;
    profile_picture: string;
};

type Order = {
    uuid: string;
    customer: string;
    total_price: number;
    payment_method: string;
    alamat: string;
    status: string;
    size: string;
    createdAt: string;
    User: User;
    orderLists: OrderList[];
};

export default function OrderDetailPage() {
    const { id } = useParams();
    const [order, setOrder] = useState<Order | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:7000/order/${id}`);
                const data = await res.json();
                setOrder(data.data);
            } catch (error) {
                console.error('Failed to fetch order:', error);
            }
        };

        if (id) fetchData();
    }, [id]);

    if (!order) {
        return <div className="p-10 text-center text-gray-600">Loading...</div>;
    }

    return (
        <div className="min-h-screen pt-24 px-6 max-w-5xl mx-auto space-y-10 relative">

            <button
                onClick={() => router.back()}
                className="absolute top-6 left-6 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow hover:bg-orange-50 hover:text-orange-600 text-gray-700 transition-all duration-300 border border-gray-200">
                <FaArrowLeft className="text-lg" />
                <span className="font-medium text-base">Back</span>
            </button>

            <h1 className="text-4xl font-bold text-center text-orange-600">Order Details</h1>

            {/* Customer Info */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-semibold mb-6 border-b pb-2">👤 Customer Information</h2>
                <div className="flex gap-6 items-center">
                    <img
                        src={`${BASE_IMAGE_PROFILE}/${order.User.profile_picture}`}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover border-2 border-orange-500"
                    />
                    <div className="space-y-1">
                        <p className="font-semibold text-lg">{order.User.name}</p>
                        <p className="text-gray-600 text-sm">{order.User.email}</p>
                        <p className="text-gray-600 text-sm">{order.User.telephone}</p>
                        <p className="text-gray-600 text-sm">{order.User.alamat}</p>
                    </div>
                </div>
            </section>

            {/* Order Info */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-semibold mb-6 border-b pb-2">📦 Order Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                    <p><span className="font-medium">UUID:</span> {order.uuid}</p>
                    <p><span className="font-medium">Customer:</span> {order.customer}</p>
                    <p><span className="font-medium">Alamat:</span> {order.alamat}</p>
                    <p><span className="font-medium">Total Price:</span> <span className="text-orange-600 font-semibold">Rp{order.total_price.toLocaleString()}</span></p>
                    <p><span className="font-medium">Payment:</span> {order.payment_method}</p>
                    <p><span className="font-medium">Size:</span> {order.size}</p>
                    <p>
                        <span className="font-medium">Status:</span>
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full font-semibold ${order.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                            {order.status}
                        </span>
                    </p>
                    <p><span className="font-medium">Created:</span> {new Date(order.createdAt).toLocaleString()}</p>
                </div>
            </section>

            {/* Order List */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-semibold mb-6 border-b pb-2">🛒 Ordered Products</h2>
                <div className="space-y-6">
                    {order.orderLists.map((item) => (
                        <div key={item.uuid} className="flex gap-6 items-start border-b pb-4">
                            <img
                                src={`${BASE_IMAGE_PRODUCT}/${item.Product.picture}`}
                                alt={item.Product.name}
                                className="w-[150px] h-[200px] object-cover rounded-lg border p-4"
                            />
                            <div className="space-y-1">
                                <p className="font-semibold text-lg">{item.Product.name}</p>
                                <p className="text-sm text-gray-600">Rp{item.Product.price.toLocaleString()}</p>
                                <p className="text-sm">Qty: <span className="font-medium">{item.quantity}</span></p>
                                <p className="text-sm italic text-gray-500">Note: {item.note || '—'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
