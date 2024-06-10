'use client'

import {Button, Checkbox, Label, TextInput, Toast} from "flowbite-react";
import {useFormState, useFormStatus} from "react-dom";
import {deleteAccount} from "@/app/lib/delete-account";
import {useContext, useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import {UuidV4} from "@/app/lib/uuidv4";
import {FaCheck} from "react-icons/fa6";
import {ToastContext} from "@/app/components/providers/toast-provider";

const initialState = {
    message: '',
}

export function AccountDeleteForm() {
    const { setToasts } = useContext(ToastContext);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [state, formAction] = useFormState(deleteAccount, initialState)
    const { pending } = useFormStatus()
    const router = useRouter();

    useEffect(() => {
        if (state === undefined) {
            setToasts([{
                id: UuidV4.generate(),
                content: (
                    <>
                        <div
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                            <FaCheck className="h-5 w-5"/>
                        </div>
                        <div className="ml-3 text-sm font-normal">
                            회원 탈퇴가 완료되었습니다. 와인 시커를 이용해주셔서 감사합니다. 브라우저 캐시를 지울 때까지 일부 페이지에서에서 아직 로그인이 되어 있는 것처럼 보일 수 있습니다.
                        </div>
                        <Toast.Toggle/>
                    </>
                ),
                timeout: 5000
            }])
            router.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

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
}