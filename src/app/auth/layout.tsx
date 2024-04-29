export default function Layout ({children}: {children: React.ReactNode}) {
    return (
        <div className={"h-screen flex flex-col justify-space-between md:justify-center"}>
            {children}
        </div>
    )
}