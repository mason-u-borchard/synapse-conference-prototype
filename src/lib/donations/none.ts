import type { DonationProvider } from "./types";

// 'none' provider lets the committee ship a version of the site where
// donation flow is explicitly paused while they finalize the backend.
export const noneProvider: DonationProvider = {
  name: "none",
  label: "Donations paused",
  blurb:
    "Donations are paused while the committee finalizes both a fiscal sponsor and a donation partner. Reach the committee for ways to support in the meantime.",
  embedOnly: false,
};
