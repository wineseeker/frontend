'use client'

import {Button, Checkbox, Label, TextInput} from "flowbite-react";
import Link from "next/link";
import {signup} from "@/app/lib/signup";
import {useEffect, useRef} from "react";

export default function SignupForm() {
    const emailInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        emailInputRef.current?.focus();
    },[])

    return (
        <form className="flex flex-col gap-4" action={signup}>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email" value="이메일"/>
                </div>
                <TextInput id="email" name="email" type="email" placeholder="example@exmaple.com" color={"rose"} ref={emailInputRef} required/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password" value="비밀번호"/>
                </div>
                <TextInput id="password" name="password" type="password" color={"rose"} required/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="passwordcomfirm" value="비밀번호 확인"/>
                </div>
                <TextInput id="passwordcomfirm" type="password" color={"rose"} required/>
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
            <Button type="submit" color={"rose"}>회원가입</Button>
        </form>
    )
}