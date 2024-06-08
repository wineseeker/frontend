'use client'

import {Alert, List} from "flowbite-react";
import {Suspense} from "react";
import {regionName} from "@/app/lib/region-name";
import {WineListItemSummaryInformation} from "@/app/components/main-layout/wine-list-item-summary-information";
import {Wine} from "@/app/types/wine";
import Link from "next/link";

type Top10Wines = Wine[]

export function Top10WinesList({top10Wines}: {top10Wines: Top10Wines}) {
    function duplicateWineNamesInfo(wineArray: Top10Wines) {
        const wineNames = new Set();
        for (const wine of wineArray) {
            if (wineNames.has(wine.name)) {
                return (
                    <>
                        와인 이름이 중복된 경우에는 와이너리, 산도 등이 달라 실제로는 다른 와인이니 착오 없으시길 바랍니다.{" "}
                    </>
                )
            }
            wineNames.add(wine.name);
        }
        return null;
    }

    const top10WinesListItem = top10Wines.map((wine, index) =>
        <List.Item key={wine.id}
                   className={"" + (
                       (index === 0) ? "gold-number" : (index === 1 ? "sliver-number" : ((index === 2) && "bronze-number"))
                   )}>
            <Link href={"/wine/" + wine.id} className={"inline-block py-3"}>
                <div className={"inline-flex flex-col"}>
                    <div className={"hover:underline"}>{wine.name}</div>
                    <WineListItemSummaryInformation item={wine}/>
                </div>
            </Link>
        </List.Item>
    )

    return (
        <div className={"flex flex-col gap-2 "}>
            <Alert color="info">
                {duplicateWineNamesInfo(top10Wines)}
                비비노 평점과 리뷰 개수는 현재의 수치와 다를 수 있습니다.
            </Alert>
            <Suspense>
            <List ordered
                      className="divide-y space-y-0 divide-gray-200 dark:divide-gray-700 text-black bold-list-numbers">
                    {top10WinesListItem}
                </List>
            </Suspense>
        </div>
    )
}