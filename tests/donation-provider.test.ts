import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

function reload() {
  vi.resetModules();
  return import("@/lib/donations/provider");
}

describe("donation provider selection", () => {
  const originalProvider = process.env.DONATION_PROVIDER;
  const originalEmbedUrl = process.env.DONATION_EMBED_URL;

  beforeEach(() => {
    delete process.env.DONATION_PROVIDER;
    delete process.env.DONATION_EMBED_URL;
  });

  afterEach(() => {
    process.env.DONATION_PROVIDER = originalProvider;
    process.env.DONATION_EMBED_URL = originalEmbedUrl;
  });

  it("defaults to Stripe when DONATION_PROVIDER is unset", async () => {
    const { getDonationProvider } = await reload();
    const p = getDonationProvider();
    expect(p.name).toBe("stripe");
    expect(p.embedOnly).toBe(false);
  });

  it("accepts donorbox as an embed provider", async () => {
    process.env.DONATION_PROVIDER = "donorbox";
    process.env.DONATION_EMBED_URL = "https://donorbox.org/embed/synapse";
    const { getDonationProvider } = await reload();
    const p = getDonationProvider();
    expect(p.name).toBe("donorbox");
    expect(p.embedOnly).toBe(true);
    expect(p.embedUrl).toBe("https://donorbox.org/embed/synapse");
  });

  it("accepts patreon as an embed provider", async () => {
    process.env.DONATION_PROVIDER = "patreon";
    const { getDonationProvider } = await reload();
    const p = getDonationProvider();
    expect(p.name).toBe("patreon");
    expect(p.embedOnly).toBe(true);
  });

  it("accepts paypal as an embed provider", async () => {
    process.env.DONATION_PROVIDER = "paypal";
    const { getDonationProvider } = await reload();
    const p = getDonationProvider();
    expect(p.name).toBe("paypal");
    expect(p.embedOnly).toBe(true);
  });

  it("supports a 'none' state when donations are paused", async () => {
    process.env.DONATION_PROVIDER = "none";
    const { getDonationProvider } = await reload();
    const p = getDonationProvider();
    expect(p.name).toBe("none");
    expect(p.createCheckout).toBeUndefined();
  });

  it("falls back to stripe when given an unknown provider name", async () => {
    process.env.DONATION_PROVIDER = "crypto-moon-bank";
    const { getDonationProvider } = await reload();
    expect(getDonationProvider().name).toBe("stripe");
  });
});
