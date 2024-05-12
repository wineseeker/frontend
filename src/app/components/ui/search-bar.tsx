'use client'

import {usePathname, useSearchParams} from "next/navigation";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {TextInput} from "flowbite-react";
import {Suspense} from "react";

function Search() {
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
        <TextInput name={"search"} type={"search"} className={"w-full"} placeholder="검색" defaultValue={value} icon={FaMagnifyingGlass} />
    )
}

interface SearchBarProps {
    action: any;
}
export default function SearchBar({ action }: SearchBarProps) {
    return (
        <Suspense>
            <form action={action}>
                <Search />
            </form>
        </Suspense>
    )
}