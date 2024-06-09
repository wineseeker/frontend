'use server'

import {cookies} from "next/headers";
import {RecommendHistoryElement} from "@/app/types/recommend-history-element";
import {notFound} from "next/navigation";

export async function getRecommendHistory(cursorId?: number): Promise<RecommendHistoryElement[]> {
    const sessionToken = cookies().get('session')?.value

    let url = 'http://localhost:8000/account/recommend-history'

    if (cursorId !== undefined) {
        url = url + '?cursorId=' + cursorId
    }

    const res = await fetch(url, {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    })

    if (!res.ok) {
        if (res.status >= 500)
            throw new Error('ops!')

        notFound()
    }

    return res.json()
}