import type { Env } from "./types";

export type PromoAdSettings = {
  enabled: boolean;
  title: string;
  body: string;
  image_url: string;
  link_url: string;
  link_text: string;
  /** 内容版本号：变更后同一天也会再弹一次 */
  rev: number;
};

const DEFAULTS: PromoAdSettings = {
  enabled: false,
  title: "",
  body: "",
  image_url: "",
  link_url: "",
  link_text: "",
  rev: 1,
};

/** 未配置时默认从主站拉广告；设为空字符串可关闭远程广告 */
export const DEFAULT_PROMO_AD_SOURCE = "https://www.688118.xyz/api/v1/promo-ad";

function sanitizeUrl(raw: unknown, allowRelative = false): string {
  const s = String(raw ?? "").trim();
  if (!s) return "";
  if (s.length > 2000) return "";
  if (allowRelative && /^\/(?:uploads|assets)\/[a-z0-9./_-]+$/i.test(s)) return s;
  try {
    const u = new URL(s);
    if (u.protocol !== "http:" && u.protocol !== "https:") return "";
    return u.toString();
  } catch {
    return "";
  }
}

function clampText(raw: unknown, max: number): string {
  return String(raw ?? "")
    .trim()
    .slice(0, max);
}

function normalize(raw: Partial<PromoAdSettings>): PromoAdSettings {
  return {
    enabled: !!raw.enabled,
    title: clampText(raw.title, 120),
    body: clampText(raw.body, 4000),
    image_url: sanitizeUrl(raw.image_url, true),
    link_url: sanitizeUrl(raw.link_url, false),
    link_text: clampText(raw.link_text, 80) || "了解更多",
    rev: Math.max(1, Number(raw.rev) || 1),
  };
}

function absolutizeAd(ad: PromoAdSettings, origin: string): PromoAdSettings {
  const base = origin.replace(/\/$/, "");
  if (ad.image_url.startsWith("/")) {
    return { ...ad, image_url: `${base}${ad.image_url}` };
  }
  return ad;
}

function promoSourceUrl(env: Env): string {
  if (typeof env.PROMO_AD_SOURCE === "string") return env.PROMO_AD_SOURCE.trim();
  return DEFAULT_PROMO_AD_SOURCE;
}

/**
 * 本机公益版：只接收广告（从主站 PROMO_AD_SOURCE 拉取），不提供编辑后台。
 */
export async function resolvePromoAd(env: Env): Promise<PromoAdSettings> {
  const source = promoSourceUrl(env);
  if (!source) return { ...DEFAULTS };

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(source, {
      headers: { Accept: "application/json", "User-Agent": "ea-monitor-local-promo/1" },
      signal: ctrl.signal,
    }).finally(() => clearTimeout(timer));
    if (!res.ok) return { ...DEFAULTS };
    const data = (await res.json()) as Partial<PromoAdSettings>;
    const ad = normalize(data);
    try {
      return absolutizeAd(ad, new URL(source).origin);
    } catch {
      return ad;
    }
  } catch {
    return { ...DEFAULTS };
  }
}

export function promoAdPublicJson(ad: PromoAdSettings) {
  return {
    enabled: ad.enabled,
    title: ad.title,
    body: ad.body,
    image_url: ad.image_url,
    link_url: ad.link_url,
    link_text: ad.link_text,
    rev: ad.rev,
  };
}
