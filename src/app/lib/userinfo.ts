import {cookies} from "next/headers";
import type {AccountInfo} from "@/app/types/account-info";

export async function getUserInfo(): Promise<AccountInfo|null|-1> {
    const sessionToken = cookies().get('session')?.value

    const authorization = "Bearer " + sessionToken

    try {
        const res = await fetch('http://localhost:8000/account', {
            cache: 'no-store',
            headers: {
                authorization: authorization
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