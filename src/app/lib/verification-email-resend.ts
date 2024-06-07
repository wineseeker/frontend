'use server'

import {cookies} from "next/headers";

export async function verificationEmailResend() {
    const res = await fetch('http://localhost:8000/account/verification-mail-resend', {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${cookies().get('session')?.value}`
        }
    })
}