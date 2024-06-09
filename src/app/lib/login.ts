'use server'

import {redirect} from "next/navigation";
import {cookies} from "next/headers";

export async function login(initialState: any, formData: FormData) {
    try {
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
                secure: process.env.NODE_ENV === 'production'
            }

            if (formData.get('remember')?.toString() === 'on') {
                const expires = body.expiresAt.toString()
                cookieOption.expires = Date.parse(expires)
            }
            cookies().set('session', body.id.toString(), cookieOption)
        } else if (res.status === 400) {
            return {
                message: '잘못된 이메일 혹은 비밀번호를 입력하셨습니다.',
            }
        } else {
            return {
                message: '백엔드에 문제가 발생했습니다. 나중에 다시 시도해보세요.',
            }
        }
    } catch (e) {
        console.error(e)
        return {
            message: '서버에 문제가 발생했습니다. 나중에 다시 시도해보세요.',
        }
    }
    // try-catch 문 안에 redirect 문을 넣으면 작동하지 않는 문제가 있어서 밖에 넣습니다.
    return redirect(`/`)
}