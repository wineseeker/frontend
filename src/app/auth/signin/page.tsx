import {Button, Card, Checkbox, Label, TextInput} from "flowbite-react";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "로그인",
    description: "와인 시커 로그인 페이지 입니다.",
};

export default function login() {
    return (
        <Card className="w-full sm:mx-auto sm:max-w-sm">
            <h1 className={"text-2xl font-normal"}>로그인</h1>
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
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">로그인 상태 유지하기</Label>
                </div>
                <Button type="submit" className={"bg-rose-600 enabled:hover:bg-rose-700"}>로그인</Button>
            </form>
        </Card>
    )
}