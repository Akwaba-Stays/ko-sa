'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/bookings', label: 'Bookings' },
  { href: '/admin/enquiries', label: 'Enquiries' },
  { href: '/admin/newsletter', label: 'Newsletter' },
  { href: '/admin/chat', label: 'Chat' },
];

export function AdminNav({
  user,
}: {
  user: { email: string; name?: string | null; role: string };
}) {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-6">
      <ul className="hidden md:flex items-center gap-5 text-xs font-poppins uppercase tracking-tracked-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={cn(
                'transition-colors',
                pathname === l.href ? 'text-primary' : 'text-umber/70 hover:text-umber',
              )}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-3 text-xs">
        <span className="text-umber/60 hidden sm:inline">
          {user.name || user.email} · <em className="text-primary not-italic">{user.role}</em>
        </span>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="font-poppins uppercase tracking-tracked-sm text-umber hover:text-primary transition-colors border-b border-umber/20 hover:border-primary pb-0.5"
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}
