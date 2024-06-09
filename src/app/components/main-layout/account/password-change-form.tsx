'use client'

import {useEffect, useRef, useState} from "react";
import {Button, Label, TextInput} from "flowbite-react";
import {useFormState, useFormStatus} from "react-dom";
import {passwordChange} from "@/app/lib/password-change";

export function PasswordChangeForm() {
    type State = {
        errCode: null | number | undefined
    }

    const initialState: State = {
        errCode: null
    }

    const [step, setStep] = useState<number>(1)

    const passwordInputRef = useRef<HTMLInputElement>(null);

    const [state, formAction] = useFormState(passwordChange, initialState)

    const { pending } = useFormStatus()

    useEffect(() => {
        if (step === 1 && state === undefined)
            setStep(step + 1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    if (step === 1) {
        return (
            <form className="flex flex-col gap-4" action={formAction}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="기존 비밀번호"/>
                    </div>
                    <TextInput
                        id="password"
                        name="password"
                        type="password"
                        placeholder=""
                        color={(state?.errCode === 1 || state?.errCode === 4) ? "failure" : "rose"}
                        ref={passwordInputRef}
                        helperText={state?.errCode === 1 && "잘못된 비밀번호를 입력했습니다"}
                        required/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="새로운 비밀번호"/>
                    </div>
                    <TextInput
                        id="new-password"
                        name="new-password"
                        type="password"
                        color={(state?.errCode === 2) ? "failure" : "rose"}
                        helperText={state?.errCode === 2 && "비밀번호는 6자리 이상이어야 합니다"}
                        required/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="new-password-confirm" value="새로운 비밀번호 확인"/>
                    </div>
                    <TextInput
                        id="new-password-confirm"
                        name={"new-password-confirm"}
                        type="password"
                        color={(state?.errCode === 3) ? "failure" : "rose"}
                        helperText={state?.errCode === 3 && "비밀번호와 비밀번호 확인은 동일한 값을 입력하셔야 합니다"}
                        required/>
                </div>
                <Button type="submit" color={"rose"} className={"ml-auto"} disabled={pending}>비밀번호 변경</Button>
            </form>
        )
    } else if (step === 2) {
        return (
            <>
                비밀번호 변경이 완료되었습니다.
            </>
        )
    } else {
        return null
    }
}