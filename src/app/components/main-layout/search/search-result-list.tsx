'use client'

import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import {Wine} from "@/app/types/wine";
import {useSearchParams} from "next/navigation";
import {wineSearch} from "@/app/lib/wine-search";
import {Alert, List, Spinner} from "flowbite-react";
import Link from "next/link";
import {WineListItemSummaryInformation} from "@/app/components/main-layout/wine-list-item-summary-information";

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
                    <WineListItemSummaryInformation item={item} />
                </div>
            </Link>
        </List.Item>
    ));

    return (
        <>
            <Alert color="info">
                와인 이름이 중복된 경우에는 와이너리, 산도 등이 달라 실제로는 다른 와인이니 착오 없으시길 바랍니다. 비비노 평점과 리뷰 개수는 현재의 수치와 다를 수 있습니다.
            </Alert>
            <List unstyled className="divide-y space-y-0 divide-gray-200 dark:divide-gray-700 text-black items-center">
                {searchResultItem}
                {isMoreSearchResults && (
                    <li ref={ref} className={"py-3 block text-center"}>
                        <Spinner size="xl" color={"rose"} />
                    </li>
                )}
            </List>
        </>
    );
}
