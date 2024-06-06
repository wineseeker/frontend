'use client'

import {List} from "flowbite-react";

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
    const top10WinesListItem = top10Wines.map((wine, index) =>
        <List.Item key={wine.id} className="pt-1.5 pb-1.5 sm:py-3">
            {index + 1} {wine.name}
        </List.Item>
    )

    return (
        <List unstyled className="divide-y divide-gray-200 dark:divide-gray-700 text-black">
            {top10WinesListItem}
        </List>
    )
}