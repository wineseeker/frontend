import type {Metadata} from "next";
import {Header} from "@/app/components/main-layout/header";
import {RankingList} from "@/app/components/main-layout/ranking/ranking-list";
import {getRanking} from "@/app/lib/ranking";

export const metadata: Metadata = {
    title: "랭킹",
    description: "비비노 평점 랭킹을 기반으로한 랭킹입니다",
};


export default async function Page() {
    const initialRaking = await getRanking()
    return (
        <div className={"mt-4 flex flex-col gap-4 px-4 md:container md:mx-auto"}>
            <Header>랭킹</Header>
            <RankingList initialRanking={initialRaking}/>
        </div>
    )
}