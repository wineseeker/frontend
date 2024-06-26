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
import {UserInfo} from "@/app/components/main-layout/user-info";
import {Footer} from "@/app/components/main-layout/footer";
import {Suspense} from "react";

export default async function MainLayout({children}: {children:React.ReactNode}) {

    const customNavTheme: CustomFlowbiteTheme["navbar"] = {
        root: {
            inner: {
                base: "mx-auto flex flex-wrap justify-normal items-center"
            }
        },
        collapse: {
            list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-lg md:font-medium md:items-center"
        },
        link: {
            active: {
                on: "bg-rose-600 text-white dark:text-white md:bg-transparent md:text-rose-600",
                off: "border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-rose-600 md:dark:hover:bg-transparent md:dark:hover:text-white"
            }
        }
    };

    return (
        <>
            <div className={"min-h-dvh flex flex-col"}>
                <Navbar className={"py-6 md:py-7"} theme={customNavTheme}>
                    <NavbarBrand as={Link} href={'/'}><span className={'text-2xl'}>와인 시커</span></NavbarBrand>
                    <li className={"flex items-center ml-auto md:text-lg md:order-10 space-x-2"}>
                        <UserInfo />
                        <NavbarToggle />
                    </li>
                    <NavbarCollapse className={"md:grow md:ml-8"}>
                        <NavbarLink as={Link} href={"/survey"}>취향 설문하고 와인 추천 받기</NavbarLink>
                        <NavbarLink as={Link} href={"/ranking"}>랭킹</NavbarLink>
                        <li className={"max-md:my-2 md:flex-1 md:ml-8 max-md:-order-10"}>
                            <Suspense>
                                <SearchBar/>
                            </Suspense>
                        </li>
                    </NavbarCollapse>
                </Navbar>
                <div>
                    {children}
                </div>
                <Footer />
            </div>
        </>
);
}