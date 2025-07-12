"use client"

import React, { FormEvent, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BASE_API_URL } from "../../global";
import { getCookies } from "../../../lib/client-cookies";
import { IUser } from "../../../app/types";
import { post } from "../../../lib/bridge";
import { InputGroupComponent } from "../../components/InputComponent"
import FileInput from "../../components/fileInput"
import { IoEyeSharp } from "react-icons/io5";
import { HiEyeSlash } from "react-icons/hi2";
import Image from "next/image";
import imgSignup from "../../../public/image/signup.jpeg"
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { SiGooglemaps } from "react-icons/si";

export default function SignUp() {

    const [user, setUser] = useState<IUser>({
        id: 0,
        uuid: ``,
        name: ``,
        email: ``,
        password: ``,
        profile_picture: ``,
        role: `USER`,
        createdAt: ``,
        updatedAt: ``,
        alamat: ``,
        telephone: ``
    })
    const router = useRouter()
    const TOKEN = getCookies("token") || ""
    const [file, setFile] = useState<File | null>(null)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/user`
            const { name, email, password, role, alamat, telephone } = user
            const payload = new FormData()
            payload.append("name", name || "")
            payload.append("email", email || "")
            payload.append("password", password || "")
            payload.append("role", role || "USER")
            payload.append("alamat", alamat || "")
            payload.append("telephone", telephone || "")
            if (file !== null) payload.append("profile_picture", file)

            const response = await post(url, payload, TOKEN)
            const data = response as { status: boolean; message: string }

            if (data.status) {
                toast.success("Your account has been created, please Login")
                setTimeout(() => {
                    router.replace(`/auth/login`)
                }, 2000)
            } else {
                toast.warning("Your password or email is wrong", { duration: 2000 })
            }
        } catch (error) {
            console.error(error)
            toast.error(`Something went wrong`, { duration: 2000 })
        }
    }
    return (
        <div className="bg-cyan-50 h-screen w-full relative overflow-hidden font-poppins">
            <svg viewBox="0 50 200 200" className="absolute -right-44 w-[500px]" xmlns="http://www.w3.org/2000/svg">
                <path fill="#05B6D3" d="M44,-72C56.5,-69,65.6,-56.1,65.7,-42.4C65.9,-28.8,56.9,-14.4,49.2,-4.5C41.4,5.4,34.9,10.9,32.5,20.6C30.1,30.3,31.9,44.3,27.1,53.7C22.4,63.2,11.2,68.1,-2.1,71.8C-15.5,75.5,-31,78.1,-42.1,72.3C-53.2,66.5,-59.9,52.5,-64,39.1C-68.2,25.6,-69.8,12.8,-62.8,4C-55.8,-4.7,-40.2,-9.5,-35.4,-21.7C-30.5,-33.9,-36.4,-53.5,-32.3,-61.4C-28.2,-69.2,-14.1,-65.3,0.8,-66.8C15.8,-68.2,31.5,-75.1,44,-72Z" transform="translate(100 100)" />
            </svg>
            <svg viewBox="0 0 200 200" className="absolute -bottom-[300px] w-[600px]" xmlns="http://www.w3.org/2000/svg">
                <path fill="#BAE6FF" d="M37,-42.5C44.8,-29.1,45.9,-14.6,44.4,-1.5C42.9,11.6,38.8,23.1,30.9,30.5C23.1,37.9,11.6,41.2,-5.4,46.6C-22.4,52,-44.7,59.5,-54.4,52.1C-64.2,44.7,-61.3,22.4,-59,2.3C-56.7,-17.8,-55.1,-35.6,-45.3,-48.9C-35.6,-62.3,-17.8,-71.2,-1.6,-69.6C14.6,-68,29.1,-55.8,37,-42.5Z" transform="translate(100 100)" />
            </svg>
            <div className="w-full h-full flex justify-center items-center relative">
                <div className="absolute flex items-center">
                    <div className="relative">
                        <Image src={imgSignup} alt="Image Login" height={600} width={600} className="bg-cover rounded-l-lg" />
                        <span className="absolute bottom-0 w-full h-[200px] bg-gradient-to-t opacity-30 from-black via via-black to-transparent">{""}</span>
                        <div className="absolute bottom-0 text-white space-y-2 p-4">
                            <h4 className="text-4xl font-semibold leading-[40px]">
                                Join the <br /> Adventure Shopping
                            </h4>
                            <p className="text-[15px] text-white leading-6 pr-7 mt-4">Create an account to start documenting your shoping.</p>
                        </div>
                    </div>
                    <div className="w-3/5 h-[660px] p-10 bg-white rounded-r-lg relative">
                        <h1 className="text-2xl font-semibold mb-7">
                            SignUp
                        </h1>
                        <form className="flex flex-col text-[#8390A2] " onSubmit={handleSubmit}>
                            <div className="relative flex w-full items-center">
                                <InputGroupComponent id={`name`} type="text" value={user.name}
                                    onChange={val => setUser({ ...user, name: val })}
                                    required={true} label="Name" placeholder="Name" className="pl-5" />
                            </div>

                            <div className="relative flex w-full items-center">
                                <InputGroupComponent id={`email`} type="text" value={user.email}
                                    onChange={val => setUser({ ...user, email: val })}
                                    required={true} label="Email" placeholder="Email" className="pl-5" />
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="relative flex w-full items-center">
                                    <div className="p-3 top-[26px] absolute text-[#8390A2]">
                                        <SiGooglemaps className=" text-lg" />
                                    </div>
                                    <InputGroupComponent id={`alamat`} type="text" value={user.alamat}
                                        onChange={val => setUser({ ...user, alamat: val })}
                                        required={true} label="Alamat" placeholder="Alamat" className="pl-9" />
                                </div>

                                <div className="relative flex w-full items-center">
                                    <div className="p-3 top-[26px] absolute text-[#8390A2]">
                                        <BsFillTelephoneForwardFill className=" text-lg" />
                                    </div>
                                    <InputGroupComponent id={`telephone`} type="text" value={user.telephone}
                                        onChange={val => setUser({ ...user, telephone: val })}
                                        required={true} label="Telephone" placeholder="+62xxx" className="pl-9" />
                                </div>
                            </div>

                            <div className="relative flex w-full items-center">
                                <InputGroupComponent id={`password`} type={showPassword ? `text` : `password`} value={user.password}
                                    onChange={val => setUser({ ...user, password: val })}
                                    required={true} label="Password" placeholder="Password" className="pl-5" />
                                <div className="cursor-pointer rounded-r-md absolute right-3 bottom-5" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ?
                                        <IoEyeSharp className="text-[#8390A2] text-lg" /> :
                                        <HiEyeSlash className="text-[#8390A2] text-lg" />
                                    }
                                </div>
                            </div>
                            <FileInput acceptTypes={["application/pdf", "image/png", "image/jpeg", "image/jpg"]} id="profile_picture"
                                label="Upload Picture" onChange={f => setFile(f)} required={false} />

                            <button
                                type="submit" className="mt-3 uppercase text-sm font-semibold bg-[#fea928] shadow-lg  p-[10px] my-1 hover:text-white duration-200 transition-all  text-white py-2 rounded-full cursor-pointer">
                                create account
                            </button>
                            <div className="flex flex-col justify-center text-center">
                                <p className="text-xs text-slate-500 my-4">Or</p>
                                <button onClick={() => { router.push("/auth/login") }} className="uppercase text-sm bg-white text-primary shadow-cyan-100 border border-secondary hover:bg-secondary hover:text-white rounded-full py-2 cursor-pointer font-semibold duration-300 transition-colors">login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

