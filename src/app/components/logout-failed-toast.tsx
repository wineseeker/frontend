'use client'

import {Toast} from "flowbite-react";
import {HiX} from "react-icons/hi";

export function LogoutFailedToast({ failedCount }:{ failedCount: number }) {
    const toast = () => {
        const toasts = [];
        for (let i = 1; i <= failedCount; i++) {
            toasts.push(
                <Toast>
                    <div
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                        <HiX className="h-5 w-5"/>
                    </div>
                    <div className="ml-3 text-sm font-normal">서버 문제로 인해 로그아웃에 실패했습니다.</div>
                    <Toast.Toggle />
                </Toast>
            );
        }
        return toasts;
    };

    return (
        <div className="flex flex-col gap-4 fixed bottom-5 right-5">
            {toast()}
        </div>
    )
}