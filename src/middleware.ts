import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/', '/sign-in', '/sign-up', '/sign-in/(.*)', '/sign-up/(.*)']);

// Middleware to protect routes
export default clerkMiddleware(async (auth, req) => {
    const authData = await auth(); // Await the authentication data

    if (!authData.userId && !isPublicRoute(req)) {
        return authData.redirectToSignIn(); // Redirect unauthenticated users
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};