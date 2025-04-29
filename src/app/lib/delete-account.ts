'use server'

import {cookies} from "next/headers";
import baseUrl from "@/app/lib/base-url";

export async function deleteAccount(initialState: any, formData: FormData) {
    const sessionCookieValue = cookies().get('session')?.value

    const res = await fetch(baseUrl + '/account', {
        method: 'DELETE',
        cache: 'no-store',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionCookieValue}`
        },
        body: JSON.stringify({
            password: formData.get('password')?.toString()
        })
    })

    if (!res.ok) {
        if (res.status === 400) {
            return {
                message: '비밀번호가 틀렸습니다'
            }
        } else if (res.status === 401) {
            return {
                message: '세션이 만료되었습니다. 다시 로그인하세요.'
            }
        } else {
            throw new Error("Oops!!")
        }
    }

    cookies().delete('session')
}