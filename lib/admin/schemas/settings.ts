// Settings are key-scoped. Each key has its own schema so the admin UI can
// render a tailored form. Unknown keys reject; this protects the DB from
// drift and makes it trivial to add a new section.

import { z } from 'zod';
import { urlOrEmpty } from './common';

// ─── Hero (homepage / page heroes) ───────────────────────────────────────

export const heroSettingsSchema = z.object({
  headline: z.string().trim().max(200).optional(),
  tagline: z.string().trim().max(200).optional(),
  location: z.string().trim().max(160).optional(),
  videoUrl: urlOrEmpty,
  posterUrl: urlOrEmpty,
  ctaPrimaryLabel: z.string().trim().max(80).optional(),
  ctaPrimaryHref: z.string().trim().max(280).optional(),
  ctaSecondaryLabel: z.string().trim().max(80).optional(),
  ctaSecondaryHref: z.string().trim().max(280).optional(),
});

// ─── Contact / footer ────────────────────────────────────────────────────

export const contactSettingsSchema = z.object({
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().trim().max(60).optional(),
  whatsapp: z.string().trim().max(60).optional(),
  address: z.string().trim().max(280).optional(),
  instagram: urlOrEmpty,
  facebook: urlOrEmpty,
  tripadvisor: urlOrEmpty,
  youtube: urlOrEmpty,
});

// ─── SEO / branding ──────────────────────────────────────────────────────

export const seoSettingsSchema = z.object({
  siteTitle: z.string().trim().max(160).optional(),
  siteDescription: z.string().trim().max(400).optional(),
  ogImage: urlOrEmpty,
  twitterHandle: z.string().trim().max(60).optional(),
});

// ─── Integrations ────────────────────────────────────────────────────────

export const integrationsSettingsSchema = z.object({
  cloudbedsPropertyId: z.string().trim().max(120).optional(),
  resendFromEmail: z.string().email().optional().or(z.literal('')),
  googleAnalyticsId: z.string().trim().max(60).optional(),
  googleTagManagerId: z.string().trim().max(60).optional(),
  // toggles (never store secrets in DB secrets remain in env)
  bookingEnabled: z.boolean().optional(),
  chatEnabled: z.boolean().optional(),
  newsletterEnabled: z.boolean().optional(),
});

// ─── Maintenance ─────────────────────────────────────────────────────────

export const maintenanceSettingsSchema = z.object({
  enabled: z.boolean().default(false),
  message: z.string().trim().max(500).optional(),
});

export const settingsKeySchemas = {
  hero: heroSettingsSchema,
  contact: contactSettingsSchema,
  seo: seoSettingsSchema,
  integrations: integrationsSettingsSchema,
  maintenance: maintenanceSettingsSchema,
} as const;

export type SettingsKey = keyof typeof settingsKeySchemas;

export function isSettingsKey(k: string): k is SettingsKey {
  return Object.prototype.hasOwnProperty.call(settingsKeySchemas, k);
}

export type SettingsByKey = {
  [K in SettingsKey]: z.infer<(typeof settingsKeySchemas)[K]>;
};
