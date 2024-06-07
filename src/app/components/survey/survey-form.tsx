'use client'

import {useEffect, useRef, useState} from "react";
import {Alert, Button, Label, List, Radio, TextInput} from "flowbite-react";
import {useFormState, useFormStatus} from "react-dom";
import {getSurveyResult} from "@/app/lib/get-survey-result";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import {Top10WinesList} from "@/app/components/survey/top10-wines-list";
import {Header} from "@/app/components/main-layout/header";

type state = {
    msg: string | undefined
}

const initialState: state = {
    msg: ''
}

export function SurveyForm() {
    const [question, setQuestion] = useState(1)
    const answer = useRef<Array<any>>([])
    const inputBodyRef = useRef<HTMLInputElement>(null);
    const answerCompleted = useRef<boolean>(false)
    const { pending } = useFormStatus()
    const pathname = usePathname()
    const router = useRouter()

    //결과
    interface Result {
        resultId: number,
        result: {
            id: number,
            name: string,
            ratingCount: number,
            ratingAverage: number,
            typeId: number,
            sweetness: number,
            alcohol: number,
            tannin: number,
            body: number,
            acidity: number,
            countryCode: string
        }[]
    }
    const result = useRef<Result|null>(null)


     function firstQuestionSubmit(prevState: any, formData: FormData) {
        const wineType = Number(formData.get("wine-type"))

        // input html 단에서 1차적으로 필터링을 하기 때문에 여기서 예외가 나는 경우에는 극히 예외적인 거라 잘못된 요청으로 간주
        if (isNaN(wineType)) {
            return {
                msg: '잘못된 요청입니다',
            }
        }

        answer.current[0] = wineType
        console.log(answer.current)
        setQuestion(question + 1)

        return {
            msg: undefined
        }
    }

    async function secondQuestionSubmit(prevState: any, formData: FormData) {
        const body = Number(formData.get("body"))
        const alcohol = Number(formData.get("alcohol"))
        const acidity = Number(formData.get("acidity"))
        const sweetness = Number(formData.get("sweetness"))
        const tannin = Number(formData.get("tannin"))

        //input html 단에서 1차적으로 필터링을 하기 때문에 여기서 예외가 나는 경우에는 극히 예외적인 거라 잘못된 요청으로 간주
        if (isNaN(body) ||
            isNaN(alcohol) ||
            isNaN(acidity) ||
            isNaN(sweetness) ||
            isNaN(tannin) ||
            body < 1 ||
            body > 5 ||
            alcohol < 0 ||
            alcohol > 100 ||
            acidity < 0 ||
            acidity > 5 ||
            sweetness < 0 ||
            sweetness > 5 ||
            tannin < 0 ||
            tannin > 5
        ) {
            return {
                msg: '잘못된 요청입니다',
            }
        }

        answer.current[1] = {
            body: body,
            alcohol: alcohol,
            acidity: acidity,
            sweetness: sweetness,
            tannin: tannin
        }

        result.current = await getSurveyResult(answer.current)
        setQuestion(question + 1)

        return {
            msg: undefined
        }
    }

    //폼 상태
    const [firstQuestionState, firstFormAction] = useFormState(firstQuestionSubmit, initialState) //1번 문
    const [secondQuestionState, secondFromAction] = useFormState(secondQuestionSubmit, initialState) //2번 문제


    useEffect(() => {
        if (question === 2) {
            inputBodyRef.current?.focus()
        } else if (question >= 3) {
            if (result.current !== null)
                history.pushState({page: 'result'}, 'Result', '/result/' + result.current?.resultId);
            answerCompleted.current = true
        }
    },[question])

    useEffect(() => {
        if (pathname.startsWith("/survey") && answerCompleted.current) {
            answerCompleted.current = false;
            setQuestion(1);
        }
    }, [pathname]);

    function WineSurveyHeader() {
        return <Header>와인 취향 설문</Header>
    }

    if (pathname.startsWith("/result") && !answerCompleted.current) {
        router.refresh()
        return null
    } else if (question === 1) {
        return (
            <form className={"flex flex-col gap-4 mb-4"} action={firstFormAction}>
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
            <form className={"flex flex-col gap-4"} action={secondFromAction}>
                <WineSurveyHeader/>
                {secondQuestionState?.msg && <Alert color="failure">{secondQuestionState?.msg}</Alert>}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="body" value="바디감"/>
                    </div>
                    <TextInput id="body" name="body" type="number" placeholder="1-5" color={"rose"} step="any" min={1} max={5}
                               required ref={inputBodyRef} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="alcohol" value="알코올 도수"/>
                    </div>
                    <div className={"flex items-center gap-2"}>
                        <TextInput className="grow" id="alcohol" name="alcohol" type="number" step="any" min={0} max={100}
                                   placeholder="백분율로 입력"
                                   color={"rose"}
                                   required />
                        <div className={""}>%</div>
                    </div>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="acidity" value="산도"/>
                    </div>
                    <TextInput id="acidity" name="acidity" type="number" placeholder="1-5" color={"rose"} min={1}
                               max={5} step="any" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="sweetness" value="당도"/>
                    </div>
                    <TextInput id="sweetness" name="sweetness" type="number" placeholder="1-5"  color={"rose"} min={1}
                               max={5} step="any" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="tannin" value="떫은 정도"/>
                    </div>
                    <TextInput id="tannin" name="tannin" type="number" placeholder="1-5" color={"rose"} min={1}
                               max={5} step="any" required />
                </div>
                <div className={"ml-auto flex gap-2"}>
                    <Button color={"gray"} onClick={() => setQuestion(1)}>
                        <span className={"md:text-base"}>이전</span>
                    </Button>
                    <Button color={"rose"} type={"submit"} disabled={pending}>
                        <span className={"md:text-base"}>제출</span>
                    </Button>
                </div>
            </form>
        )
    } else if (question === 3) {
        if (result.current === null) {
            return null
        } else if (result.current === undefined) {
            throw new Error("Oops!")
        } else {
            return (
                <div className={"flex flex-col gap-4"}>
                    <Header>당신한테 맞는 와인을 찾았아요!</Header>
                    <p className={"text-right text-sm"}>
                        결과 ID:{" "}
                        <Link href={"/result/" + result.current.resultId}
                              className={"hover:underline"}>
                            {result.current.resultId}
                        </Link>
                    </p>
                    <p>당신한테 맞는 {result.current.result.length}개의 와인을 보여드릴께요</p>
                    <List unstyled className="divide-y divide-gray-200 dark:divide-gray-700 text-black">
                        <Top10WinesList top10Wines={result.current.result} />
                    </List>
                </div>
            )
        }
    } else {
        return null
    }
}