import {Header} from "@/app/components/main-layout/header";
import {AccountDeleteForm} from "@/app/components/main-layout/account/account-delete-form";

export default async function Page() {
    return (
        <>
            <Header>회원 탈퇴</Header>
            <AccountDeleteForm />
        </>
    )

}