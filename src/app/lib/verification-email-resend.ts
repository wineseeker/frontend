'use server'

import {cookies} from "next/headers";

import baseUrl from "@/app/lib/base-url";

export async function verificationEmailResend() {
    const sessionToken = cookies().get('session')?.value

    await fetch(`${baseUrl}/account/verification-mail-resend`, {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    })
}