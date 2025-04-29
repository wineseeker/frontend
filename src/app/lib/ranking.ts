'use server'

import {Wine} from "@/app/types/wine";
import {notFound} from "next/navigation";

export async function getRanking(page?: number): Promise<Wine[]> {
    let url = 'http://localhost:8000/ranking'

    if (page !== undefined) {
        url += '?page=' + page
    }

    const res = await fetch(url, {
        cache: 'no-store',
    })

    if (!res.ok) {
        if (res.status >= 500)
            throw new Error('ops!')

        notFound()
    }

    return res.json()
}