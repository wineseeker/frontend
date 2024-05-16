import {MobileLoginBtn} from "@/app/components/main-layout/mobile-login-btn";
import Link from "next/link";
import PcSignupBtn from "@/app/components/main-layout/pc-signup-btn";
import {LoggedInMenu} from "@/app/components/main-layout/logged-in-menu";

export async function UserInfo({ userInfo }:
                                   { userInfo: any}) {

    async function getGravatarURL(email: string): Promise<string> {
        'use server'

        const address = String( email ).trim().toLowerCase();

        const {
            createHash,
        } = await import('node:crypto');


        const hash = createHash('sha256');

        hash.update(address);

        return `https://www.gravatar.com/avatar/${ hash.digest('hex').toString() }?d=mp`
    }

    if (userInfo === null || userInfo === -1) {
        return (
            <>
                <MobileLoginBtn/>
                <Link className={"max-md:hidden px-4"} href={"/login"}>로그인</Link>
                <PcSignupBtn/>
            </>
        )
    } else {
        return (
            <LoggedInMenu avatarUrl={await getGravatarURL(userInfo.email)} userEmail={userInfo.email} />
        );
    }
}