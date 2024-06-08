'use client'

import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import {Wine} from "@/app/types/wine";
import {useSearchParams} from "next/navigation";
import {wineSearch} from "@/app/lib/wine-search";
import {List, Spinner} from "flowbite-react";
import Link from "next/link";
import {regionName} from "@/app/lib/region-name";

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
            <Link href={"/wine/" + item.id} className={"block py-3"}>
                <div className={"inline-flex flex-col"}>
                    <div className={"hover:underline"}>
                        {item.name}
                    </div>
                    <div className={"item-summary-information"}>
                        <div>국가:&nbsp;{(item.countryCode !== undefined)&& regionName(item.countryCode)}</div>
                        <div>산도:&nbsp;{item.acidity.toFixed(3)}</div>
                        <div>당도:&nbsp;{item.sweetness.toFixed(3)}</div>
                        <div>타닌:&nbsp;{item.tannin.toFixed(3)}</div>
                        <div>바디감:&nbsp;{item.tannin.toFixed(3)}</div>
                        <div>비비노 평균 평점:&nbsp;{item.ratingAverage}(리뷰 개수: {item.ratingCount}개)</div>
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
