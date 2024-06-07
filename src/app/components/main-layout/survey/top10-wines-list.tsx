'use client'

import {Alert, List} from "flowbite-react";
import {Suspense} from "react";

type Top10Wines = {
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
    countryCode: string,
}[]

export function Top10WinesList({top10Wines}: {top10Wines: Top10Wines}) {
    function duplicateWineNamesInfo(wineArray: Top10Wines) {
        const wineNames = new Set();
        for (const wine of wineArray) {
            if (wineNames.has(wine.name)) {
                return (
                    <Alert color="info">
                        와인 이름이 중복된 경우에는 와이너리, 산도 등이 달라 실제로는 다른 와인이니 착오 없으시길 바랍니다.
                    </Alert>
                )
            }
            wineNames.add(wine.name);
        }
        return null;
    }

    const top10WinesListItem = top10Wines.map((wine, index) =>
        <List.Item key={wine.id}
                   className={"py-2 sm:py-3 " + (
                       (index === 0) ? "gold-number" : (index === 1 ? "sliver-number" : ((index === 2) && "bronze-number"))
                   )}>
            <div className={"inline-flex flex-row"}>
                <div>{wine.name}</div>
            </div>
        </List.Item>
    )

    return (
        <div className={"flex flex-col gap-2 "}>
            {duplicateWineNamesInfo(top10Wines)}
            <Suspense>
                <List ordered className="divide-y space-y-0 divide-gray-200 dark:divide-gray-700 text-black bold-list-numbers">
                    {top10WinesListItem}
                </List>
            </Suspense>
        </div>
    )
}