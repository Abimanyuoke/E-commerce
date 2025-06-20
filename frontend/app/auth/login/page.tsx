"use client"

import { BASE_API_URL } from "../../global";
import { storeCookie } from "@/lib/client-cookies";
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react";
import { HiEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import imgLogin from "../../../public/image/login.jpg";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/user/login`
            const payload = JSON.stringify({ email: email, password })
            const { data } = await axios.post<{ status: boolean; message: string; token: string; data?: { id: string; name: string; role: string; profile_picture?: string } }>(url, payload, {
                headers: { "Content-Type": "application/json" }
            })
            if (data.status == true) {
                toast.success("Login success", { duration: 2000 })
                storeCookie("token", data.token)
                if (data.data) {
                    storeCookie("id", data.data.id)
                    storeCookie("name", data.data.name)
                    storeCookie("role", data.data.role)
                    storeCookie("profile_picture", data.data.profile_picture || "")
                    let role = data.data.role
                    if (role === `MANAGER`) setTimeout(() => router.replace(`/manager/dashboard`), 1000)
                    else if (role === `USER`) setTimeout(() => router.replace(`/main`), 1000)
                }
            }
            else toast.warning(data.message, { duration: 2000 })
        } catch (error) {
            console.log(error);
            toast.error(`Something wrong`, { duration: 2000 })
        }
    }

    return (
        <div className="bg-cyan-50 h-screen w-full relative overflow-hidden font-poppins">
            <svg viewBox="0 50 200 200" className="absolute -right-44 w-[500px]" xmlns="http://www.w3.org/2000/svg">
                <path fill="#fea928" d="M44,-72C56.5,-69,65.6,-56.1,65.7,-42.4C65.9,-28.8,56.9,-14.4,49.2,-4.5C41.4,5.4,34.9,10.9,32.5,20.6C30.1,30.3,31.9,44.3,27.1,53.7C22.4,63.2,11.2,68.1,-2.1,71.8C-15.5,75.5,-31,78.1,-42.1,72.3C-53.2,66.5,-59.9,52.5,-64,39.1C-68.2,25.6,-69.8,12.8,-62.8,4C-55.8,-4.7,-40.2,-9.5,-35.4,-21.7C-30.5,-33.9,-36.4,-53.5,-32.3,-61.4C-28.2,-69.2,-14.1,-65.3,0.8,-66.8C15.8,-68.2,31.5,-75.1,44,-72Z" transform="translate(100 100)" />
            </svg>
            <svg viewBox="0 0 200 200" className="absolute -bottom-[300px] w-[600px]" xmlns="http://www.w3.org/2000/svg">
                <path fill="#ed8900" d="M37,-42.5C44.8,-29.1,45.9,-14.6,44.4,-1.5C42.9,11.6,38.8,23.1,30.9,30.5C23.1,37.9,11.6,41.2,-5.4,46.6C-22.4,52,-44.7,59.5,-54.4,52.1C-64.2,44.7,-61.3,22.4,-59,2.3C-56.7,-17.8,-55.1,-35.6,-45.3,-48.9C-35.6,-62.3,-17.8,-71.2,-1.6,-69.6C14.6,-68,29.1,-55.8,37,-42.5Z" transform="translate(100 100)" />
            </svg>
            <div className="w-full h-full flex justify-center items-center relative">
                <div className="absolute flex items-center">
                    <div className="relative">
                        <Image src={imgLogin} alt="Image Login" height={800} width={800} className="bg-cover rounded-l-lg" />
                        <span className="absolute bottom-0 w-full h-[200px] bg-gradient-to-t opacity-30 from-black via via-black to-transparent">{""}</span>
                        <div className="absolute bottom-0 text-white space-y-2 p-4">
                            <h4 className="text-5xl font-semibold leading-[58px]">
                                Capture Your <br /> Journeys
                            </h4>
                            <p className="text-[15px] text-white leading-6 pr-7 mt-4">Record your travel experience and memories in your personal travel journal.</p>
                        </div>
                    </div>
                    <div className="w-3/5 h-[500px] p-10 bg-white rounded-r-lg relative">
                        <h1 className="text-2xl font-semibold mb-7">
                            Login
                        </h1>
                        <form className="flex flex-col pt-5 gap-3" onSubmit={handleSubmit}>
                            <div className="flex w-full items-center rounded relative bg-cyan-600/5">
                                <input type="email" placeholder="Email" className="pl-5 text-[#393e46] focus:outline-none py-3 text-sm w-full border rounded-md"
                                    onChange={e => setEmail(e.target.value)} id={`email`} />
                            </div>

                            <div className="flex w-full items-center bg-cyan-600/5 rounded relative">
                                <input type={showPassword ? `text` : `password`} className="pl-5 text-[#393e46] rounded-md py-3 text-sm w-full focus:outline-none border" value={password}
                                    onChange={e => setPassword(e.target.value)} placeholder="Password" id={`password`} />
                                <div className="cursor-pointer rounded-r-md p-3 absolute right-0" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ?
                                        <IoEyeSharp className="text-[#8390A2] text-lg" /> :
                                        <HiEyeSlash className="text-[#8390A2] text-lg" />
                                    }
                                </div>
                            </div>

                            <button
                                type="submit" className="mt-3 uppercase text-sm font-semibold bg-[#fea928] shadow-lg  p-[10px] my-1 hover:text-white duration-200 transition-all  text-white py-2 rounded-full cursor-pointer">
                                login
                            </button>
                            <div className="flex flex-col justify-center text-center">
                                <p className="text-xs text-slate-500 my-4">Or</p>
                                <button onClick={() => { router.push("/auth/signup") }} className="uppercase text-sm bg-white text-primary border border-secondary hover:bg-secondary hover:text-white rounded-full py-2 cursor-pointer font-semibold duration-300 transition-colors">create account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

