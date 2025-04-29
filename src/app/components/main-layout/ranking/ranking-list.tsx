'use client'

import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import {Wine} from "@/app/types/wine";
import {Alert, List, Spinner} from "flowbite-react";
import Link from "next/link";
import {WineListItemSummaryInformation} from "@/app/components/main-layout/wine-list-item-summary-information";
import {getRanking} from "@/app/lib/ranking";

export function RankingList({initialRanking}: {initialRanking: Wine[]}) {
    const [ranking, setRanking] = useState(initialRanking);
    const [page, setPage] = useState(2);
    const [isMoreRanking, setIsMoreRanking] = useState<boolean>(true);
    const {ref, inView} = useInView();

    async function loadMoreRankingResults() {
        const moreSearchResult = await getRanking(page);
        setRanking(prevResults => [...prevResults, ...moreSearchResult]);
        if (moreSearchResult.length <= 0) {
            setIsMoreRanking(false);
        }
    }

    useEffect(() => {
        if (inView) {
            // noinspection JSIgnoredPromiseFromCall
            loadMoreRankingResults();
            setPage(prevPage => prevPage + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    const searchResultItem = ranking.map((item, index) => (
        <List.Item key={item.id} className={"" + (
            (index === 0) ? "gold-number" : (index === 1 ? "silver-number" : ((index === 2) && "bronze-number")))}>
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
                {isMoreRanking && (
                    <li ref={ref} className={"py-3 block text-center"}>
                        <Spinner size="xl" color={"rose"} />
                    </li>
                )}
            </List>
        </>
    );
}