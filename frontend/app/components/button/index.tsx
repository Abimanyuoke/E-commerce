import { ReactNode } from "react";

type Props = {
    children: ReactNode
    type: "button" | "submit" | "reset",
    onClick?: () => void
    className?: string
}

export const ButtonSuccess = ({ children, type, onClick,  className }: Props) => {
    return (
        <button className={`text-sm bg-green-600 text-white rounded-md py-2 px-4 hover:bg-green-700 font-bold ${className}`} type={type} onClick={() => { if (onClick) onClick() }}>
            {children}
        </button>
    )
}

export const ButtonWarning = ({ children, type, onClick, className }: Props) => {
    return (
        <button className={`text-sm bg-yellow-500 text-white rounded-md py-2 px-4 hover:bg-yellow-600 font-bold ${className}`}
            type={type} onClick={() => { if (onClick) onClick() }}>
            {children}
        </button>
    )
}


export const ButtonDanger = ({ children, type, onClick, className }: Props) => {
    return (
        <button className={`text-sm bg-red-600 text-white rounded-md py-2 px-4 hover:bg-red-700 font-bold ${className}`}
            type={type} onClick={() => { if (onClick) onClick() }}>
            {children}
        </button>
    )
}


export const ButtonPrimary = ({ children, type, onClick, className }: Props) => {
    return (
        <button className={`text-sm border-2 border-green-700 text-green-500 rounded-md py-2 px-4 bg-white font-bold hover:bg-green-600 hover:text-white transition-all duration-300 ${className}`}
            type={type} onClick={() => { if (onClick) onClick() }}>
            {children}
        </button>
    )
}

export const ButtonKeranjang = ({ children, type, onClick, className }: Props) => {
    return (
        <button className={`text-sm border text-[#2E8B57] rounded-md py-2 px-4 bg-white font-bold hover:cursor-pointer transition-all duration-300 ${className}`}
            type={type} onClick={() => { if (onClick) onClick() }}>
            {children}
        </button>
    )
}

export const DangerOutline = ({ children, type, onClick, className }: Props) => {
    return (
        <button className={`text-sm border-2 border-red-700 text-red-500 rounded-md py-2 px-4 bg-white font-bold hover:bg-red-600 hover:text-white transition-all duration-300 ml-2 ${className}`}
            type={type} onClick={() => { if (onClick) onClick() }}>
            {children}
        </button>
    )
}

export const InfoOutline = ({ children, type, onClick, className }: Props) => {
    return (
        <button className={`text-sm border-2 border-blue-700 text-blue-500 rounded-md py-2 px-4 bg-white font-bold hover:bg-blue-600 hover:text-white transition-all duration-300 ml-2 ${className}`}
            type={type} onClick={() => { if (onClick) onClick() }}>
            {children}
        </button>
    )
}


export const ButtonInfo = ({ children, type, onClick, className }: Props) => {
    return (
        <button
            className={`text-sm bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 font-bold ${className}`}
            type={type}
            onClick={onClick}>
            {children}
        </button>
    );
};
