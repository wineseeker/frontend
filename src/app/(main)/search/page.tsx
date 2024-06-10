import {Header} from "@/app/components/main-layout/header";
import {SearchResultList} from "@/app/components/main-layout/search/search-result-list";
import {wineSearch} from "@/app/lib/wine-search";
import type {Metadata} from "next";
import {Suspense} from "react";

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
        <div className={"mt-4 flex flex-col gap-4 px-4 md:container md:mx-auto"}>
            <Header>{searchParams.q}의 검색 결과</Header>
            {(initialSearchResult.length > 0) ?
                <Suspense><SearchResultList initialSearchResult={initialSearchResult} /></Suspense> :
                <p>입력하신 검색어에 대한 검색 결과가 없습니다.</p>}
        </div>
    )
}