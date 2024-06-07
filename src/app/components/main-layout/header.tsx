'use client'

export function Header({children}: {children: React.ReactNode}) {
    return (
        <header>
            <h1 className={"text-3xl font-bold md:text-4xl"}>
                {children}
            </h1>
        </header>
    )
}