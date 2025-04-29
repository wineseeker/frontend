'use server'

import {Wine} from "@/app/types/wine";
import {notFound} from "next/navigation";
import baseUrl from "@/app/lib/base-url";

export async function getRanking(page?: number): Promise<Wine[]> {
    let url = `${baseUrl}/ranking`

    if (page !== undefined) {
        url += `?page=${page}`
    }

    const res = await fetch(url, {
        cache: 'no-store',
    })

    if (!res.ok) {
        if (res.status >= 500)
            throw new Error('서버 오류가 발생했습니다')

        notFound()
    }

    return res.json()
}