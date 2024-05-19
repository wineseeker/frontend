import PrivacyPolicy from '@/markdown/privacy-policy.mdx'

export default function Page() {
    return (
        <article className={"mx-4 md:container md:mx-auto prose"}>
            <PrivacyPolicy />
        </article>

    )
}