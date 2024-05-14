import type {Metadata} from "next";
import Link from "next/link";
import SignupForm from "@/app/components/auth/signup-form";

export const metadata: Metadata = {
    title: "회원가입",
    description: "와인 시커 로그인 페이지 입니다.",
};

export default function login() {
    return (
        <>
            <h1 className={"text-2xl font-normal dark:text-white"}>회원가입</h1>
            <SignupForm/>
            <div className={"text-center"}>
                이미 계정이 있으십니까? <Link href={"/login"} className={"underline font-bold"}>로그인</Link>
            </div>
        </>
    )
}