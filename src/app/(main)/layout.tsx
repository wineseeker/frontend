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
import {LoggedInInfoLoadFailedToast} from "@/app/components/main-layout/logged-in-info-load-failed-toast";
import {getUserInfo} from "@/app/lib/get-userinfo";

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

    const userInfo = await getUserInfo();

    return (
        <>
            <Navbar className={"py-6 md:py-7"} theme={customNavTheme}>
                <NavbarBrand as={Link} href={'/'}><span className={'text-2xl'}>와인 시커</span></NavbarBrand>
                <li className={"flex items-center ml-auto md:text-lg md:order-10 space-x-2"}>
                    <UserInfo userInfo={userInfo} />
                    <NavbarToggle />
                </li>
                <NavbarCollapse className={"md:grow md:ml-8"}>
                    <NavbarLink href={"/survey"}>추천</NavbarLink>
                    <NavbarLink href={"/ranking"}>랭킹</NavbarLink>
                    <li className={"max-md:my-2 md:flex-1 md:ml-8 max-md:-order-10"}>
                        <SearchBar/>
                    </li>
                </NavbarCollapse>
            </Navbar>
            {children}
            <LoggedInInfoLoadFailedToast userInfo={userInfo} />
        </>
);
}