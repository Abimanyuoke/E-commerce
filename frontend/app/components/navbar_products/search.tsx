"use client"

import { useRouter } from "next/navigation"
import { KeyboardEvent, useState } from "react"
import { IoMdSearch } from "react-icons/io"

type Props = {
    url: string,
    search: string
}

const Search = ({ url, search }: Props) => {
    const [keyword, setKeyword] = useState<string>(search)
    const router = useRouter()

    const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        router.push(`${url}?search=${keyword}`)
    }

    return (
        <div className="relative group hidden sm:block">
            <input type="text" id="keyword" value={keyword} onChange={e => setKeyword(e.target.value)}
                className={`w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 pl-4 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-2 focus:border-primary dark:border-gray-500 dark:bg-gray-800`}
                placeholder="Search" onKeyUp={handleSearch} />
            <IoMdSearch className='text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3' />
        </div>
    )
}
export default Search
