"use client";

import { OPEN_PRIVACY_SETTINGS_EVENT } from "@/config/privacyConsent";

export const PrivacySettingsButton = () => (
  <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_PRIVACY_SETTINGS_EVENT))} className="min-h-8 text-white/80 underline underline-offset-4 hover:text-white-custom focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
    Preferências de cookies
  </button>
);
