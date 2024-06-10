'use client'

import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import {Wine} from "@/app/types/wine";
import {Alert, List, Spinner} from "flowbite-react";
import Link from "next/link";
import {WineListItemSummaryInformation} from "@/app/components/main-layout/wine-list-item-summary-information";
import {getRaking} from "@/app/lib/raking";

export function RakingList({initialRaking}: {initialRaking: Wine[]}) {
    const [raking, setRaking] = useState(initialRaking);
    const [page, setPage] = useState(2);
    const [isMoreRaking, setIsMoreRaking] = useState<boolean>(true);
    const {ref, inView} = useInView();

    async function loadMoreRakingResults() {
        const moreSearchResult = await getRaking(page);
        setRaking(prevResults => [...prevResults, ...moreSearchResult]);
        if (moreSearchResult.length <= 0) {
            setIsMoreRaking(false);
        }
    }

    useEffect(() => {
        if (inView) {
            // noinspection JSIgnoredPromiseFromCall
            loadMoreRakingResults();
            setPage(prevPage => prevPage + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    const searchResultItem = raking.map((item, index) => (
        <List.Item key={item.id} className={"" + (
            (index === 0) ? "gold-number" : (index === 1 ? "sliver-number" : ((index === 2) && "bronze-number")))}>
            <Link href={"/wine/" + item.id}
                  className={"inline-block py-3"}>
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
            <List ordered className="divide-y space-y-0 divide-gray-200 dark:divide-gray-700 text-black items-center bold-list-numbers">
                {searchResultItem}
                {isMoreRaking && (
                    <li ref={ref} className={"py-3 block text-center"}>
                        <Spinner size="xl" color={"rose"} />
                    </li>
                )}
            </List>
        </>
    );
}