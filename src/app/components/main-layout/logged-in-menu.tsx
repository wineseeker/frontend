'use client'

import {Avatar, Dropdown} from "flowbite-react";

export function LoggedInMenu({avatarUrl, userEmail}: {avatarUrl: string, userEmail: string}) {
    return (
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
            <Dropdown.Item>로그아웃</Dropdown.Item>
        </Dropdown>
    )
}