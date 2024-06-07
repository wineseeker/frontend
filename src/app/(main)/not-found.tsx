import {FaCircleInfo} from "react-icons/fa6";
import {Button} from "flowbite-react";
import Link from "next/link";
import {NotFoundElement} from "@/app/components/not-found-element";
import {notFoundMetadata} from "@/app/lib/not-found-metadata";

export const metadata = notFoundMetadata

export default function NotFound() {
    return (
        <div className="flex flex-col justify-space-between justify-center text-center gap-4 h-[80dvh] md:container md:mx-auto">
            <NotFoundElement />
        </div>
    )
}