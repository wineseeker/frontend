'use client'

import {usePathname, useSearchParams} from "next/navigation";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {TextInput} from "flowbite-react";

export default function SearchBar() {
    const path = usePathname()
    const params = useSearchParams()

    let value = ""

    if (path === '/search' && params !== undefined && params !== null) {
        const query = params.get('q');
        if (query !== null) {
            value = query;
        }
    }

    return (
        <TextInput name={"search"} type={"search"} className={"w-full"} placeholder="검색" defaultValue={value} icon={FaMagnifyingGlass} required />
    )
}