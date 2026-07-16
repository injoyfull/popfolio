// i18n 설정 — 지원 로케일과 기본 로케일. (Next 16 App Router i18n 가이드 기준)
// 라우팅은 app/[lang]/ 하위 서브패스( /en, /zh, /es, 기본 ko )로 처리 예정.

export const locales = ["ko", "en", "zh", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ko";

// 언어 전환 UI에 보이는 라벨 (각 언어 이름은 그 언어로 표기)
export const localeNames: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  zh: "简体中文",
  es: "Español",
};

// <html lang> 및 hreflang용 BCP-47 태그
export const localeHtmlLang: Record<Locale, string> = {
  ko: "ko",
  en: "en",
  zh: "zh-CN",
  es: "es",
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
