'use client'

import {FaCircleXmark} from "react-icons/fa6";
import {Button} from "flowbite-react";

export default function GlobalError({error, reset}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className={"min-h-dvh flex flex-col justify-center"}>
            <div className="flex flex-col justify-space-between text-center gap-4 md:container md:mx-auto">
                <FaCircleXmark className={"mx-auto text-9xl text-red-600"} />
                <h1 className={"text-4xl font-bold"}>이런!</h1>
                <p className={"text-lg"}>서버에 오류가 발생했습니다. 나중에 다시 시도해주세요. 이용에 불편을 드려서 죄송합니다</p>
                <Button onClick={() => reset()} color={"rose"} className={"mx-auto"}>
                    <span className={"text-lg"}>다시 시도</span>
                </Button>
            </div>
        </div>
    )
}