import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

export const metadata: Metadata = { title: 'Chat · Admin', robots: { index: false } };
export const dynamic = 'force-dynamic';

function statusBadge(status: string) {
  const map: Record<string, string> = {
    ACTIVE: 'bg-amber-100 text-amber-900',
    NEEDS_ADMIN: 'bg-red-100 text-red-900',
    ADMIN_REPLIED: 'bg-blue-100 text-blue-900',
    RESOLVED: 'bg-green-100 text-green-900',
  };
  return (
    <span
      className={cn(
        'inline-block px-2 py-1 rounded-full text-[10px] font-poppins uppercase tracking-tracked-sm',
        map[status] ?? 'bg-warm-grey/20 text-umber/70',
      )}
    >
      {status.replace('_', ' ')}
    </span>
  );
}

export default async function Page() {
  const sessions = await prisma.chatSession.findMany({
    orderBy: { lastMessageAt: 'desc' },
    take: 200,
    include: {
      _count: { select: { messages: true } },
    },
  });

  return (
    <section className="px-4 md:px-10 py-10">
      <PageHeader
        eyebrow="Operations"
        title="Chat sessions"
        description="Conversations with Abena, the digital concierge."
      />
      <DataTable
        rows={sessions}
        rowKey={(s) => s.id}
        emptyMessage="No chat sessions yet."
        columns={[
          {
            header: 'Guest',
            cell: (s) => (
              <div>
                <p className="font-medium">{s.guestName || 'Anonymous'}</p>
                {s.guestEmail && <p className="text-xs text-umber/60">{s.guestEmail}</p>}
              </div>
            ),
          },
          {
            header: 'Status',
            cell: (s) => statusBadge(s.status),
            className: 'hidden md:table-cell',
          },
          {
            header: 'Messages',
            cell: (s) => s._count.messages,
            className: 'hidden md:table-cell',
          },
          {
            header: 'Sentiment',
            cell: (s) => s.sentiment.toLowerCase(),
            className: 'hidden lg:table-cell',
          },
          {
            header: 'Last message',
            cell: (s) => formatDate(s.lastMessageAt),
            className: 'hidden lg:table-cell',
          },
        ]}
      />
    </section>
  );
}
