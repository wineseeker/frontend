'use client'

import {Alert, Button, Checkbox, Label, TextInput} from "flowbite-react";
import {login} from "@/app/lib/login";
import {useEffect, useRef} from "react";
import {useFormState, useFormStatus} from "react-dom";

const initialState = {
    message: '',
}

export function LoginForm() {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const [state, formAction] = useFormState(login, initialState)
    const { pending } = useFormStatus()

    useEffect(() => {
        emailInputRef.current?.focus();
    },[])

    return (
        <>
            {state?.message && <Alert color="failure">{state?.message}</Alert>}
            <form className="flex flex-col gap-4" action={formAction}>
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
                <Button type="submit" color={"rose"} disabled={pending}>로그인</Button>
            </form>
        </>
    )
}

