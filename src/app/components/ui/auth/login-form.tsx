'use client'

import {Button, Checkbox, Label, TextInput} from "flowbite-react";

export function LoginForm() {
    return (
        <form className="flex flex-col gap-4">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email" value="이메일" />
                </div>
                <TextInput id="email" type="email" placeholder="example@exmaple.com" color={"rose"} required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password1" value="비밀번호" />
                </div>
                <TextInput id="password1" type="password" color={"rose"} required />
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="remember" color={"rose"} />
                <Label htmlFor="remember">로그인 상태 유지하기</Label>
            </div>
            <Button type="submit" color={"rose"}>로그인</Button>
        </form>
    )
}

