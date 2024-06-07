'use client'

import {Alert, Button, Checkbox, Label, TextInput} from "flowbite-react";
import {useEffect, useRef} from "react";
import {useFormState, useFormStatus} from "react-dom";
import {logoutAction} from "@/app/lib/logout";
import {redirect, useRouter} from "next/navigation";
import {emailVerification} from "@/app/lib/email-verification";
import {verificationEmailResend} from "@/app/lib/verification-email-resend";

const initialState = {
    message: '',
}

export function EmailVerificationForm() {
    const emailVerificationCodeInputRef = useRef<HTMLInputElement>(null);
    const [state, formAction] = useFormState(emailVerification, initialState)
    const { pending } = useFormStatus()
    const router = useRouter();

    useEffect(() => {
        emailVerificationCodeInputRef.current?.focus();
    },[])

    return (
        <>
            {state?.message && <Alert color="failure">{state?.message}</Alert>}
            <form className="flex flex-col gap-4" action={formAction}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="verification-code" value="인증 코드"/>
                    </div>
                    <TextInput id="verification-code" name="code" inputMode={"numeric"} placeholder="XXXXXXXX"
                               color={"rose"}
                               pattern="[0-9]{8}" maxLength={8} title="8자리 숫자" ref={emailVerificationCodeInputRef}
                               required/>
                </div>
                <Button type="submit" color={"rose"} disabled={pending}>인증 하기</Button>
            </form>
            <div className={"text-center"}>
                혹시 이메일이 오지 않나요?{' '}
                <a className={"underline font-bold"} href={"#"}
                   onClick={async () => {
                       await verificationEmailResend()
                       window.alert("이메일이 재전송 되었습니다.")
                   }}>
                    이메일 재전송
                </a>
            </div>
            <div className={"text-center"}>
                다른 계정으로 로그인 하고 싶으신가요?{' '}
                <a className={"underline font-bold"} href={"#"}
                   onClick={async () => {
                       const logout = await logoutAction()
                       if (logout) {
                           router.push('/login')
                       }
                   }}>
                    로그아웃
                </a>
            </div>
        </>
    )
}

