import {notFound} from "next/navigation";
import {Top10WinesList} from "@/app/components/survey/top10-wines-list";
import {ResultTitle} from "@/app/components/result/result-title";

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

async function getResult(id: number): Promise<Result> {
    const res = await fetch('http://localhost:8000/result/' + id)

    if (res.status === 404)
        notFound()

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Page({ params }: { params: { id: number } }) {
    const result = await getResult(params.id)

    return (
        <main className={"flex flex-col gap-4 md:container md:mx-auto"}>
            <ResultTitle dateTime={result.dateTime} />
            <Top10WinesList top10Wines={result.result} />
        </main>
    )
}