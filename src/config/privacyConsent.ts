export const PRIVACY_CONSENT_KEY = "enemquest-marketing-consent-v1";
export const PRIVACY_CONSENT_EVENT = "enemquest:marketing-consent";
export const OPEN_PRIVACY_SETTINGS_EVENT = "enemquest:open-privacy-settings";
export type MarketingConsent = "accepted" | "rejected";

// Marketing integrations must check this before loading or sending events.
export function getMarketingConsent(): MarketingConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(PRIVACY_CONSENT_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function hasMarketingConsent(): boolean {
  return getMarketingConsent() === "accepted";
}
