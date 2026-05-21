import { AdinkraIcon } from '@/components/shared/AdinkraIcon';

export default function Loading() {
  return (
    <div className="min-h-[60vh] grid place-items-center bg-bg-orange">
      <AdinkraIcon name="palm" size={56} className="text-primary animate-pulse" />
    </div>
  );
}
