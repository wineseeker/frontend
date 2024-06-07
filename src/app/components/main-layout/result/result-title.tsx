'use client'

import {useEffect, useState} from "react";
import {Header} from "@/app/components/main-layout/header";

export function ResultTitle({dateTime}: {dateTime: string}) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        document.title = new Intl.DateTimeFormat("ko-KR", {
            dateStyle: "long",
            timeStyle: "short",
            // 클라이언트 렌더링 중에는 서울 시간대로 렌더링 했다가 클라이언트 시간대로 변경
            timeZone: isClient? undefined : "Asia/Seoul",
        }).format(new Date(dateTime)) + "에 완료된 설문에 대한 추천 - 와인 시커"
    }, [])

    return (
        <Header>
            {new Intl.DateTimeFormat("ko-KR", {
                dateStyle: "long",
                timeStyle: "short",
                // 클라이언트 렌더링 중에는 서울 시간대로 렌더링 했다가 클라이언트 시간대로 변경
                timeZone: isClient? undefined : "Asia/Seoul",
            }).format(new Date(dateTime))}
            에 완료된 설문에 대한 추천
        </Header>
    )
}