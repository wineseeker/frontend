import {Button, Card, Checkbox, Label, TextInput} from "flowbite-react";
import type {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "로그인",
    description: "와인 시커 로그인 페이지 입니다.",
};

export default function login() {
    return (
        <Card className="mt-10 w-4/5 mx-auto sm:w-full sm:mt-0 sm:max-w-sm">
            <h1 className={"text-2xl font-normal dark:text-white"}>로그인</h1>
            <form className="flex flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="이메일" />
                    </div>
                    <TextInput id="email1" type="email" placeholder="example@exmaple.com" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="비밀번호" />
                    </div>
                    <TextInput id="password1" type="password" required />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="remember" color={"primary"} />
                    <Label htmlFor="remember">로그인 상태 유지하기</Label>
                </div>
                <Button type="submit" color={"primary"}>로그인</Button>
                <div className={"text-center"}>비밀번호를 잊으셨나요? <Link className={"underline font-bold"} href={"/password-reset"}>비밀번호 초기화</Link></div>
                <div className={"text-center"}>계정이 없으시나요? <Link className={"underline font-bold"} href={"/signup"}>회원가입</Link></div>
            </form>
        </Card>
    )
}