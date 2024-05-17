'use client'

import {Avatar, Dropdown} from "flowbite-react";
import {logout} from "@/app/lib/logout";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {LogoutFailedToast} from "@/app/components/logout-failed-toast";

export function LoggedInMenu({avatarUrl, userEmail}: {avatarUrl: string, userEmail: string}) {
    const router = useRouter()
    const [logoutFailedCount, setLogoutFailedCount] = useState(0)

    return (
        <>
            <Dropdown
                arrowIcon={false}
                inline
                label={
                    <Avatar alt="User settings" img={avatarUrl}
                            rounded className={"ml-5 md:h-12 md:w-12"} size="md"/>
                }
            >
                <Dropdown.Header>
                    <span className="block truncate text-sm font-medium">{userEmail}</span>
                </Dropdown.Header>
                <Dropdown.Item>계정 정보</Dropdown.Item>
                <Dropdown.Item>추천 내역</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                onClick={async ()=> {
                    if(await logout()) {
                        router.push("/")
                    } else {
                        setLogoutFailedCount(logoutFailedCount + 1)
                    }
                }}>
                    로그아웃
                </Dropdown.Item>
            </Dropdown>
            {(logoutFailedCount > 0) && <LogoutFailedToast failedCount={logoutFailedCount} />}
        </>
    )
}