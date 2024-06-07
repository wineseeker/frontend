import {cookies} from "next/headers";

export async function getUserInfo() {
    try {
        const res = await fetch('http://localhost:8000/account', {
            cache: 'no-store',
            headers: {
                authorization: `Bearer ${cookies().get('session')?.value}`
            }
        })

        if (res.status === 200) {
            return await res.json()
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
        return -1
    }
}