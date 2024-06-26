import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {getUserInfo} from "@/app/lib/userinfo";

export async function middleware(request: NextRequest) {

    const userInfo = await getUserInfo()

    if (userInfo !== null &&
        userInfo !== -1) {
        //이메일 인증이 안된 유저는 리다이렉트
        if (!userInfo.emailVerified &&
            !request.nextUrl.pathname.startsWith('/email-verification') &&
            !request.nextUrl.pathname.startsWith('/account/'))
        {
            return NextResponse.redirect(new URL('/email-verification', request.url))
        }
    }

    if (request.nextUrl.pathname.startsWith('/account')) {
        if (userInfo === null)
            return NextResponse.redirect(new URL('/login', request.url))
        else if (userInfo === -1)
            return NextResponse.redirect(new URL('/', request.url))
    }


    //이메일 인증이 이미 된 유저와 비로그인 유저는 메인 페이지로
    if (((userInfo === null) || (userInfo !== -1 && userInfo.emailVerified))
        && request.nextUrl.pathname.startsWith('/email-verification')) {
        return NextResponse.redirect(new URL('/', request.url))
    }

}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - static (other static files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|static).*)',
    ],
}