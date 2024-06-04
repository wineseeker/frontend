'use client'

import {useEffect, useRef, useState} from "react";
import {Alert, Button, Label, Radio, TextInput} from "flowbite-react";
import {useFormState, useFormStatus} from "react-dom";

type state = {
    msg: null | string
}

const initialState: state = {
    msg: ''
}


function WineSurveyHeader() {
    return <h1 className={"text-4xl font-bold"}>와인 취향 설문</h1>
}

export function SurveyForm() {
    const [question, setQuestion] = useState(1)
    const answer = useRef<Array<any>>([])
    const { pending } = useFormStatus()


     function firstQuestionSubmit(prevState: any, formData: FormData) {
        const wineType = Number(formData.get("wine-type"))

        if (isNaN(wineType)) {
            return {
                msg: '비정상적인 요청입니다',
            }
        }

        answer.current[0] = wineType
        console.log(answer.current)
        return setQuestion(question + 1)
    }

    //폼 상태
    // @ts-ignore
    const [firstQuestionState, formAction] = useFormState(firstQuestionSubmit, initialState) //1번 문제

    useEffect(() => {
        if (question === 2) {

        } else if (question === 3) {
            window.location
        }
    },[question])

    if (question === 1) {
        return (
            <form className={"flex flex-col gap-4 mb-4"} action={formAction}>
                <WineSurveyHeader />
                {firstQuestionState?.msg && <Alert color="failure">{firstQuestionState?.msg}</Alert>}
                <fieldset className="flex max-w-md flex-col gap-4">
                    <legend className="mb-4">와인의 종류를 선택해 주세요</legend>
                    <div className="flex items-center gap-2">
                        <Radio id="red-wine" name="wine-type" value="1" className={"text-rose-600 focus:ring-rose-600"}
                               defaultChecked required/>
                        <Label htmlFor="red-wine">레드 와인</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Radio id="white-wine" name="wine-type" value="2"
                               className={"text-rose-600 focus:ring-rose-600"} required/>
                        <Label htmlFor="white-wine">화이트 와인</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Radio id="sparkling-wine" name="wine-type" value="3"
                               className={"text-rose-600 focus:ring-rose-600"} required/>
                        <Label htmlFor="sparkling-wine">스파클링 와인</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Radio id="rose-wine" name="wine-type" value="4" className={"text-rose-600 focus:ring-rose-600"}
                               required/>
                        <Label htmlFor="rose-wine">로제 와인</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Radio id="dessert-wine" name="wine-type" value="5" className={"text-rose-600 focus:ring-rose-600"}
                               required/>
                        <Label htmlFor="dessert-wine">디저트 와인</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Radio id="port-wine" name="wine-type" value="6" className={"text-rose-600 focus:ring-rose-600"}
                               required/>
                        <Label htmlFor="prot-wine">포트 와인</Label>
                    </div>
                </fieldset>
                <Button color={"rose"} className={"ml-auto"} type={"submit"} disabled={pending}>
                    <span className={"md:text-base"}>다음</span>
                </Button>
            </form>
        )
    } else if (question === 2) {
        return (
            <form className={"flex flex-col gap-4"}>
                <WineSurveyHeader/>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="body" value="바디"/>
                    </div>
                    <TextInput id="body" name="body" type="number" placeholder="1-5" color={"rose"}/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="alcohol" value="알코올 함류랑"/>
                    </div>
                    <div className={"flex items-center gap-2"}>
                        <TextInput className="grow" id="alcohol" name="alcohol" type="number" placeholder=""
                                   color={"rose"}/>
                        <div className={""}>%</div>
                    </div>
                </div>
                <div className={"ml-auto flex gap-2"}>
                    <Button color={"gray"} onClick={() => setQuestion(1)}>
                        <span className={"md:text-base"}>이전</span>
                    </Button>
                    <Button color={"rose"} type={"submit"} disabled={pending}>
                        <span className={"md:text-base"}>다음</span>
                    </Button>
                </div>
            </form>
        )
    } else {
        return null
    }
}