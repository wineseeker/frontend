'use server'

import {cookies} from "next/headers";

import baseUrl from "@/app/lib/base-url";

export async function requestEmailChange(password: string, newEmail: string):Promise<true|number> {
    const sessionToken = cookies().get('session')?.value

    const res = await fetch(`${baseUrl}/account/email`, {
        method: 'PATCH',
        cache: 'no-store',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionToken}`
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