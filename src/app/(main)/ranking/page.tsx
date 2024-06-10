import type {Metadata} from "next";
import {Header} from "@/app/components/main-layout/header";
import {RakingList} from "@/app/components/main-layout/raking/raking-list";
import {getRaking} from "@/app/lib/raking";

export const metadata: Metadata = {
    title: "랭킹",
    description: "비비노 평점 랭킹을 기반으로한 랭킹입니다",
};


export default async function Page() {
    const initialRaking = await getRaking()
    return (
        <div className={"mt-4 flex flex-col gap-4 px-4 md:container md:mx-auto"}>
            <Header>랭킹</Header>
            <RakingList initialRaking={initialRaking}/>
        </div>
    )
}