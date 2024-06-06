'use client'

import {FaCircleInfo} from "react-icons/fa6";
import {Button} from "flowbite-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className={"min-h-dvh flex flex-col justify-center"}>
            <div className="flex flex-col justify-space-between text-center gap-4 md:container md:mx-auto">
                <FaCircleInfo className={"mx-auto text-8xl text-rose-600"} />
                <h1 className={"text-4xl font-bold"}>페이지를 찾을 수 없습니다</h1>
                <p className={"text-lg"}>잘못된 주소를 입력하셨거나, 페이지 주소가 변경되거나 해당 페이지가 삭제되었습니다.</p>
                <Button as={Link} href={"/"} color={"rose"} className={"mx-auto"}>
                    <span className={"text-lg"}>홈으로 가기</span>
                </Button>
            </div>
        </div>
    )
}