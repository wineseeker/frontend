'use server'

import {cookies} from "next/headers";

export async function requestEmailChange(password: string, newEmail: string):Promise<true|number> {
    const res = await fetch('http://localhost:8000/account/email', {
        method: 'PATCH',
        cache: 'no-store',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies().get('session')?.value}`
        },
        body: JSON.stringify({
            password: password,
            newEmail: newEmail,
        })
    })

    if (res.ok) {
        return true
    }

    const body = await res.json()

    if (body.code) {
        return body.code
    }

    throw new Error("Oops!")
}