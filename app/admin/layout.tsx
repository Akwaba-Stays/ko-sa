import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { AdminNav } from './AdminNav';

export const metadata: Metadata = {
  title: 'Admin · KO-SA',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  // /admin/login is public render bare
  // (middleware also protects /admin/* but the matcher excludes /admin/login automatically because the login page calls signIn)
  if (!session?.user) {
    return <div className="min-h-screen bg-bg-orange">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-bg-orange">
      <header className="bg-cream border-b border-warm-grey/40">
        <div className="container-page flex items-center justify-between h-16">
          <Link
            href="/admin"
            className="font-belleza text-xl text-umber hover:text-primary transition-colors"
          >
            KO-SA · Admin
          </Link>
          <AdminNav user={session.user} />
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
