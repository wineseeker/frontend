'use client'

import {Toast} from "flowbite-react"
import {HiX} from "react-icons/hi"
import {useContext, useEffect } from "react";
import {ToastContext} from "@/app/components/providers/toast-provider";
import {UuidV4} from "@/app/lib/uuid-v4";
import {MobileLoginBtn} from "@/app/components/main-layout/userinfo/mobile-login-btn";
import Link from "next/link";
import PcSignupBtn from "@/app/components/main-layout/userinfo/pc-signup-btn";

export function NotLoggedInMenu({userInfo}: {userInfo: any}) {
    const { toasts, setToasts } = useContext(ToastContext);

    useEffect(() => {
        if (userInfo === -1) {
            setToasts([...toasts, {
                id: UuidV4.generate(),
                content: (
                    <>
                        <div
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                            <HiX className="h-5 w-5"/>
                        </div>
                        <div className="ml-3 text-sm font-normal">로그인 정보를 불러오는데 실패했습니다.</div>
                        <a
                            href="#"
                            className="rounded-lg p-1.5 text-sm font-medium text-rose-600 hover:bg-rose-100 dark:text-rose-700 dark:hover:bg-gray-700"
                            onClick={() => {
                                window.location.reload();
                            }}
                        >
                            새로&nbsp;고침
                        </a>
                        <Toast.Toggle/>
                    </>
                ),
                timeout: 7000
            }])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <MobileLoginBtn />
            <Link className={"max-md:hidden px-4"} href={"/login"}>로그인</Link>
            <PcSignupBtn />
        </>
    )
}