'use client'

import {Button, Checkbox, Label, TextInput} from "flowbite-react";
import Link from "next/link";
import {signup} from "@/app/lib/signup";
import {useEffect, useRef} from "react";
import {useFormState, useFormStatus} from "react-dom";

type state = {
    errCode: null | number
}

const initialState: state = {
    errCode: null
}

export default function SignupForm() {
    const emailInputRef = useRef<HTMLInputElement>(null);

    const [state, formAction] = useFormState(signup, initialState)
    const { pending } = useFormStatus()

    useEffect(() => {
        emailInputRef.current?.focus();
    },[])

    return (
        <form className="flex flex-col gap-4" action={formAction}>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email" value="이메일"/>
                </div>
                <TextInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@exmaple.com"
                    color={(state?.errCode === 1 || state?.errCode === 4) ? "failure" : "rose"}
                    ref={emailInputRef}
                    helperText={state?.errCode === 1 ? <>잘못된 이메일을 입력하셨습니다</> : (state?.errCode === 4 && <>이미 사용중인 이메일 입니다</> )}
                    required/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password" value="비밀번호"/>
                </div>
                <TextInput
                    id="password"
                    name="password"
                    type="password"
                    color={(state?.errCode === 2) ? "failure" : "rose"}
                    helperText={state?.errCode === 2 && "비밀번호는 6자리 이상이어야 합니다"}
                    required/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="passwordcomfirm" value="비밀번호 확인"/>
                </div>
                <TextInput
                    id="passwordcomfirm"
                    name={"retypePw"}
                    type="password"
                    color={(state?.errCode === 3) ? "failure" : "rose"}
                    helperText={state?.errCode === 3 && "비밀번호와 비밀번호 확인은 동일한 값을 입력하셔야 합니다"}
                    required/>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="privacy-agree" color={"rose"} required/>
                <Label htmlFor="privacy-agree">
                    <Link href={"/privacy"}
                          className={"text-rose-600 dark:text-rose-700"} >
                        개인정보처리방침
                    </Link>
                    에 동의합니다
                </Label>
            </div>
            <Button type="submit" color={"rose"} disabled={pending}>회원가입</Button>
        </form>
    )
}