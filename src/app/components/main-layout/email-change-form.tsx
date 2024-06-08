'use client'

import {Button, Label, TextInput} from "flowbite-react";
import {useEffect, useRef, useState} from "react";
import {useFormState, useFormStatus} from "react-dom";
import {requestEmailChange} from "@/app/lib/request-email-change";
import {emailChangeVerification} from "@/app/lib/email-change-verification";
import {useRouter} from "next/navigation";

type Step1State = {
    errCode: null | number | undefined
}

const initialStep1State: Step1State = {
    errCode: null
}

const initialStep2State = {
    message: '',
}

export default function EmailChangeForm() {
    const router = useRouter()
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const emailVerificationCodeInputRef = useRef<HTMLInputElement>(null);
    const { pending } = useFormStatus()
    const [ step, setStep ] = useState<number>(1)
    const [verificationCode, setVerificationCode] = useState<string>("");

    useEffect(() => {
        if (step == 1) {
            passwordInputRef.current?.focus();
        } else if (step === 2) {
            if (emailVerificationCodeInputRef.current !== null) {
                emailVerificationCodeInputRef.current.defaultValue = ''
                emailVerificationCodeInputRef.current.focus();
            }
        } else if (step == 3) {
            router.refresh()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[step])

    async function firstFromSubmit(prevState: any, formData: FormData) {
        const password = formData.get('password')
        const newEmail = formData.get('new-email')

        if (!password) {
            return {
                errCode: 1
            }
        } else if (!newEmail) {
            return {
                errCode: 2
            }
        }

        const requestResult = await requestEmailChange(password as string, newEmail as string)

        if (requestResult === true) {
            setStep(step + 1)
            return {
                errCode: undefined
            }
        }

        return {
            errCode: requestResult
        }
    }

    const [step1State, step1FormAction] = useFormState(firstFromSubmit, initialStep1State)
    const [step2State, step2FormAction] = useFormState(emailChangeVerification, initialStep2State)

    useEffect(() => {
        if (step === 2 && step2State === undefined){
            setStep(step + 1)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step2State]);

    if (step === 1) {
        return (
            <form className="flex flex-col gap-4" action={step1FormAction}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="비밀번호"/>
                    </div>
                    <TextInput
                        id="password"
                        name="password"
                        type="password"
                        ref={passwordInputRef}
                        color={(step1State?.errCode === 1) ? "failure" : "rose"}
                        helperText={step1State?.errCode === 1 && "올바른 비밀번호를 입력하세요"}
                        required/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="변경할 이메일"/>
                    </div>
                    <TextInput
                        id="email"
                        name="new-email"
                        type="email"
                        placeholder="example@exmaple.com"
                        color={(step1State?.errCode === 2) ? "failure" : "rose"}
                        helperText={(step1State?.errCode === 2) && "잘못된 이메일을 입력하셨습니다"}
                        required/>
                </div>

                <Button type="submit" color={"rose"} disabled={pending} className={"ml-auto"}>이메일 변경하기</Button>
            </form>
        )
    } else if (step === 2) {
        return (
            <form className="flex flex-col gap-4" action={step2FormAction}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="verification-code" value="인증 코드"/>
                    </div>
                    <TextInput id="verification-code" name="code" inputMode={"numeric"} placeholder="XXXXXXXX"
                               color={(step2State?.message !== '') ? "failure" : "rose"}
                               pattern="[0-9]{8}" maxLength={8} title="8자리 숫자" ref={emailVerificationCodeInputRef}
                               helperText={(step2State?.message !== '')  && step2State?.message}
                               value={verificationCode}
                               onChange={(e) => setVerificationCode(e.target.value)}
                               required/>
                </div>
                <Button type="submit" color={"rose"} disabled={pending}>인증 하기</Button>
            </form>
        )
    } else {
        return (
            <>이메일 변경이 완료되었습니다.</>
        )
    }
}