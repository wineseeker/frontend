import type {Metadata} from "next";
import {SurveyForm} from "@/app/components/main-layout/survey/survey-form";

export const metadata: Metadata = {
    title: "설문 조사",
    description: "설문을 통해 와인을 추천받을 수 있습니다",
};


export default function Page() {
    return (
        <div className={"mx-3 mt-4 md:container lg:max-w-screen-lg md:mx-auto"}>
            <SurveyForm />
        </div>
    )
}
