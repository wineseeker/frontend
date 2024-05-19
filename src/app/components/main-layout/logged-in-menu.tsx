'use client'

import {Avatar, Dropdown, Toast} from "flowbite-react";
import {logoutAction} from "@/app/lib/logout";
import {useRouter} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import {ToastContext} from "@/app/components/providers/toast-provider";
import {FaXmark} from "react-icons/fa6";
import {Toasts} from "@/app/components/toasts";
import { v4 as uuidV4 } from 'uuid'

export function LoggedInMenu({avatarUrl, userEmail}: {avatarUrl: string, userEmail: string}) {
    const router = useRouter()
    const { toasts, setToasts } = useContext(ToastContext);
    const [logOutToast, setLogOutToast] = useState(false)

    //로그인 정보 실패 토스트 로드가 된 적이 있는 경우 로그인이 성공한 경우에도 이 토스트가 뜨는 경우가 있으니 삭제처리
    useEffect(() => {
        setToasts([])
    },[])

    async function onClickLogout() {
        const logout = await logoutAction()
        console.log('Logout value:', logout);  // 로그 값 확인

        if(logout) {
            console.log('Inside if block');
            router.refresh()
            setToasts([])
        } else {
            console.log('Inside else block');
            setToasts([...toasts, {
                id: uuidV4(),
                content: (
                    <>
                        <div
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                            <FaXmark className="h-5 w-5"/>
                        </div>
                        <div className="ml-3 text-sm font-normal">서버 문제로 인해 로그아웃에 실패했습니다.</div>
                        <Toast.Toggle/>
                    </>
                ),
                timeout: 5000
            }])
            setLogOutToast(true)
        }
    }

    return (
        <>
            <Dropdown
                arrowIcon={false}
                inline
                label={
                    <Avatar alt="User settings" img={avatarUrl}
                            rounded className={"ml-5 md:h-12 md:w-12"} size="md"/>
                }
                className=" translate-x-4" data-dropdown-offset-skidding={10}
                placement="bottom-end"
            >
                    <Dropdown.Header>
                        <span className="block truncate text-sm font-medium">{userEmail}</span>
                    </Dropdown.Header>
                    <Dropdown.Item>계정 정보</Dropdown.Item>
                    <Dropdown.Item>추천 내역</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={onClickLogout}>
                        로그아웃
                    </Dropdown.Item>
            </Dropdown>
            {logOutToast && <Toasts />}
        </>
    )
}