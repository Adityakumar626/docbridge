import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // If the user is already signed in and tries to access the sign-in page, 
  // gracefully redirect them to the dashboard without trapping the back button
  if (userId && req.nextUrl.pathname.startsWith("/sign-in")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect the dashboard route
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
