'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaArrowLeft, FaHeart, FaSearch } from 'react-icons/fa';

type Song = {
    thumbnail: any;
    uuid: string;
    title: string;
    artist: string;
    description: string;
    source: string;
    likes: number;
};

export default function PlaylistDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [songs, setSongs] = useState<Song[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // Loading selama 3 detik

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!id) return;
        const fetchSongs = async () => {
            setLoading(true);
            const res = await fetch(
                `https://learn.smktelkom-mlg.sch.id/ukl2/playlists/song-list/${id}?search=${search}`
            );
            const data = await res.json();
            setSongs(data.data);
            setLoading(false);
        };

        fetchSongs();
    }, [id, search]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <button
                    onClick={() => router.push('/playlist')}
                    className="flex items-center text-blue-600 hover:underline text-sm"
                >
                    <FaArrowLeft className="mr-1" /> Back to Playlist
                </button>

                <div className="relative">
                    <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search song or artist..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded border focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>

                {loading ? (
                    <p className="text-center text-sm text-gray-500 ">Loading songs...</p>
                ) : songs.length === 0 ? (
                    <p className="text-center text-sm text-gray-500">No songs found.</p>
                ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                        {songs.map((song) => (
                            <div
                                key={song.uuid}
                                onClick={() => router.push(`/song/${song.uuid}`)}
                                className="bg-white p-4 rounded-xl shadow hover:shadow-md transition-all duration-200 flex space-x-4"
                            >
                                <img
                                    src={`https://learn.smktelkom-mlg.sch.id/ukl2/thumbnail/${song.thumbnail}`}
                                    alt={song.title}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div className="flex flex-col justify-between w-full">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">{song.title}</h3>
                                        <p className="text-sm text-gray-600">{song.artist}</p>
                                        <p className="text-xs text-gray-500 mt-1">{song.description}</p>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-500 pt-2">
                                        <span className="flex items-center gap-1">
                                            <FaHeart className="text-red-500" /> {song.likes}
                                        </span>
                                        {/* <span className="text-xs">More options...</span> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
