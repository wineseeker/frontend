'use server'

import {cookies} from "next/headers";

export async function logoutAction() {
    try {
        const res = await fetch('http://localhost:8000/account/logout', {
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