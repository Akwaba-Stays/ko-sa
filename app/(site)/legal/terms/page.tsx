import type { Metadata } from 'next';
import { Section, Eyebrow, Heading, GoldDivider } from '@/components/shared/Section';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms governing your use of the Ko Sa Beach Resort website and services',
  alternates: { canonical: '/legal/terms' },
};

export default function TermsPage() {
  const updated = 'May 2026';
  return (
    <main className="bg-bg-orange pt-32 md:pt-40">
      <Section className="bg-bg-orange">
        <div className="max-w-3xl">
          <Eyebrow>Legal · Last updated {updated}</Eyebrow>
          <Heading className="mt-5">Terms of Service</Heading>
          <GoldDivider />

          <article className="prose prose-umber max-w-none font-raleway text-umber/85 space-y-6 leading-relaxed">
            <p>
              These terms govern your use of <strong>ko-sa.com</strong> and any reservation made
              through it. By booking with us, you agree to them.
            </p>

            <h2 className="font-belleza text-2xl text-umber mt-10">1. Reservations & rates</h2>
            <p>
              Rates are quoted in USD or GHS as displayed and include applicable taxes and
              service charges. A valid credit card is required to confirm a reservation; we do
              not charge until check-in unless a non-refundable rate is selected.
            </p>

            <h2 className="font-belleza text-2xl text-umber mt-10">2. Cancellation policy</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Flexible rate:</strong> free cancellation up to 7 days before arrival.
                Cancel within 7 days and the first night is charged.
              </li>
              <li>
                <strong>Non-refundable rate:</strong> charged in full at booking; no refunds.
              </li>
              <li>
                <strong>No-show:</strong> the reservation is forfeited and the full stay charged.
              </li>
            </ul>

            <h2 className="font-belleza text-2xl text-umber mt-10">3. Check-in & check-out</h2>
            <p>
              Check-in 14:00, check-out 11:00. Early check-in / late check-out may be granted
              subject to availability. Government-issued photo ID is required at check-in for
              all guests over 18.
            </p>

            <h2 className="font-belleza text-2xl text-umber mt-10">4. Conduct</h2>
            <p>
              Ko Sa is a sanctuary. We ask all guests to keep noise minimal after 22:00, respect
              staff and other guests, and treat the property and its surrounds with care. We
              reserve the right to decline service to any guest whose behaviour disrupts the
              wellbeing of others.
            </p>

            <h2 className="font-belleza text-2xl text-umber mt-10">5. Damages</h2>
            <p>
              Guests are responsible for damage to the property caused by themselves or members
              of their party, beyond reasonable wear.
            </p>

            <h2 className="font-belleza text-2xl text-umber mt-10">6. Liability</h2>
            <p>
              To the extent permitted by law, Ko Sa is not liable for indirect or consequential
              loss, loss of personal property, or interruption of services caused by force
              majeure (severe weather, public unrest, utility outage, etc.). Our maximum liability
              is the total amount paid for your reservation.
            </p>

            <h2 className="font-belleza text-2xl text-umber mt-10">7. Website use</h2>
            <p>
              Content on ko-sa.com is owned by Ko Sa Beach Resort or licensed for our use.
              Personal viewing is welcome; reproduction or commercial use requires written
              permission. Trademarks &ldquo;Ko Sa&rdquo;, &ldquo;Ko Sa Palms&rdquo;, and{' '}
              <em>&ldquo;Simply, Belong&rdquo;</em> are property of Ko Sa Beach Resort.
            </p>

            <h2 className="font-belleza text-2xl text-umber mt-10">8. Governing law</h2>
            <p>
              These terms are governed by the laws of the Republic of Ghana. Any dispute is
              subject to the exclusive jurisdiction of the courts of Accra.
            </p>

            <h2 className="font-belleza text-2xl text-umber mt-10">9. Contact</h2>
            <p>
              Ko Sa Beach Resort · Beach Road No.1, Ampenyi, Elmina, Ghana ·{' '}
              <a className="text-primary underline" href="mailto:info@ko-sa.com">
                info@ko-sa.com
              </a>
            </p>
          </article>
        </div>
      </Section>
    </main>
  );
}
