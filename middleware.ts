import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const requestHeaders = new Headers(request.headers)

  const isFrenchRoute = pathname === "/fr" || pathname.startsWith("/fr/")
  if (isFrenchRoute) {
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = pathname.slice("/fr".length) || "/"
    requestHeaders.set("x-locale", "fr")
    return NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      },
    })
  }

  requestHeaders.set("x-locale", "en")
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api|favicon.ico|.*\\..*).*)"],
}

