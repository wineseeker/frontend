'use server'

import {cookies} from "next/headers";
import baseUrl from "@/app/lib/base-url";

export async function logoutAction() {
    try {
        const res = await fetch(`${baseUrl}/account/logout`, {
            headers: {
                cache: 'no-store',
                authorization: `Bearer ${cookies().get('session')?.value}`
            },
        })

        if (res.status === 200) {
            cookies().delete('session')
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error(error)
        return false
    }
}