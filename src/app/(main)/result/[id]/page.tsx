import {notFound} from "next/navigation";
import {Top10WinesList} from "@/app/components/main-layout/top10-wines-list";
import {ResultTitle} from "@/app/components/main-layout/result/result-title";
import {Metadata} from "next";
import {wineSeekerOpenGraph} from "@/app/lib/shared-metadata";
import {Wine} from "@/app/types/wine";

type Result = {
    dateTime: string,
    result: Wine[]
}

type Props = {
    params: { id: number }
}

async function getResult(id: number): Promise<Result> {
    const res = await fetch('http://localhost:8000/result/' + id)

    if (res.status === 404)
        notFound()

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const result = await getResult(params.id)

    const dateTime = new Intl.DateTimeFormat("ko-KR", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "Asia/Seoul",
    }).format(new Date(result.dateTime))

    return ({
        title: dateTime + " (KST)에 완료된 설문에 대한 추천 결과",
        robots: {
            index: false
        },
        openGraph: {
            ...wineSeekerOpenGraph,
            title: dateTime + " (KST)에 완료된 설문에 대한 추천 결과",
            description: dateTime + " (KST)에 완료된 설문에 대한 추천 결과 입니다"
        }
    })
}


export default async function Page({ params }: { params: { id: number } }) {
    const result = await getResult(params.id)

    return (
        <div className={"flex flex-col gap-4 mt-4 mx-5 md:container md:mx-auto"}>
            <ResultTitle dateTime={result.dateTime} />
            <main>
                <Top10WinesList top10Wines={result.result} />
            </main>
        </div>
    )
}