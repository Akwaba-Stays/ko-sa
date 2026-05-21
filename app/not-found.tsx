import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { AdinkraIcon } from '@/components/shared/AdinkraIcon';

export default function NotFound() {
  return (
    <section className="min-h-[80vh] grid place-items-center bg-bg-orange py-32 px-6 text-center">
      <div className="max-w-md mx-auto">
        <AdinkraIcon name="palm" size={72} className="text-primary mx-auto mb-6" />
        <h1 className="font-belleza text-display-md text-umber">Lost at sea.</h1>
        <p className="mt-4 text-umber/70">
          The page you&apos;re looking for has drifted. Let&apos;s walk you home.
        </p>
        <div className="mt-8 flex gap-3 justify-center">
          <Button href="/">Return Home</Button>
          <Link href="/contact" className="font-poppins uppercase tracking-tracked text-xs text-primary border-b border-primary pb-0.5 self-center">
            Speak to concierge
          </Link>
        </div>
      </div>
    </section>
  );
}
