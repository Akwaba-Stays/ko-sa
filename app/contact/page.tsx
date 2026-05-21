import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { ContactForm } from '@/components/shared/ContactForm';
import { site } from '@/lib/site';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reach the KO-SA Beach Resort concierge enquiries, reservations, group bookings, weddings.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Speak with us, simply."
        image="https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&q=80&w=2000"
        height="sm"
      />
      <section className="py-20 bg-bg-orange">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-belleza text-display-sm text-umber">Where to find us</h2>
            <ul className="space-y-4 text-umber/85">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-1" />
                <span>{site.contact.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-primary mt-1" />
                <a href={`tel:${site.contact.phone}`} className="hover:text-primary">{site.contact.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-primary mt-1" />
                <a href={`mailto:${site.contact.email}`} className="hover:text-primary">{site.contact.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle size={18} className="text-primary mt-1" />
                <a href={site.socials.whatsapp} target="_blank" rel="noreferrer" className="hover:text-primary">
                  WhatsApp us
                </a>
              </li>
            </ul>
            <div className="branded-img mt-6 aspect-[4/3] rounded-md overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=Elmina,Ghana&output=embed"
                title="KO-SA location map"
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
