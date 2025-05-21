import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  { path: "/login", whenAuthenticated: "redirect" },
  { path: "/register", whenAuthenticated: "redirect" },
] as const;

const REDIRECT_WHEN_AUTHETICATED_ROUTE = "/login";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicRoute = publicRoutes.find((route) => route.path === pathname);
  const authToken = request.cookies.get("token");

  if (publicRoute && !authToken) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = REDIRECT_WHEN_AUTHETICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = "/";

    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !publicRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};