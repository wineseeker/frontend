import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getUserInfo} from "@/app/lib/get-userinfo";
import {getRecommendHistory} from "@/app/lib/get-recommend-history";
import {Header} from "@/app/components/main-layout/header";
import {RecommendHistoryList} from "@/app/components/main-layout/recommend-history-list";
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

    return (
        <>
            <Header>추천 내역</Header>
            <Suspense>
                <RecommendHistoryList initialRecommendHistory={initialRecommendHistory} />
            </Suspense>
        </>
    )
}