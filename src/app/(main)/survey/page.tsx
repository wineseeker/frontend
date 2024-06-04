import type {Metadata} from "next";
import {SurveyForm} from "@/app/components/survey/survey-form";

export const metadata: Metadata = {
    title: "설문 조사",
    description: "설문을 통해 와인을 추천받을 수 있습니다",
};


export default function Page() {
    return (
        <div className={"mx-3 lg:max-w-screen-lg lg:mx-4 min-[1050px]:mx-auto"}>
            <SurveyForm />
        </div>
    )
}
