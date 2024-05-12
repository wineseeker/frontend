import {
    Button,
    CustomFlowbiteTheme,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle
} from "flowbite-react";
import Link from "next/link";
import SearchBar from "@/app/components/ui/search-bar";

export default function MainLayout({children}: {children:React.ReactNode}) {
    const customNavTheme: CustomFlowbiteTheme["navbar"] = {
        root: {
            inner: {
                base: "mx-auto flex flex-wrap items-center"
            }
        },
        collapse: {
            list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-lg md:font-medium md:items-center"
        },
    };

    return (
        <>
            <Navbar className={"py-7"} theme={customNavTheme}>
                <NavbarBrand as={Link} href={'/'}><span className={'text-2xl'}>와인 시커</span></NavbarBrand>
                <li className={"flex order-10 items-center md:text-lg md:ml-8 max-md:hidden"}>
                    <Link className={"px-5"} href={"/login"}>로그인</Link>
                    <Button as={Link} href={"/signup"} color={"rose"}><span
                        className={"md:text-lg"}>회원가입</span>
                    </Button>
                </li>
                <li className={"ml-auto flex"}>
                    <Button as={Link} className={"mr-2 md:hidden"} href={"/login"} color={"rose"}>
                        <span className={"md:text-lg"}>로그인</span>
                    </Button>
                    <NavbarToggle/>
                </li>
                <NavbarCollapse className={"md:grow"}>
                    <li className={"max-md:my-2 md:order-10 md:w-max md:flex-1 md:ml-8"}>
                        <SearchBar/>
                    </li>
                    <NavbarLink href={"/ranking"}>랭킹</NavbarLink>
                </NavbarCollapse>

            </Navbar>
            {children}
        </>
    );
}