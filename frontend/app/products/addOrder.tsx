"use client"

import { IOrder } from "@/app/types"
import { BASE_API_URL } from "@/global"
import { getCookies } from "@/lib/client-cookies"
import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { ButtonPrimary, ButtonSuccess, ButtonDanger } from "@/components/button"
import { InputGroupComponent } from "@/components/InputComponent"
import Modal from "@/components/modal"
import Select from "@/components/select"

const AddOrder = ({ orderLists }: { orderLists: { id: number; qty: number }[] }) => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const [order, setOrder] = useState<IOrder>({
        id: 0, uuid: ``, customer: ``, alamat: ``, total_price: 0,
        payment_method: ``, status: ``, createdAt: ``, updatedAt: ``, userId: 0, orderLists: [],
    });
    

    const [orderNote, setOrderNote] = useState<string>("");

    const router = useRouter();
    const TOKEN = getCookies("token") || "";
    const formRef = useRef<HTMLFormElement>(null);

    const openModal = () => {
        setOrder({ ...order, orderLists }); // Set orderLists dari transaksi
        setIsShow(true);
        if (formRef.current) formRef.current.reset();
    };

    interface IOrderListItem {
        id: number;
        qty: number;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const url = `${BASE_API_URL}/order`;
            const userId = Number(getCookies("id")) || "";
            console.log("id user", getCookies("id"))
    
            if (!userId) {
                toast("User not found", { hideProgressBar: true, containerId: "toastOrder", type: "error" });
                return;
            }
    
            const orderlists = order.orderLists.map((item: IOrderListItem) => ({
                menuId: item.id,
                quantity: item.qty,
                note: orderNote || "",  // Menyimpan note di setiap item
            }));
    
            const payload = {
                customer: order.customer,
                table_number: order.alamat,
                payment_method: order.payment_method,
                status: order.status,
                orderlists,
                user: { id: Number(userId) },
            };
    
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TOKEN}`,
                },
                body: JSON.stringify(payload),
            });
    
            const data = await response.json();
    
            if (data?.status) {
                setIsShow(false);
                toast(data?.message, { hideProgressBar: true, containerId: "toastOrder", type: "success" });
                setTimeout(() => {router.refresh(), 1000});
            } else {
                toast(data?.message, { hideProgressBar: true, containerId: "toastOrder", type: "warning" });
            }
        } catch (error) {
            console.log(error);
            toast("Something went wrong", { hideProgressBar: true, containerId: "toastOrder", type: "error" });
        }
    };
    

    return (
        <div>
            <ToastContainer containerId={`toastOrder`} />
            <ButtonSuccess type="button" onClick={openModal}>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Order
                </div>
            </ButtonSuccess>
            <Modal isShow={isShow} onClose={(state) => setIsShow(state)}>
                <form onSubmit={handleSubmit} ref={formRef} className="text-left">
                    <div className="p-5">
                        <InputGroupComponent id="customer" type="text" value={order.customer} onChange={(val) => setOrder({ ...order, customer: val })} required label="Customer" className="text-black" />
                        <InputGroupComponent id="table_number" type="text" value={order.alamat} onChange={(val) => setOrder({ ...order, alamat: val })} required label="Table" className="text-black" />
                        <Select id="payment_method" value={order.payment_method} label="Payment Method" required onChange={(val) => setOrder({ ...order, payment_method: val })} className="text-black">
                            <option value="">--- Select Payment ---</option>
                            <option value="CASH">CASH</option>
                            <option value="QRIS">QRIS</option>
                        </Select>
                        <Select id="status" value={order.status} label="Status Method" required onChange={(val) => setOrder({ ...order, status: val })} className="text-black">
                            <option value="">--- Select Status ---</option>
                            <option value="NEW">NEW</option>
                            <option value="PAID">PAID</option>
                            <option value="DONE">DONE</option>
                        </Select>
                        <InputGroupComponent
                            id="order-note"
                            type="text"
                            value={orderNote}
                            onChange={(val) => setOrderNote(val)}
                            label="Order Note"
                            className="text-black"
                        />
                    </div>
                    <div className="w-full p-5 flex rounded-b-2xl shadow">
                        <div className="flex ml-auto gap-2">
                            <ButtonDanger type="button" onClick={() => setIsShow(false)}>Cancel</ButtonDanger>
                            <ButtonPrimary type="submit">Save</ButtonPrimary>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AddOrder;
