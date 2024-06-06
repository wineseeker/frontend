'use client'

import {useEffect, useState} from "react";

export function ResultTitle({dateTime}: {dateTime: string}) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <h1 className={"text-4xl font-bold"} suppressHydrationWarning={true} >
            {new Intl.DateTimeFormat("ko-KR", {
                dateStyle: "long",
                timeStyle: "short",
                // 클라이언트 렌더링 중에는 서울 시간대로 렌더링 했다가 클라이언트 시간대로 변경
                timeZone: isClient? undefined : "Asia/Seoul",
            }).format(new Date(dateTime))}
            의 설문 결과
        </h1>
    )
}