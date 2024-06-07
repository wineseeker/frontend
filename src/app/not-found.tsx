import {NotFoundElement} from "@/app/components/not-found-element";
import {Metadata} from "next";
import {notFoundMetadata} from "@/app/lib/not-found-metadata";

export const metadata: Metadata = notFoundMetadata

export default function NotFound() {
    return (
        <div className={"min-h-dvh flex flex-col justify-center"}>
            <NotFoundElement />
        </div>
    )
}