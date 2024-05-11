import {Navbar, NavbarBrand} from "flowbite-react";
import Link from "next/link";

export default function MainLayout({children}: {children:React.ReactNode}) {
    return (
        <>
            <Navbar>
                <NavbarBrand as={Link} href={'/'}><span className={'text-xl'}>와인 시커</span></NavbarBrand>
            </Navbar>
            {children}
        </>
    );
}