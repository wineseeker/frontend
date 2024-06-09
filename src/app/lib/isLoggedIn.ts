'use server'

import {cookies} from "next/headers";

export async function isLoggedIn () {
    const hasSession = cookies().has('session')

    if (hasSession) {
        const sessionToken = cookies().get('session')?.value

        const res = await fetch('http://localhost:8000/account', {
            cache: 'no-store',
            headers: {
                authorization: `Bearer ${sessionToken}`
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