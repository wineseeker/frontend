import {Button, Navbar, NavbarBrand} from "flowbite-react";
import Link from "next/link";

export default function MainLayout({children}: {children:React.ReactNode}) {
    return (
        <>
            <Navbar className={"py-7"}>
                <NavbarBrand as={Link} href={'/'}><span className={'text-2xl'}>와인 시커</span></NavbarBrand>
                <div className={"flex md:order-2 items-center"}>
                    <Link className={"px-5"} href={"/login"}>로그인</Link>
                    <Button as={Link} href={"/signup"}>회원가입</Button>
                </div>
            </Navbar>
            {children}
        </>
    );
}