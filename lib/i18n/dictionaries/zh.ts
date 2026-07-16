import type { Dictionary } from "./ko";

// 简体中文 (zh-CN)
const zh: Dictionary = {
  nav: {
    sample: "查看示例展",
    create: "开办展览",
  },
  hero: {
    eyebrow: "孩子的快闪展",
    titleLines: ["孩子的首次个展，", "60秒即可开展。"],
    highlight: "60秒",
    sub: "别让它埋没在相册里。上传几张孩子作品的照片和名字——它就会像真正的画廊展览一样精致呈现。用一个链接邀请全家人。",
    ctaPrimary: "开办孩子的展览 →",
    ctaSecondary: "浏览示例展",
    trust: "无需登录 · 免费开始 · 60秒完成",
  },
  how: {
    kicker: "HOW IT WORKS",
    title: "如何开展？",
    sub: "不懂设计和文案也没关系。只要有照片，剩下的交给 Popfolio。",
    steps: [
      {
        emoji: "📷",
        title: "上传",
        body: "上传作品照片和名字。手机大图会自动压缩到合适大小。",
      },
      {
        emoji: "🎨",
        title: "自动布展",
        body: "选择一种风格，画廊会自动搭配色彩、字体和排版。",
      },
      {
        emoji: "💌",
        title: "邀请",
        body: "用一个链接邀请全家人。有新作品可随时继续添加。",
      },
    ],
  },
  beforeAfter: {
    kicker: "BEFORE / AFTER",
    title: "不是相册，而是展厅。",
    sub: "同一幅画，如何陈列决定一切。别只是保存，去展出。",
    beforeLabel: "只是相册",
    beforeCaption: "淹没在数百张照片里，一划而过。",
    afterLabel: "孩子的展览",
    afterCaption: "每一件都挂上专属的标签。",
  },
  exhibition: {
    kicker: "THE EXHIBITION",
    titleLines: ["宛如真正的展厅，", "聚光灯亮起。"],
    sub: "轻点缩略图，作品便在暗色展厅中央亮起，像墙签一样标注标题。用 ◀▶ 逐件浏览——那种“我的孩子成了艺术家”的感觉。",
    cta: "打开示例展 →",
    labelCategory: "绘画",
    labelCaption: "今日涂鸦 — 每天一张",
  },
  moods: {
    kicker: "MOODS",
    title: "四种风格，随时切换。",
    sub: "一键即可为整个展览换上新风格。选择最适合孩子的那一种。",
    items: {
      modern: { label: "现代", desc: "深色背景配清新荧光点缀。别致的工作室气质。" },
      warm: { label: "温暖", desc: "奶油色背景搭配陶土色。温馨的精品店氛围。" },
      minimal: { label: "极简", desc: "留白与纤细字体。安静而清晰。" },
      vivid: { label: "鲜明", desc: "明快的色块与大字体。时髦的快闪气质。" },
    },
  },
  finalCta: {
    titleLines: ["孩子的首次个展，", "现在就开办。"],
    sub: "几张照片就足够。把压在抽屉里的画，变成全家都来看的展览。",
    cta: "开办孩子的展览 →",
    trust: "无需登录 · 免费 · 60秒",
  },
  footer: {
    tagline: "孩子的作品被挂起的那一刻。 — Made with Popfolio",
  },
  metadata: {
    title: "Popfolio — 孩子的首次个展",
    description: "上传几张孩子作品的照片和名字，即成时髦的快闪展。用一个链接邀请全家人。",
  },
};

export default zh;
