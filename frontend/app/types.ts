export interface IProduct {
    id: number;
    uuid: string;
    name: string;
    price: number;
    mainCategory: string;
    subCategory: string;
    description: string;
    picture: string;
}


export interface IUser {
    id: number,
    uuid: string,
    name: string,
    email: string,
    password: string,
    profile_picture: string,
    role: string,
    alamat: string,
    telephone: string,
    createdAt: string,
    updatedAt: string
}

export interface IOrder {
    orderLists: any;
    id: number;
    uuid: string;
    customer: string;
    alamat: string;
    total_price: number;
    payment_method: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
}

export interface IOrderList {
    id: number;
    uuid: string;
    quantity: number;
    note: string;
    createdAt: string;
    updatedAt: string;
    menuId?: number;
    orderId?: number;
}