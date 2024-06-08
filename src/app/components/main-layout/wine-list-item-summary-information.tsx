'use client'

import {regionName} from "@/app/lib/region-name";
import {Wine} from "@/app/types/wine";

export function WineListItemSummaryInformation({item}: {item: Wine}) {
    return (
        <div className={"item-summary-information"}>
            <div>국가:&nbsp;{(item.countryCode !== undefined) && regionName(item.countryCode)}</div>
            <div>산도:&nbsp;{item.acidity.toFixed(3)}</div>
            <div>당도:&nbsp;{item.sweetness.toFixed(3)}</div>
            <div>타닌:&nbsp;{item.tannin.toFixed(3)}</div>
            <div>바디감:&nbsp;{item.tannin.toFixed(3)}</div>
            <div>비비노 평균 평점:&nbsp;{item.ratingAverage} (리뷰 개수: {item.ratingCount}개)</div>
        </div>
    )
}