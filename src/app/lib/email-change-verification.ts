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

        if (res.status !== 200) {
            if (res.status === 400) {
                return {
                    message: '잘못된 인증 코드를 입력하셨습니다.',
                }
            } else {
                return {
                    message: '백엔드에 문제가 발생했습니다. 나중에 다시 시도해보세요.',
                }
            }
        }

    } catch (e) {
        console.error(e)
        return {
            message: '서버에 문제가 발생했습니다. 나중에 다시 시도해보세요.',
        }
    }
}