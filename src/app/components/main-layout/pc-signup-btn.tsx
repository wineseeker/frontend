'use client'

import Link from "next/link";
import {Button} from "flowbite-react";

export default function PcSignupBtn() {
    return (
        <Button as={Link} href={"/signup"} className={"max-md:hidden"} color={"rose"}>
            <span className={"md:text-lg"}>회원가입</span>
        </Button>
    )
}