'use client'

import Link from "next/link";
import {Button} from "flowbite-react";

export function MobileLoginBtn () {
    return (
        <Button as={Link} className={"md:hidden"} href={"/login"} color={"rose"}>
            <span className={"md:text-lg font-medium"}>로그인</span>
        </Button>
    )
}