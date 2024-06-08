'use server'

import {cookies} from "next/headers";
import {notFound} from "next/navigation";
import {Wine} from "@/app/types/wine";

export async function wineSearch(q: string, page?: number): Promise<Wine[]> {
    let url = 'http://localhost:8000/search?q=' + q

    if (page !== undefined) {
        url += '&page=' + page
    }

    const res = await fetch(url, {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${cookies().get('session')?.value}`
        }
    })

    if (!res.ok) {
        if (res.status >= 500)
            throw new Error('ops!')

        notFound()
    }

    return res.json()
}