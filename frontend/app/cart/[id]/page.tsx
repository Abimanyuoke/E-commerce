'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BASE_IMAGE_PRODUCT, BASE_IMAGE_PROFILE } from '@/global';

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
        return <div className="p-10 text-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen pt-24 px-6 max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-orange-600 text-center">Order Detail</h1>

            <div className="bg-white shadow-md p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Customer Info</h2>
                <div className="flex items-center gap-4">
                    <img
                        src={`${BASE_IMAGE_PROFILE}/${order.User.profile_picture}`}
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                        <p className="font-semibold">{order.User.name}</p>
                        <p className="text-sm text-gray-500">{order.User.email}</p>
                        <p className="text-sm text-gray-500">{order.User.telephone}</p>
                        <p className="text-sm text-gray-500">{order.User.alamat}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-md p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Order Info</h2>
                <div className="space-y-1">
                    <p><span className="font-semibold">UUID:</span> {order.uuid}</p>
                    <p><span className="font-semibold">Customer:</span> {order.customer}</p>
                    <p><span className="font-semibold">Alamat:</span> {order.alamat}</p>
                    <p><span className="font-semibold">Total Price:</span> Rp{order.total_price.toLocaleString()}</p>
                    <p><span className="font-semibold">Payment Method:</span> {order.payment_method}</p>
                    <p><span className="font-semibold">Size:</span> {order.size}</p>
                    <p><span className="font-semibold">Status:</span> {order.status}</p>
                    <p><span className="font-semibold">Created At:</span> {new Date(order.createdAt).toLocaleString()}</p>
                </div>
            </div>

            <div className="bg-white shadow-md p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Ordered Products</h2>
                <div className="space-y-4">
                    {order.orderLists.map((item) => (
                        <div key={item.uuid} className="flex gap-4 items-center border-b pb-4">
                            <img
                                src={`${BASE_IMAGE_PRODUCT}/${item.Product.picture}`}
                                alt={item.Product.name}
                                className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div>
                                <p className="font-semibold">{item.Product.name}</p>
                                <p className="text-sm text-gray-500">Rp{item.Product.price.toLocaleString()}</p>
                                <p className="text-sm">Qty: {item.quantity}</p>
                                <p className="text-sm italic text-gray-500">Note: {item.note}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
