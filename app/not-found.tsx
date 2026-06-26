import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/shared/Button';
import { getT } from '@/lib/i18n/server';

export default function NotFound() {
  const { t } = getT();
  return (
    <section className="min-h-[80vh] grid place-items-center bg-sand-light py-32 px-6 text-center">
      <div className="max-w-md mx-auto">
        <Image
          src="/logo.png"
          alt="KoSa Beach Resort"
          width={140}
          height={94}
          priority
          className="mx-auto h-20 w-auto object-contain mb-6"
        />
        <h1 className="font-playfair text-display-md text-teal">{t('notFound.headline')}</h1>
        <p className="mt-4 text-forest/70">{t('notFound.body')}</p>
        <div className="mt-8 flex gap-3 justify-center">
          <Button href="/">{t('common.returnHome')}</Button>
          <Link href="/contact" className="font-opensans uppercase tracking-tracked text-xs text-coral border-b border-coral pb-0.5 self-center">
            {t('notFound.concierge')}
          </Link>
        </div>
      </div>
    </section>
  );
}
