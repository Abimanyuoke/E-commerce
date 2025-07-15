import React from "react"
import { Toaster } from "sonner"



export const metadata = {
    title: 'Login',
    description: 'Praktikum SMK Telkom Malang',
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return (
        <div className="overflow-x-hidden">
            <Toaster position="top-right" richColors/>
            {children}
        </div>
    )
}

export default RootLayout
