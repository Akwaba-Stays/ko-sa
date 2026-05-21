import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Overview',
  robots: { index: false, follow: false },
};

async function getStats() {
  try {
    const [bookings, enquiries, subscribers, sessions] = await Promise.all([
      prisma.booking.count(),
      prisma.contactEnquiry.count(),
      prisma.newsletterSubscriber.count(),
      prisma.chatSession.count(),
    ]);
    return { bookings, enquiries, subscribers, sessions };
  } catch {
    return { bookings: 0, enquiries: 0, subscribers: 0, sessions: 0 };
  }
}

export default async function AdminHome() {
  const stats = await getStats();
  const tiles = [
    { label: 'Bookings', value: stats.bookings, href: '/admin/bookings' },
    { label: 'Enquiries', value: stats.enquiries, href: '/admin/enquiries' },
    { label: 'Subscribers', value: stats.subscribers, href: '/admin/newsletter' },
    { label: 'Chat sessions', value: stats.sessions, href: '/admin/chat' },
  ];

  return (
    <section className="pt-12 pb-20 min-h-[calc(100vh-4rem)] bg-bg-orange">
      <div className="container-page">
        <p className="font-poppins text-xs uppercase tracking-tracked text-brown">Overview</p>
        <h1 className="mt-2 font-belleza text-display-md text-umber">A quiet console.</h1>
        <p className="mt-3 text-umber/70 max-w-xl">
          Manage stays, conversations, and content. The shore is quiet the dashboard should
          be too.
        </p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {tiles.map((t) => (
            <Link
              key={t.label}
              href={t.href}
              className="block bg-cream rounded-md p-6 shadow-sm hover:shadow-xl transition-shadow"
            >
              <p className="text-xs font-poppins uppercase tracking-tracked text-primary">{t.label}</p>
              <p className="mt-2 font-belleza text-4xl text-umber">{t.value}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-cream rounded-md p-8 shadow-sm">
          <h2 className="font-belleza text-2xl text-umber">Integrations</h2>
          <ul className="mt-5 space-y-2 text-sm text-umber/75">
            <li>Cloudbeds PMS: {process.env.CLOUDBEDS_PROPERTY_ID ? '✓ Configured' : 'not yet'}</li>
            <li>OpenRouter AI: {process.env.OPENROUTER_API_KEY ? '✓ Connected' : 'using static fallback'}</li>
            <li>Supabase: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Connected' : 'not yet'}</li>
            <li>Resend mail: {process.env.RESEND_API_KEY ? '✓ Connected' : 'not yet'}</li>
            <li>Google Drive virtual tour: {process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT ? '✓ Connected' : 'using fallback scenes'}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
