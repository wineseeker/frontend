'use server'

import {cookies} from "next/headers";

export async function passwordChange(prevState: any, formData: FormData) {
    const sessionToken = cookies().get('session')?.value

    const res = await fetch('http://localhost:8000/account/password', {
        method: 'PATCH',
        cache: 'no-store',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify({
            password: formData.get('password')?.toString(),
            newPassword: formData.get('new-password')?.toString(),
            retypeNewPw: formData.get('new-password-confirm')?.toString(),
        })
    })

    if (res.status !== 204) {
        const body = await res.json();
        return {
            errCode: body.code
        }
    }
}