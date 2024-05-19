'use client'

import { ToastContext } from "@/app/components/providers/toast-provider";
import { Toast } from "flowbite-react";
import { useContext, useEffect } from "react";

export function Toasts() {
    const { toasts } = useContext(ToastContext);
    useEffect(() => {

        const toastsElements:NodeListOf<HTMLElement> = document.querySelectorAll('.toast');

        if (toasts.length > 1) {
            console.log(toasts[toasts.length - 1].content);
        }

        toastsElements.forEach((item: HTMLElement) => {
            const index = Number(item.dataset.index);
            if (index >= 0) {
                const itemTimeout = toasts[index].timeout;
                console.log('itemTimeout: ' + itemTimeout);
                if (itemTimeout > 0) {
                    setTimeout(() => {
                        const closeBtn: HTMLElement = item.querySelector('[aria-label="Close"]') as HTMLElement;
                        if (closeBtn) {
                            closeBtn.click()
                        }
                    }, itemTimeout)
                }
            }
        });
    }, [toasts]);

    if (toasts && toasts.length > 0) {
        return (
            <div className="flex flex-col gap-4 fixed bottom-5 right-5">
                {toasts.slice().reverse().map((toast, index) => {
                    const toastIndex = toasts.length - index - 1;
                    return (
                        <Toast key={toast.id} id={"toast-" + toastIndex.toString()} className={"toast"} data-index={toastIndex}>
                            {toast.content}
                        </Toast>
                    );
                })}
            </div>
        );
    }

    return null;
}