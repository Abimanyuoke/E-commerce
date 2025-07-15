"use client";

import { useSearchParams } from "next/navigation";

const CheckoutPage = () => {
    const searchParams = useSearchParams();
    const ids = searchParams.get("ids");
    const parsedIds = ids ? ids.split(",").map(Number) : [];

    return (
        <div className="p-10">
            <h1 className="text-xl font-bold mb-4">Checkout</h1>
            <p>Produk yang dipesan: {parsedIds.join(", ")}</p>

            {/* Lanjutkan dengan form customer, alamat, metode pembayaran, dll */}
        </div>
    );
};

export default CheckoutPage;
