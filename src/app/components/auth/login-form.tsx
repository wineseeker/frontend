'use client'

import {Button, Checkbox, Label, TextInput} from "flowbite-react";
import {login} from "@/app/lib/login";
import {useEffect, useRef} from "react";

export function LoginForm() {
    const emailInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        emailInputRef.current?.focus();
    },[])

    return (
        <form className="flex flex-col gap-4" action={login}>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email" value="이메일" />
                </div>
                <TextInput id="email" name="email" type="email" placeholder="example@exmaple.com" color={"rose"} ref={emailInputRef} required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password" value="비밀번호" />
                </div>
                <TextInput id="password" name={"password"} type="password" color={"rose"} required />
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="remember" name="remember" color={"rose"} />
                <Label htmlFor="remember">로그인 상태 유지하기</Label>
            </div>
            <Button type="submit" color={"rose"}>로그인</Button>
        </form>
    )
}

