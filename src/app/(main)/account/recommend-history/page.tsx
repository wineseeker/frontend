import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getUserInfo} from "@/app/lib/get-userinfo";
import {getRecommendHistory} from "@/app/lib/get-recommend-history";
import {Header} from "@/app/components/main-layout/header";
import {RecommendHistoryList} from "@/app/components/main-layout/account/recommend-history-list";
import {Suspense} from "react";

export async function generateMetadata(): Promise<Metadata> {
    const userInfo = await getUserInfo()

    if (userInfo && userInfo !== -1) {
        return ({
            title: "추천 내역",
            robots: {
                index: false
            }
        })
    }

    notFound()
}

export default async function Page() {
    const initialRecommendHistory = await getRecommendHistory()

    console.log("initialRecommendHistory " + initialRecommendHistory.length)

    function result() {
        if (initialRecommendHistory.length >= 1) {
            return (
                <Suspense>
                    <RecommendHistoryList initialRecommendHistory={initialRecommendHistory} />
                </Suspense>
            )
        } else {
            return <p>추천 내역이 없습니다</p>
        }
    }

    return (
        <>
            <Header>추천 내역</Header>
            {result()}
        </>
    )
}