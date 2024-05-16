'use server'

import {redirect} from "next/navigation";
import {cookies} from "next/headers";

export async function login(formData: FormData) {
    console.log(formData);

    const res = await fetch('http://localhost:8000/login', {
        method: 'POST',
        cache: 'no-store',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: formData.get('email')?.toString(),
            password: formData.get('password')?.toString()
        })
    })

    if (res.status === 200) {
        const body = await res.json();
        console.log(body);

        type cookieOption = {
            httpOnly?: boolean
            path?: string
            expires?: number
            secure?: boolean
        }

        const cookieOption: cookieOption = {
            httpOnly: true,
            path: '/',
        }

        if (formData.get('remember')?.toString() === 'on') {
            const expires = body.expiresAt.toString()
            cookieOption.expires = Date.parse(expires)
        }

        cookies().set('session', body.id.toString(), cookieOption)
        console.log(cookieOption)
        return redirect(`/`)
    }
}