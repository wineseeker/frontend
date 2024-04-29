export default function Layout ({children}: {children: React.ReactNode}) {
    return (
        <div className={"h-screen flex flex-col justify-center "}>
            {children}
        </div>
    )
}