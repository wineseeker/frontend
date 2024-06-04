'use client'

import { usePathname } from 'next/navigation'
import { Footer as FBFooter } from "flowbite-react";

export function Footer() {
    const pathname = usePathname()
    if (pathname !== '/') {
        return (
            <footer className={" py-5 flex mx-5 md:container md:mx-auto"}>
                <FBFooter.LinkGroup className={"ml-auto"}>
                    <FBFooter.Link href="/privacy" className={"font-bold"}>개인정보처리방침</FBFooter.Link>
                </FBFooter.LinkGroup>
            </footer>
        )
    } else {
        return null
    }
}