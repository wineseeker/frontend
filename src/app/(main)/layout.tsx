import {
    CustomFlowbiteTheme,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle
} from "flowbite-react";
import Link from "next/link";
import SearchBar from "@/app/components/main-layout/search-bar";
import PcSignupBtn from "@/app/components/main-layout/pc-signup-btn";
import {MobileLoginBtn} from "@/app/components/main-layout/mobile-login-btn";

export default function MainLayout({children}: {children:React.ReactNode}) {
    const customNavTheme: CustomFlowbiteTheme["navbar"] = {
        root: {
            inner: {
                base: "mx-auto flex flex-wrap justify-normal items-center"
            }
        },
        collapse: {
            list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-lg md:font-medium md:items-center"
        },
    };

    return (
        <>
            <Navbar className={"py-6 md:py-7"} theme={customNavTheme}>
                <NavbarBrand as={Link} href={'/'}><span className={'text-2xl'}>와인 시커</span></NavbarBrand>
                <li className={"flex items-center ml-auto md:text-lg md:order-10 space-x-2"}>
                    <MobileLoginBtn />
                    <Link className={"max-md:hidden px-4"} href={"/login"}>로그인</Link>
                    <PcSignupBtn />
                    <NavbarToggle />
                </li>
                <NavbarCollapse className={"md:grow md:ml-8"}>
                    <NavbarLink href={"/survey"}>추천</NavbarLink>
                    <NavbarLink href={"/ranking"}>랭킹</NavbarLink>
                    <li className={"max-md:my-2 md:flex-1 md:ml-8 max-md:-order-10"}>
                        <SearchBar />
                    </li>
                </NavbarCollapse>
            </Navbar>
            {children}
        </>
    );
}