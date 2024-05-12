import {Button, Checkbox, Label, TextInput} from "flowbite-react";
import type {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "회원가입",
    description: "와인 시커 로그인 페이지 입니다.",
};

export default function login() {
    return (
        <>
            <h1 className={"text-2xl font-normal dark:text-white"}>회원가입</h1>
            <form className="flex flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="이메일"/>
                    </div>
                    <TextInput id="email1" type="email" placeholder="example@exmaple.com" required/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="비밀번호"/>
                    </div>
                    <TextInput id="password1" type="password" required/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1comfirm" value="비밀번호 확인"/>
                    </div>
                    <TextInput id="password1comfirm" type="password" required/>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="privacy-agree" color={"primary"} required/>
                    <Label htmlFor="privacy-agree"><Link href={"/privacy"} className={"text-rose-600 dark:text-rose-700"}>개인정보처리방침</Link>에 동의합니다</Label>
                </div>
                <Button type="submit" color={"rose"}>회원가입</Button>
            </form>
            <div className={"text-center"}>
                이미 계정이 있으십니까? <Link href={"/login"} className={"underline font-bold"}>로그인</Link>
            </div>
        </>
    )
}