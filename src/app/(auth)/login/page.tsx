import type {Metadata} from "next";
import Link from "next/link";
import {LoginForm} from "@/app/components/auth/login-form";
import {cookies} from "next/headers";

export const metadata: Metadata = {
    title: "로그인",
    description: "와인 시커 로그인 페이지 입니다.",
};

async function loggedIn () {
    if (cookies().has('session')) {
        const res = await fetch('http://localhost:8000/account', {
            cache: 'no-store',
            headers: {
                authorization: `Bearer ${cookies().get('session')?.value}`
            }
        })

        if (res.ok) {
            return true
        } else if (res.status === 401 || res.status === 403) {
            return false
        }

        throw new Error("Oops!")
    }

    return false
}

export default async function login() {
    if (!(await loggedIn())) {
        return (
            <>
                <h1 className={"text-2xl font-medium dark:text-white"}>로그인</h1>
                <LoginForm/>
                <div className={"text-center"}>
                    비밀번호를 잊으셨나요?{' '}
                    <Link className={"underline font-bold"}
                          href={"/password-reset"}>
                        비밀번호 초기화
                    </Link>
                </div>
                <div className={"text-center"}>
                    계정이 없으시나요?{' '}
                    <Link className={"underline font-bold"} href={"/signup"}>
                        회원가입
                    </Link>
                </div>
            </>
        )
    } else {
        return (
            <>
                <h1 className={"text-2xl font-medium dark:text-white"}>이미 로그인 되어 있습니다.</h1>
                <p>귀하는 이미 로그인이 되어있습니다</p>
            </>
    )
    }
}