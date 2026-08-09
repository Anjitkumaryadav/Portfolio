import { profile } from "../data/site";

/**
 * Open a pre-filled message addressed to me. Uses Gmail's web compose (opens in
 * a new tab) so it works without any desktop mail app installed, and also copies
 * my address to the clipboard as a fallback if pop-ups are blocked.
 * Returns the email address that was used.
 */
export function openMail({ subject = "", body = "" } = {}) {
  const to = profile.email;

  // Best-effort clipboard copy — ignored if unavailable / denied.
  try {
    navigator.clipboard?.writeText(to);
  } catch {
    /* no-op */
  }

  const url =
    "https://mail.google.com/mail/?view=cm&fs=1" +
    `&to=${encodeURIComponent(to)}` +
    `&su=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  window.open(url, "_blank", "noopener,noreferrer");

  return to;
}
