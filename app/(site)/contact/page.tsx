import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { ContactForm } from '@/components/shared/ContactForm';
import { site } from '@/lib/site';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { getT } from '@/lib/i18n/server';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reach the KO-SA Beach Resort concierge enquiries, reservations, group bookings, weddings.',
};

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const { t } = getT();
  const wa = `${site.socials.whatsapp}?text=${encodeURIComponent(site.contact.whatsappMessage)}`;
  return (
    <>
      <PageHero
        eyebrow={t('contactPage.eyebrow')}
        title={t('contactPage.title')}
        image="https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&q=80&w=2000"
        height="sm"
      />
      <section className="py-20 bg-sand-light">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-playfair text-display-sm text-teal">{t('contactPage.whereToFind')}</h2>
            <ul className="space-y-4 text-forest/85">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-coral mt-1" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-coral mt-1" />
                <a href={`tel:${site.contact.phone}`} className="hover:text-coral">{site.contact.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-coral mt-1" />
                <a href={`mailto:${site.contact.email}`} className="hover:text-coral">{site.contact.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle size={18} className="text-coral mt-1" />
                <a href={wa} target="_blank" rel="noreferrer" className="hover:text-coral">
                  {t('contactPage.whatsappUs')}
                </a>
              </li>
            </ul>
            <div className="branded-img mt-6 aspect-[4/3] rounded-md overflow-hidden">
              <iframe
                src={`https://www.google.com/maps?q=${site.location.lat},${site.location.lng}&z=11&output=embed`}
                title={t('contactPage.mapTitle')}
                loading="lazy"
                className="w-full h-full border-0"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
