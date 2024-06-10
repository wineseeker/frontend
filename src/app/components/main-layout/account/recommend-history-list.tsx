'use client'

import {RecommendHistoryElement} from "@/app/types/recommend-history-element";
import {List, Spinner} from "flowbite-react";
import {useEffect, useState} from "react";
import Link from "next/link";
import {useInView} from "react-intersection-observer";
import {getRecommendHistory} from "@/app/lib/recommend-history";

export function RecommendHistoryList({initialRecommendHistory}: {initialRecommendHistory: RecommendHistoryElement[]}) {
    const [isClient, setIsClient] = useState(false)
    const [ recommendHistory, setRecommendHistory ] = useState<RecommendHistoryElement[]>(initialRecommendHistory);
    const [ isMoreRecommendHistory, setIsMoreRecommendHistory] = useState(true);
    const { ref, inView } = useInView()

    useEffect(() => {
        setIsClient(true)
    }, []);

    async function loadMoreRecommendHistory() {
        const moreRecommendHistory = await getRecommendHistory(recommendHistory[recommendHistory.length - 1].id)
        setRecommendHistory([...recommendHistory, ...moreRecommendHistory])
        if (moreRecommendHistory.length <= 0) {
            setIsMoreRecommendHistory(false)
        }
    }

    useEffect(() => {
        if (inView) {
            // noinspection JSIgnoredPromiseFromCall
            loadMoreRecommendHistory()
        }
        // eslint-disable-next-line
    }, [inView])

    const recommendHistoryItem = recommendHistory.map((item) =>
            <List.Item key={item.id}>
                <Link href={"/result/" + item.id} className={"block py-4"}>
                    <div className={"inline-flex flex-row"}>
                        <div className={"hover:underline"}>
                            {new Intl.DateTimeFormat("ko-KR", {
                                dateStyle: "long",
                                timeStyle: "medium",
                                // 클라이언트 렌더링 중에는 서울 시간대로 렌더링 했다가 클라이언트 시간대로 변경
                                timeZone: isClient? undefined : "Asia/Seoul",
                            }).format(new Date(item.dateTime))}
                            에 완료된 설문에 대한 추천
                        </div>
                    </div>
                </Link>
            </List.Item>
    )

    return (
        <List unstyled className="divide-y space-y-0 divide-gray-200 dark:divide-gray-700 text-black items-center">
            {recommendHistoryItem}
            {isMoreRecommendHistory && (<li ref={ref} className={"py-3 block text-center"}>
                <Spinner size="xl" color={"rose"} />
            </li>)}
        </List>
    )
}