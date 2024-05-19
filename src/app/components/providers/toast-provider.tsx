'use client'

import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";

//토스트 아이템 타입 정의
export type ToastItem = {
    id: string
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
            {children}
        </ToastContext.Provider>
    )
}