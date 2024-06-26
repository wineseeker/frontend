import Link from "next/link";
import {Card} from "flowbite-react";

export default async function Layout ({children}: {children: React.ReactNode}) {
    return (
        <div className={"min-h-dvh flex flex-col justify-space-between md:justify-center"}>
            <Card className="mt-10 w-4/5 mx-auto sm:w-full sm:mt-0 sm:max-w-sm">
                {children}
            </Card>
            <ul className={"flex space-x-4 w-fit mx-auto text-center"}>
                <li className={"my-7"}>
                    <Link href={"/"} className={"hover:underline"}>홈으로 돌아가기</Link>
                </li>
                <li className={"my-7"}>
                    <Link href={"/privacy"} className={"font-bold hover:underline"}>개인정보처리방침</Link>
                </li>
            </ul>
        </div>
    )
}