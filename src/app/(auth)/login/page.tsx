import type {Metadata} from "next";
import Link from "next/link";
import {LoginForm} from "@/app/components/auth/login-form";

export const metadata: Metadata = {
    title: "로그인",
    description: "와인 시커 로그인 페이지 입니다.",
};

export default function login() {
    return (
        <>
            <h1 className={"text-2xl font-normal dark:text-white"}>로그인</h1>
            <LoginForm />
            <div className={"text-center"}>비밀번호를 잊으셨나요? <Link className={"underline font-bold"}
                                                              href={"/password-reset"}>비밀번호 초기화</Link></div>
            <div className={"text-center"}>계정이 없으시나요? <Link className={"underline font-bold"}
                                                            href={"/signup"}>회원가입</Link></div>
        </>
    )
}