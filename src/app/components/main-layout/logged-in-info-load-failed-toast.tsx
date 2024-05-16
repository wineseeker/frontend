'use client'

import {Toast} from "flowbite-react"
import {HiX} from "react-icons/hi"
import { useRouter } from 'next/navigation'

export function LoggedInInfoLoadFailedToast({ userInfo }: { userInfo: any }) {
    const router = useRouter()

    if (userInfo === -1 ) {
        return (
            <Toast className={"fixed bottom-5 right-5"}>
                <div
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                    <HiX className="h-5 w-5"/>
                </div>
                <div className="ml-3 text-sm font-normal">로그인 정보를 불러오는데 실패했습니다.</div>
                <a
                    href="#"
                    className="rounded-lg p-1.5 text-sm font-medium text-rose-600 hover:bg-rose-100 dark:text-rose-700 dark:hover:bg-gray-700"
                    onClick={router.refresh}
                >
                    새로&nbsp;고침
                </a>
                <Toast.Toggle />
            </Toast>
        )
    }
}