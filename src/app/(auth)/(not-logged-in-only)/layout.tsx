import {isLoggedIn} from "@/app/lib/is-logged-in";
import {AlreadyLoggedIn} from "@/app/components/auth/already-logged-in";

export default async function Layout ({children}: {children: React.ReactNode}) {
    return (
        <>
            {await isLoggedIn() ? <AlreadyLoggedIn /> : children}
        </>
    )
}