import EmailChangeForm from "@/app/components/main-layout/account/email-change-form";
import {Header} from "@/app/components/main-layout/header";

export default function Page() {
    return (
        <>
            <Header>이메일 변경하기</Header>
            <EmailChangeForm />
        </>
    )
}