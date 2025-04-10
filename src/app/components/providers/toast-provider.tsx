'use client'

import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import {UuidV4} from "@/app/lib/uuid-v4";
import {Toasts} from "@/app/components/toasts";

//토스트 아이템 타입 정의
export type ToastItem = {
    readonly id: UuidV4
    content: React.ReactElement,
    timeout: number
}

//컨텍스트 타입
type ToastContextType = {
    toasts: ToastItem[];
    setToasts: Dispatch<SetStateAction<ToastItem[]>>;
};

// Provide a default value
const defaultToastContext: ToastContextType = {
    toasts: [],
    setToasts: () => {}
};

export const ToastContext = createContext<ToastContextType>(defaultToastContext);

export function ToastProvider({children}:{children: React.ReactNode}) {
    const [toasts, setToasts] = useState<ToastItem[]>([])

    useEffect(() => {
        window.addEventListener('popstate', () => {
            setToasts([])
        });
    }, []);


    return (
        <ToastContext.Provider value={{toasts, setToasts}}>
            <Toasts>
                {children}
            </Toasts>
        </ToastContext.Provider>
    )
}