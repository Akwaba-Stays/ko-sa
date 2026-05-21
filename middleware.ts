import { withAuth } from 'next-auth/middleware';

// Protect /admin/* but explicitly allow /admin/login (the sign-in page itself)
export default withAuth({
  pages: { signIn: '/admin/login' },
});

export const config = {
  // Protect /admin and /admin/* — but explicitly skip /admin/login (the sign-in page)
  matcher: ['/admin', '/admin/((?!login$).*)'],
};
