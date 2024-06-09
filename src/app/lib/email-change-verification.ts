'use server'

import {cookies} from "next/headers";

export async function emailChangeVerification(initialState: any, formData: FormData) {
    try {
        const res = await fetch('http://localhost:8000/account/email-verification', {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies().get('session')?.value}`
            },
            body: JSON.stringify({
                code: formData.get('code')?.toString(),
            })
        })

        const body = await res.json()

        if (res.status !== 200) {
            if (res.status === 400) {
                if (body.code === 2)
                    return {
                        errCode: 2
                    }
                return {
                    errCode: 1
                }
            } else {
                throw new Error("Oops!")
            }
        }

    } catch (e) {
        console.error(e)
        throw new Error("Oops!")
    }
}