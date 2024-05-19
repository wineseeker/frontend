'use client'

import {Button} from "flowbite-react";
import Link from "next/link";

export function MainPageButton() {
    return (
        <div className={"text-right w-fit max-md:mx-auto md:ml-auto"}>
            <Button color={"rose"} size={"xl"} as={Link} href={"/survey"}>시작하기</Button>
        </div>
    )
}