'use client'

import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import {Wine} from "@/app/types/wine";
import {useSearchParams} from "next/navigation";
import {wineSearch} from "@/app/lib/wine-search";
import {List, Spinner} from "flowbite-react";
import Link from "next/link";

export function SearchResultList({initialSearchResult}: {initialSearchResult: Wine[]}) {
    const [searchResult, setSearchResult] = useState(initialSearchResult);
    const [page, setPage] = useState(2);
    const [isMoreSearchResults, setIsMoreSearchResults] = useState<boolean>(true);
    const {ref, inView} = useInView();
    const searchParams = useSearchParams();

    async function loadMoreSearchResults() {
        const query = searchParams.get('q');
        if (query) {
            const moreSearchResult = await wineSearch(query, page);
            setSearchResult(prevResults => [...prevResults, ...moreSearchResult]);
            if (moreSearchResult.length <= 0) {
                setIsMoreSearchResults(false);
            }
        }
    }

    useEffect(() => {
        if (inView) {
            // noinspection JSIgnoredPromiseFromCall
            loadMoreSearchResults();
            setPage(prevPage => prevPage + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    useEffect(() => {
        const query = searchParams.get('q');
        if (query) {
            (async () => {
                const newSearchResult = await wineSearch(query);
                setSearchResult(newSearchResult);
                setPage(2);
                setIsMoreSearchResults(true);
            })();
        }
    }, [searchParams]);

    const searchResultItem = searchResult.map((item) => (
        <List.Item key={item.id}>
            <Link href={"/wine/" + item.id} className={"block py-4"}>
                <div className={"inline-flex flex-row"}>
                    <div className={"hover:underline"}>
                        {item.name}
                    </div>
                </div>
            </Link>
        </List.Item>
    ));

    return (
        <List unstyled className="divide-y space-y-0 divide-gray-200 dark:divide-gray-700 text-black items-center">
            {searchResultItem}
            {isMoreSearchResults && (
                <li ref={ref} className={"py-3 block text-center"}>
                    <Spinner size="xl" color={"rose"} />
                </li>
            )}
        </List>
    );
}
