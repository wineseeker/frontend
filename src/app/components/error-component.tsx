'use client'

import {FaCircleXmark} from "react-icons/fa6";

export function ErrorComponent() {
    return (
        <>
            <FaCircleXmark className={"mx-auto text-8xl text-red-600"} />
            <h1 className={"text-4xl font-bold"}>이런!</h1>
            <p className={"text-lg"}>서버에 오류가 발생했습니다. 나중에 다시 시도해주세요. 이용에 불편을 드려서 죄송합니다</p>
        </>
    )
}