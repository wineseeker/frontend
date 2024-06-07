'use client'

import {List} from "flowbite-react";
import {FaAngleRight} from "react-icons/fa6";
import type {AccountInfo} from "@/app/types/account-info";
import Link from "next/link";

export function AccountInfoElement({accountInfo}: {accountInfo: AccountInfo}) {
    return (
        <List unstyled className="divide-y space-y-0 divide-gray-200 dark:divide-gray-700 text-black bold-list-numbers items-center">
            <Link href={"/account/email-change"}>
                <List.Item className={"flex px-3 py-2 sm:py-3 hover:bg-slate-50"}>
                    <div className={"flex flex-col"}>
                        <div>이메일</div>
                        <div className={"text-sm text-gray-500"}>{accountInfo.email}</div>
                    </div>
                    <FaAngleRight className={"ml-auto my-auto"} />
                </List.Item>
            </Link>
            <List.Item className={"flex px-3 py-2 hover:bg-slate-50 sm:py-3"}>
                <div className={"flex flex-col"}>
                    <div>비밀번호 변경하기</div>
                    <div className={"text-sm text-gray-500"}>비밀번호를 변경합니다</div>
                </div>
                <FaAngleRight className={"ml-auto my-auto"} />
            </List.Item>
            <List.Item className={"flex px-3 py-2 hover:bg-slate-50 sm:py-3"}>
                <div className={"flex flex-col"}>
                    <div>회원 탈퇴</div>
                    <div className={"text-sm text-gray-500"}>와인 시커에서 탈퇴합니다</div>
                </div>
                <FaAngleRight className={"ml-auto my-auto"} />
            </List.Item>
        </List>
    )
}