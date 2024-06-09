import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "랭킹",
    description: "비비노 평점 랭킹을 기반으로한 랭킹입니다",
    //준비중일때는 색인 안되게 하기
    robots: {
        index: false,
    }
};


export default function Page() {
    return (
        <div className={"min-h-96 md:container md:mx-auto"}>
            <p className={"text-lg"}>준비 중 입니다.</p>
        </div>
    )
}