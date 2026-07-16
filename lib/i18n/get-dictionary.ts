import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/ko";

// 서버 컴포넌트에서 로케일별 사전을 지연 로드한다.
// (클라이언트 컴포넌트에는 서버에서 dict 객체를 prop으로 전달)
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  ko: () => import("./dictionaries/ko").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
  zh: () => import("./dictionaries/zh").then((m) => m.default),
  es: () => import("./dictionaries/es").then((m) => m.default),
};

export const getDictionary = (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();

export type { Dictionary };
