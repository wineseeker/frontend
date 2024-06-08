'use client'

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {CustomFlowbiteTheme, TextInput} from "flowbite-react";
import {Suspense, useEffect, useRef} from "react";



export default function SearchBar() {
    const router = useRouter()
    const searchInputRef = useRef<HTMLInputElement>(null);
    const path = usePathname()
    const params = useSearchParams()

    function Search() {
        const customSearchTheme: CustomFlowbiteTheme["textInput"] = {
            field: {
                input: {
                    sizes: {
                        md: "p-2.3 text-md"
                    }
                }
            }
        };



        let value = ""

        if (path === '/search' && params !== undefined && params !== null) {
            const query = params.get('q');
            if (query !== null) {
                value = query;
            }
        }

        useEffect(() => {
            if (path === '/search' && params !== undefined && params !== null) {
                const query = params.get('q');
                if (query !== null && searchInputRef.current !== null) {
                    searchInputRef.current.value = query;
                }
            }
        }, []);

        return (
            <TextInput theme={customSearchTheme}
                       name={"q"}
                       type={"search"}
                       className={"w-full"}
                       sizing={"md"}
                       color={"rose"}
                       placeholder="검색(원어로 입력)"
                       defaultValue={value}
                       icon={FaMagnifyingGlass}
                       ref={searchInputRef}
                       required />
        )
    }

    async function search(formData: FormData) {
        const query = formData.get('q');
        if (query !== null && query !== undefined) {
            const encodedQuery = encodeURIComponent(query.toString().trim()).replace(/%20/g, "+");
            router.push(`/search?q=${encodedQuery}`);
        }
    }

    return (
        <Suspense>
            <form action={search}>
                <Search />
            </form>
        </Suspense>
    )
}