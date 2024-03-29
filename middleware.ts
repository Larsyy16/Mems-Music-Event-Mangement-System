import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    publicRoutes: [
        //accessible to signed in and out
        "/",
        "/events/:id",
        "/api/webhook/clerk",
        "/api/webhook/stripe"

      ],
      //accessible to signed in users and signed-out
      ignoredRoutes: [
        "/api/webhook/clerk",
        "/api/webhook/stripe"
      ],
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 