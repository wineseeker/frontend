'use server'

import {cookies} from "next/headers";
import {notFound} from "next/navigation";
import {Wine} from "@/app/types/wine";
import baseUrl from "@/app/lib/base-url";

export async function wineSearch(q: string, page?: number): Promise<Wine[]> {
    const sessionValue = cookies().get('session')?.value

    let url = `${baseUrl}/search?q=${q}`

    if (page !== undefined) {
        url += `&page=${page}`
    }

    const res = await fetch(url, {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${sessionValue}`
        }
    })

    if (!res.ok) {
        if (res.status >= 500)
            throw new Error('서버 오류가 발생했습니다')

        notFound()
    }

    return res.json()
}

export async function wineSearchAutoComplete(q: string) {
    const res = await fetch(`${baseUrl}/search/auto-complete?q=${q}`, {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${cookies().get('session')?.value}`
        }
    })

    return res.json()
}