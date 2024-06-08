import type {AccountInfo} from "@/app/types/account-info";
import {cookies} from "next/headers";
import {notFound} from "next/navigation";
import {Metadata, ResolvingMetadata} from "next";
import {Header} from "@/app/components/main-layout/header";
import { AccountInfoElement } from "@/app/components/main-layout/account-info-element";
import {Suspense} from "react";

async function getAccountInfo(): Promise<AccountInfo> {
    const res = await fetch('http://localhost:8000/account', {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${cookies().get('session')?.value}`
        }
    })

    if (!res.ok) {
        notFound()
    }

    return res.json()
}


export async function generateMetadata(
    {}): Promise<Metadata> {
    await getAccountInfo()

    return ({
        title: "계정 정보",
        robots: {
            index: false
        }
    })
}

export default async function Page() {
    const accountInfo = await getAccountInfo();
    return (
        <>
            <Header>계정 정보</Header>
            <Suspense>
                <AccountInfoElement accountInfo={accountInfo} />
            </Suspense>
        </>
    )
}