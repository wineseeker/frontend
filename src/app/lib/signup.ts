'use server'

import {redirect} from "next/navigation";
import {cookies} from "next/headers";

export async function signup(formData: FormData) {
    console.log(formData);

    const res = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        cache: 'no-store',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'email': formData.get('email')?.toString(), password: formData.get('password')?.toString()})
    })

    if (res.status === 200) {
        const body = await res.json();
        console.log(body);
        cookies().set({
            name: 'session',
            value: body.id.toString(),
            httpOnly: true,
            path: '/',
        })
        return redirect(`/`)
    }
}