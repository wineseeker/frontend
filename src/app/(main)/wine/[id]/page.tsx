import {notFound} from "next/navigation";
import {Metadata} from "next";
import {Wine} from "@/app/types/wine";
import {Header} from "@/app/components/main-layout/header";
import {List, ListItem} from "flowbite-react";
import {regionName} from "@/app/lib/region-name";
import {wineSeekerOpenGraph} from "@/app/lib/shared-metadata";

type Props = {
    params: { id: number }
}

async function getData(id: number): Promise<Wine> {
    const res = await fetch('http://localhost:8000/wine/' + id)

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
    const data = await getData(params.id)

    return ({
        title: data.name + ' 와인 정보',
        description: `${regionName(data.countryCode)} 와인인 ${data.name}에 대한 정보입니다`,
        openGraph: {
            ...wineSeekerOpenGraph,
            title: data.name,
            description: `${regionName(data.countryCode)} 와인인 ${data.name}에 대한 정보입니다`,
            siteName: "와인 시커"
        }
    })
}


export default async function Page({ params }: { params: { id: number } }) {
    const data = await getData(params.id)

    return (
        <div className={"flex flex-col gap-4 mt-4 mx-5 md:container md:mx-auto"}>
            <Header>{data.name}</Header>
            <main className={"flex flex-col gap-4"}>
                <List unstyled className={"text-black"}>
                    <ListItem>비비노 평점: {data.ratingAverage} (리뷰 수: {data.ratingCount}개)</ListItem>
                    <ListItem>국가: {regionName(data.countryCode)}</ListItem>
                    <ListItem>산도: {data.acidity.toFixed(3)}</ListItem>
                    <ListItem>당도: {data.sweetness.toFixed(3)}</ListItem>
                    <ListItem>타닌: {data.tannin.toFixed(3)}</ListItem>
                    <ListItem>바디감: {data.body.toFixed(3)}</ListItem>
                    <ListItem>알코올 도수: {data.alcohol.toFixed(3)}</ListItem>
                </List>
                <p>※비비노 평점 데이터는 현재와 다를 수 있음</p>
            </main>
        </div>
    )
}