import type {Metadata} from "next";
import {EmailVerificationForm} from "@/app/components/auth/email-verification-form";
import { unstable_noStore as noStore } from 'next/cache';

export const metadata: Metadata = {
    title: "이메일 인증",
    description: "와인 시커 로그인 페이지 입니다.",
};

export default async function Page() {
    noStore()
    return (
        <>
            <h1 className={"text-2xl font-medium dark:text-white"}>이메일 인증</h1>
            <EmailVerificationForm />
        </>
    )
}