'use client'

import {Button, Checkbox, Label, TextInput} from "flowbite-react";
import {useFormState, useFormStatus} from "react-dom";
import {deleteAccount} from "@/app/lib/delete-account";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";

const initialState = {
    message: '',
}

export function AccountDeleteForm() {
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [state, formAction] = useFormState(deleteAccount, initialState)
    const { pending } = useFormStatus()

    const [step, setStep] = useState<number>(1)

    const router = useRouter();

    useEffect(() => {
        if (step === 1 && state === undefined) {
            setStep(step + 1)
            router.refresh()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    if (step === 1) {
        return (
            <form className="flex flex-col gap-4" action={formAction}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="비밀번호"/>
                    </div>
                    <TextInput
                        id="password"
                        name="password"
                        type="password"
                        ref={passwordInputRef}
                        color={(state?.message) ? "failure" : "rose"}
                        helperText={state?.message}
                        required/>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="privacy-agree" color={"rose"} required/>
                    <Label htmlFor="privacy-agree">
                        회원 탈퇴를 할 경우 복구가 불가능하며 이에 동의합니다
                    </Label>
                </div>
                <Button type="submit" color={"rose"} disabled={pending} className={"ml-auto"}>탈퇴하기</Button>
            </form>
        )
    } else if (step === 2) {
        return (
            <p>회원 탈퇴가 완료되었습니다. 와인 시커를 이용해주셔서 감사합니다.</p>
        )
    }
}