import {isLoggedIn} from "@/app/lib/isLoggedIn";
import {AlreadyLoggedIn} from "@/app/components/auth/already-logged-in";

export default async function Layout ({children}: {children: React.ReactNode}) {
    return (
        <>
            {await isLoggedIn() ? <AlreadyLoggedIn /> : children}
        </>
    )
}