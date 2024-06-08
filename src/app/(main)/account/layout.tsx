import {ReactNode} from "react";

export default function Layout({children}: {children: ReactNode}) {
    return (
        <div className={"mt-4 mx-4 flex flex-col gap-4 md:container lg:max-w-screen-lg md:mx-auto"}>
            {children}
        </div>
    )
}