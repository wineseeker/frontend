'use client'

import {Button, Checkbox, Label, TextInput} from "flowbite-react";
import Link from "next/link";

export default function SignupForm() {
    return (
        <form className="flex flex-col gap-4">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email1" value="이메일"/>
                </div>
                <TextInput id="email1" type="email" placeholder="example@exmaple.com" color={"rose"} required/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password1" value="비밀번호"/>
                </div>
                <TextInput id="password1" type="password" color={"rose"} required/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password1comfirm" value="비밀번호 확인"/>
                </div>
                <TextInput id="password1comfirm" type="password" color={"rose"} required/>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="privacy-agree" color={"rose"} required/>
                <Label htmlFor="privacy-agree"><Link href={"/privacy"}
                                                     className={"text-rose-600 dark:text-rose-700"}>개인정보처리방침</Link>에
                    동의합니다</Label>
            </div>
            <Button type="submit" color={"rose"}>회원가입</Button>
        </form>
    )
}