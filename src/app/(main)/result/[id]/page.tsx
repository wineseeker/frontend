import {notFound} from "next/navigation";
import {Top10WinesList} from "@/app/components/survey/top10-wines-list";
import {ResultTitle} from "@/app/components/result/result-title";
import {Metadata, ResolvingMetadata} from "next";

type Result = {
    dateTime: string,
    result: {
        id: number,
        name: string,
        ratingCount: number,
        ratingAverage: number,
        typeId: number,
        sweetness: number,
        alcohol: number,
        tannin: number,
        body: number,
        acidity: number,
        countryCode: string
    }[]
}

type Props = {
    params: { id: number }
    searchParams: { [key: string]: string | string[] | undefined }
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
    { params, searchParams }: Props,
    parent: ResolvingMetadata
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
        }
    })
}


export default async function Page({ params }: { params: { id: number } }) {
    const result = await getResult(params.id)

    return (
        <main className={"flex flex-col gap-4 mt-4 mx-5 md:container md:mx-auto"}>
            <ResultTitle dateTime={result.dateTime} />
            <Top10WinesList top10Wines={result.result} />
        </main>
    )
}