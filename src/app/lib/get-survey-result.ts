'use server'

export async function getSurveyResult(answer: Array<any>) {
    console.log(answer)
    const res = await fetch('http://localhost:8000/survey', {
        method: 'POST',
        cache: 'no-store',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(answer)
    })

    if (res.status === 204) {
        return null
    }

    if (res.status === 200) {
        return res.json()
    }
}