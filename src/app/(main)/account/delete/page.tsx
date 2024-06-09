import {Header} from "@/app/components/main-layout/header";
import {AccountDeleteForm} from "@/app/components/main-layout/account/account-delete-form";
import {getUserInfo} from "@/app/lib/get-userinfo";
import {notFound} from "next/navigation";

export default async function Page() {
    const userInfo = await getUserInfo();

    if (userInfo === null || userInfo === -1) {
        notFound()
    }

    return (
        <>
            <Header>회원 탈퇴</Header>
            <AccountDeleteForm />
        </>
    )

}