'use client'

import {Button} from "flowbite-react";
import {ErrorComponent} from "@/app/components/error-component";

export default function GlobalError({error, reset}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className={"min-h-dvh flex flex-col justify-center"}>
            <div className="flex flex-col justify-space-between text-center gap-4 md:container md:mx-auto">
                <ErrorComponent />
                <Button onClick={() => reset()} color={"rose"} className={"mx-auto"}>
                    <span className={"text-lg"}>다시 시도</span>
                </Button>
            </div>
        </div>
    )
}