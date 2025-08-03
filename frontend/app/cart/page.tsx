'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaMusic } from 'react-icons/fa';
import { MdPlaylistPlay } from 'react-icons/md';
import { BASE_IMAGE_PRODUCT } from '@/global';


type Product = {
    picture: string;
};

type Order = {
    Product: Product;
};

type Playlist = {
    uuid: string;
    customer: string;
    status: string;
    size: string;
    picture: string;
    total_price: number;
    alamat: string;
    User: any;
    orderLists: Order[];
};

export default function PlaylistPage() {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const res = await fetch('http://localhost:7000/order');
                const data = await res.json();
                setPlaylists(data.data || []);
            } catch (error) {
                console.error("Failed to fetch playlists:", error);
            }
        };

        fetchPlaylists();
    }, []);

    

    return (
        <div className="min-h-screen pt-24 px-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold text-center text-orange-700 flex items-center justify-center gap-2">
                    <MdPlaylistPlay size={30} />
                    My Playlists
                </h1>

                {playlists.length === 0 ? (
                    <p className="text-center text-gray-500 text-sm">No playlists found.</p>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {playlists.map((playlist) => (
                            <div
                                key={playlist.uuid}
                                onClick={() => router.push(`/playlist/${playlist.uuid}`)}
                                className="cursor-pointer bg-white p-5 rounded-2xl shadow-md border hover:shadow-lg transition duration-200 group"
                            >
                                {playlist.orderLists.map((order, idx) => (
                                    <img key={idx}
                                        src={`${BASE_IMAGE_PRODUCT}/${order.Product.picture}`}
                                        alt={"Gambar"}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                ))}


                                <div className="flex items-center gap-3 mb-3">
                                    <FaMusic className="text-orange-500 group-hover:scale-110 transition duration-200" size={28} />
                                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 flex gap-4">
                                        {playlist.customer}
                                        {playlist.size}
                                        {playlist.status}
                                        {playlist.alamat}
                                        {playlist.User?.name}
                                    </h2>
                                </div>
                                <p className="text-sm text-gray-600">🎵 {playlist.total_price} songs</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
