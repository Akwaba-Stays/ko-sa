import type { Metadata } from 'next';
import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import Link from 'next/link';
import { PageHero } from '@/components/shared/PageHero';
import { getT } from '@/lib/i18n/server';
import { listPublicExperiences } from '@/lib/cms/experiences';
import { AdinkraIcon, type AdinkraName } from '@/components/shared/AdinkraIcon';
import { EXPERIENCE_DETAILS, formatGhs, waPrefill } from '@/lib/pricing';
import { BookButton } from '@/components/shared/BookButton';
import { listPublicDailyActivities, groupByDay, DAY_ORDER } from '@/lib/cms/daily-activities';

export const metadata: Metadata = {
  title: 'Experiences & Activities',
  description:
    'Ghana begins here · On-property calm and guided journeys into Cape Coast, Elmina, Kakum and the fishing villages from KO-SA Beach Resort',
};

export const dynamic = 'force-dynamic';

const DAY_LABEL: Record<string, string> = {
  MONDAY: 'Monday', TUESDAY: 'Tuesday', WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday', FRIDAY: 'Friday', SATURDAY: 'Saturday', SUNDAY: 'Sunday',
};

export default async function ExperiencesPage() {
  const { t } = getT();
  const [experiences, allActivities] = await Promise.all([
    listPublicExperiences(),
    listPublicDailyActivities().catch(() => []),
  ]);
  const activitiesByDay = groupByDay(allActivities);

  return (
    <>
      <PageHero
        eyebrow={t('nav.experiences')}
        title={t('experiencesPage.headline')}
        image="https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/resort/0-772A4907.webp"
      />

      <section className="py-16 md:py-24 bg-sand-light">
        <div className="container-page max-w-3xl">
          <p className="font-raleway text-lg md:text-xl text-forest/85 leading-relaxed">
            {t('experiencesPage.intro')}
          </p>
        </div>
      </section>

      <section className="pb-12 bg-sand-light">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <article className="relative rounded-md overflow-hidden min-h-[320px] flex items-end branded-img">
            <Image
              src="https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/resort/11-772A4926.webp"
              alt={t('experiencesPage.property.title')}
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 to-transparent" />
            <div className="relative p-8 text-cream">
              <h2 className="font-playfair text-2xl md:text-3xl">{t('experiencesPage.property.title')}</h2>
              <p className="mt-3 font-raleway text-cream/85 leading-relaxed">{t('experiencesPage.property.body')}</p>
            </div>
          </article>
          <article className="relative rounded-md overflow-hidden min-h-[320px] flex items-end branded-img">
            <Image
              src="https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/resort/12-772A4928.webp"
              alt={t('experiencesPage.ghana.title')}
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 to-transparent" />
            <div className="relative p-8 text-cream">
              <h2 className="font-playfair text-2xl md:text-3xl">{t('experiencesPage.ghana.title')}</h2>
              <p className="mt-3 font-raleway text-cream/85 leading-relaxed">{t('experiencesPage.ghana.body')}</p>
            </div>
          </article>
        </div>
      </section>

      {experiences.length > 0 && (
        <section className="pb-20 md:pb-28 bg-sand-light">
          <div className="container-page space-y-16">
            {experiences.map((e, i) => (
              <article
                key={e.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
                }`}
              >
                <div className="lg:col-span-7 relative aspect-[16/10] rounded-md overflow-hidden branded-img">
                  {e.image && (
                    <Image src={e.image} alt={e.title} fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" />
                  )}
                </div>
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-3 text-coral">
                    {e.adinkra && <AdinkraIcon name={e.adinkra as AdinkraName} size={26} />}
                    <span className="font-opensans uppercase tracking-tracked text-xs">{e.label}</span>
                  </div>
                  <h3 className="mt-4 font-playfair text-display-sm text-teal">{e.title}</h3>
                  <p className="mt-4 font-raleway text-forest/80 leading-relaxed">{e.description}</p>
                  <Link
                    href={`/experiences/${e.slug}`}
                    className="mt-6 inline-block font-opensans text-xs uppercase tracking-tracked text-coral border-b border-coral/60 pb-0.5 hover:text-teal hover:border-teal"
                  >
                    {t('experiences.discover')} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Signature experiences real activities at Ko-Sa */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral mb-3">
              {t('experiencesPage.signature.eyebrow')}
            </p>
            <h2 className="font-playfair text-display-sm text-teal">
              {t('experiencesPage.signature.headline')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(
              [
                { key: 'ampenyi', t: 'experiencesPage.signature.ampenyi.title', b: 'experiencesPage.signature.ampenyi.body' },
                { key: 'capeCoast', t: 'experiencesPage.signature.capeCoast.title', b: 'experiencesPage.signature.capeCoast.body' },
                { key: 'elmina', t: 'experiencesPage.signature.elmina.title', b: 'experiencesPage.signature.elmina.body' },
                { key: 'kakum', t: 'experiencesPage.signature.kakum.title', b: 'experiencesPage.signature.kakum.body' },
                { key: 'horse', t: 'experiencesPage.signature.horse.title', b: 'experiencesPage.signature.horse.body' },
              ] as const
            ).map((item) => {
              const detail = EXPERIENCE_DETAILS[item.key];
              const name = t(item.t);
              return (
                <article key={item.t} className="bg-sand-light rounded-md p-6 shadow-sm flex flex-col">
                  <h3 className="font-playfair text-xl text-teal">{name}</h3>
                  {/* Duration · price (Change Request §Page 05) */}
                  <p className="mt-2 font-opensans uppercase tracking-tracked text-[10px] text-forest/55">
                    {detail.duration} · From {formatGhs(detail.fromGhs)} {t('experiencesPage.perPerson')}
                  </p>
                  <p className="mt-3 font-raleway text-sm text-forest/80 leading-relaxed">{t(item.b)}</p>
                  <BookButton
                    category="EXPERIENCE"
                    itemName={name}
                    message={waPrefill.experience(name)}
                    source="experiences"
                    className="mt-5 inline-flex items-center gap-2 font-opensans uppercase tracking-tracked text-xs text-coral hover:text-coral-700"
                  >
                    {t('experiencesPage.tile.book')} →
                  </BookButton>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free Daily Activities */}
      {allActivities.length > 0 && (
        <section className="py-16 md:py-24 bg-sand-light">
          <div className="container-page">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral mb-3">{t('experiencesPage.daily.eyebrow')}</p>
              <h2 className="font-playfair text-display-sm text-teal">{t('experiencesPage.daily.heading')}</h2>
              <p className="mt-4 font-raleway text-forest/75 leading-relaxed">
                {t('experiencesPage.daily.intro')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {DAY_ORDER.map((day) => {
                const acts = activitiesByDay.get(day) ?? [];
                if (acts.length === 0) return null;
                return (
                  <div key={day} className="bg-cream rounded-xl overflow-hidden shadow-sm border border-sand-300/40">
                    <div className="bg-teal-700 text-cream px-5 py-3">
                      <p className="font-playfair text-lg">{DAY_LABEL[day]}</p>
                      <p className="font-opensans text-[10px] uppercase tracking-tracked text-cream/60">Ko-Sa Beach Resort</p>
                    </div>
                    <div className="divide-y divide-sand-300/40">
                      {acts.map((a) => (
                        <div key={a.id} className="px-5 py-4">
                          <p className="font-opensans text-[10px] uppercase tracking-tracked text-coral font-semibold">{a.time}</p>
                          <h3 className="mt-1 font-playfair text-base text-teal leading-tight">{a.title}</h3>
                          <p className="mt-1.5 font-raleway text-xs text-forest/75 leading-relaxed">{a.description}</p>
                          {a.tag && (
                            <p className="mt-2 font-opensans text-[10px] text-coral italic">{a.tag}</p>
                          )}
                          {a.isFree && (
                            <span className="mt-2 inline-block text-[10px] font-opensans uppercase tracking-tracked bg-teal/10 text-teal px-2 py-0.5 rounded-full">{t('experiencesPage.daily.free')}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-8 text-center font-opensans text-xs text-forest/50">
              {t('experiencesPage.daily.footnote')}
            </p>
          </div>
        </section>
      )}

      {/* Build Your Perfect Day (Change Request §Page 05) */}
      <section className="bg-teal-700 text-cream py-16 text-center">
        <div className="container-page max-w-2xl">
          <p className="font-raleway text-lg text-cream/90 leading-relaxed">
            {t('experiencesPage.buildDay')}
          </p>
          <BookButton
            category="EXPERIENCE"
            itemName="Build Your Perfect Day"
            message={waPrefill.planMyStay()}
            source="experiences/build-day"
            className="mt-6 inline-block rounded-full bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-xs px-6 py-3 hover:bg-coral-600 transition-colors"
          >
            {t('experiencesPage.buildDay.cta')} →
          </BookButton>
        </div>
      </section>
    </>
  );
}
