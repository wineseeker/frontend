import Link from "next/link";

export default function Layout ({children}: {children: React.ReactNode}) {
    return (
        <div className={"h-screen flex flex-col justify-space-between md:justify-center"}>
            {children}
            <div className={"w-4/5 mx-auto sm:w-full sm:max-w-sm text-center"}>
                <ul>
                    <li className={"my-7"}><Link href={"/privacy"} className={"hover:underline"}>개인정보처리방침</Link></li>
                </ul>
            </div>
        </div>
    )
}