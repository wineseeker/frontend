import {Header} from "@/app/components/main-layout/header";
import {PasswordChangeForm} from "@/app/components/main-layout/password-change-form";

export default function Page() {
    return (
        <>
            <Header>비밀번호 변경하기</Header>
            <PasswordChangeForm />
        </>
    )
}