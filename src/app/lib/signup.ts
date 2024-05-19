'use server'

import {redirect} from "next/navigation";
import {cookies} from "next/headers";

export async function signup(prevState: any, formData: FormData) {
    console.log(formData);

    const res = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        cache: 'no-store',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: formData.get('email')?.toString(),
            password: formData.get('password')?.toString(),
            retypePw: formData.get('retypePw')?.toString()
        })
    })

    const body = await res.json();

    if (res.status === 201) {
        console.log(body);
        cookies().set({
            name: 'session',
            value: body.id.toString(),
            httpOnly: true,
            path: '/',
        })
        return redirect(`/`)
    }

    if (body.code !== undefined && body.code !== null) {
        return {
            errCode: body.code
        }
    }
}