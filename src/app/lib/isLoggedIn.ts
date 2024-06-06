'use server'

import {cookies} from "next/headers";

export async function isLoggedIn () {
    if (cookies().has('session')) {
        const res = await fetch('http://localhost:8000/account', {
            cache: 'no-store',
            headers: {
                authorization: `Bearer ${cookies().get('session')?.value}`
            }
        })

        if (res.ok) {
            return true
        } else if (res.status === 401 || res.status === 403) {
            return false
        }
    }

    return false
}