'use server'

import {cookies} from "next/headers";

type Headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization'?: string
}

export async function getSurveyResult(answer: Array<any>) {
    const headers:Headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

    if (cookies().has('session')) {
        const sessionToken = cookies().get('session')?.value
        headers.Authorization = `Bearer ${sessionToken}`;
    }

    const res = await fetch('http://localhost:8000/survey', {
        method: 'POST',
        cache: 'no-store',
        headers: headers,
        body: JSON.stringify(answer)
    })

    if (res.status === 204) {
        return null
    }

    if (res.status === 200) {
        return res.json()
    }

    return undefined
}