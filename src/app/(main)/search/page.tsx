import {Header} from "@/app/components/main-layout/header";
import {SearchResultList} from "@/app/components/main-layout/search/search-result-list";
import {wineSearch} from "@/app/lib/wine-search";
import type {Metadata} from "next";
import {Alert} from "flowbite-react";

export async function generateMetadata({searchParams}: {searchParams: { // noinspection JSUnusedLocalSymbols
        [key: string]: string | undefined }}): Promise<Metadata> {
    if (!searchParams.q) {
        return ({
            title: '검색'
        })
    }

    return ({
        title: `"${searchParams.q}"에 대한 검색 결과`
    })
}

export default async function Search({searchParams}: {searchParams: { // noinspection JSUnusedLocalSymbols
        [key: string]: string | undefined }}) {
    const q = searchParams.q

    if (!q) {
        return (
            <div className={"mt-4 mx-3 flex flex-col gap-4 md:container md:mx-auto"}>
                <Header>상단의 검색창에 검색어를 입력하세요</Header>
            </div>
        )
    }

    const initialSearchResult = await wineSearch(q as string);

    return (
        <div className={"mt-4 mx-3 flex flex-col gap-4 md:container md:mx-auto"}>
            <Header>{searchParams.q}의 검색 결과</Header>
            <Alert color="info">
                와인 이름이 중복된 경우에는 와이너리, 산도 등이 달라 실제로는 다른 와인이니 착오 없으시길 바랍니다. 비비노 평점과 리뷰 개수는 현재의 수치와 다를 수 있습니다.
            </Alert>
            {(initialSearchResult.length > 0) && <SearchResultList initialSearchResult={initialSearchResult} />}
        </div>
    )
}