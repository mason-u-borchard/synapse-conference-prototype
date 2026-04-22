import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

function reload() {
  vi.resetModules();
  return import("@/lib/donations/provider");
}

describe("donation provider selection", () => {
  const originalProvider = process.env.DONATION_PROVIDER;
  const originalEmbedUrl = process.env.DONATION_EMBED_URL;
  const originalVformId = process.env.NEXT_PUBLIC_VIRTUOUS_FORM_ID;
  const originalOrgId = process.env.NEXT_PUBLIC_VIRTUOUS_ORG_ID;

  beforeEach(() => {
    delete process.env.DONATION_PROVIDER;
    delete process.env.DONATION_EMBED_URL;
    delete process.env.NEXT_PUBLIC_VIRTUOUS_FORM_ID;
    delete process.env.NEXT_PUBLIC_VIRTUOUS_ORG_ID;
  });

  afterEach(() => {
    process.env.DONATION_PROVIDER = originalProvider;
    process.env.DONATION_EMBED_URL = originalEmbedUrl;
    process.env.NEXT_PUBLIC_VIRTUOUS_FORM_ID = originalVformId;
    process.env.NEXT_PUBLIC_VIRTUOUS_ORG_ID = originalOrgId;
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

  it("accepts virtuous as an inline-script embed provider", async () => {
    process.env.DONATION_PROVIDER = "virtuous";
    const { getDonationProvider } = await reload();
    const p = getDonationProvider();
    expect(p.name).toBe("virtuous");
    expect(p.embedOnly).toBe(true);
    expect(p.virtuous?.vformId).toMatch(/[0-9A-F-]{36}/i);
    expect(p.virtuous?.orgId).toBeTruthy();
  });

  it("virtuous provider reads env overrides for the form and org ids", async () => {
    process.env.DONATION_PROVIDER = "virtuous";
    process.env.NEXT_PUBLIC_VIRTUOUS_FORM_ID = "11111111-2222-3333-4444-555555555555";
    process.env.NEXT_PUBLIC_VIRTUOUS_ORG_ID = "9999";
    const { getDonationProvider } = await reload();
    const p = getDonationProvider();
    expect(p.virtuous?.vformId).toBe("11111111-2222-3333-4444-555555555555");
    expect(p.virtuous?.orgId).toBe("9999");
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
