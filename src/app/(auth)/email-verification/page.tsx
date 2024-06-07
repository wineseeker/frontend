import type {Metadata} from "next";
import Link from "next/link";
import {LoginForm} from "@/app/components/auth/login-form";
import {logoutAction} from "@/app/lib/logout";
import { redirect } from 'next/navigation'
import {EmailVerificationForm} from "@/app/components/auth/email-verification-form";

export const metadata: Metadata = {
    title: "이메일 인증",
    description: "와인 시커 로그인 페이지 입니다.",
};

export default async function login() {

    return (
        <>
            <h1 className={"text-2xl font-medium dark:text-white"}>이메일 인증</h1>
            <EmailVerificationForm />
        </>
    )
}