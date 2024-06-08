import {Header} from "@/app/components/main-layout/header";
import {SearchResultList} from "@/app/components/main-layout/search/search-result-list";
import {wineSearch} from "@/app/lib/wine-search";

export default async function Search({searchParams}: {searchParams: { // noinspection JSUnusedLocalSymbols
        [key: string]: string | undefined }}) {
    const q = searchParams.q

    if (typeof q !== undefined) {
        const initialSearchResult = await wineSearch(q as string);

        return (
            <div className={"mt-4 mx-3 flex flex-col gap-4 md:container md:mx-auto"}>
                <Header>{searchParams.q}의 검색 결과</Header>
                {(initialSearchResult.length > 0) && <SearchResultList initialSearchResult={initialSearchResult} />}
            </div>
        )
    }

    return (
        <div className={"mt-4 mx-3 flex flex-col gap-4 md:container md:mx-auto"}>
            <Header>상단의 검색창에 검색어를 입력하세요</Header>
        </div>
    )
}