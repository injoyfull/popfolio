// 브라우저에서 업로드 전에 이미지를 줄이고 다시 인코딩한다.
// 목적: 큰 폰 사진(수 MB)이 서버/호스팅 요청 크기 한도(Vercel ~4.5MB)에 걸리는 문제 해결.
// EXIF 회전도 바로잡아 세로/가로가 눕는 문제를 방지한다.

export interface PreparedImage {
  blob: Blob;
  name: string;
  previewUrl: string;
  /** 사진을 찍은 날 (YYYY-MM-DD). EXIF에서 읽고, 없으면 파일 수정일. */
  takenAt?: string;
}

/**
 * 사진을 '언제' 찍었는지 읽는다 — 쌓이는 아카이브의 시간 축.
 * 부모가 날짜를 일일이 적게 하지 않으려고 EXIF 촬영일을 자동으로 가져온다.
 *
 * JPEG APP1(Exif) → TIFF → IFD0의 DateTime(0x0132) 또는
 * ExifIFD(0x8769)의 DateTimeOriginal(0x9003). 형식은 "YYYY:MM:DD HH:MM:SS".
 * 실패하면 파일 수정일로 폴백한다. (재인코딩 시 EXIF는 어차피 제거되므로 여기서만 읽는다)
 */
export async function readPhotoDate(file: File): Promise<string | undefined> {
  const fromMtime = (): string | undefined => {
    if (!file.lastModified) return undefined;
    return toYMD(new Date(file.lastModified));
  };

  if (!file.type.startsWith("image/")) return fromMtime();

  try {
    // EXIF는 파일 앞부분에 있다 — 앞 256KB만 읽으면 충분
    const head = new DataView(await file.slice(0, 262144).arrayBuffer());
    if (head.byteLength < 4 || head.getUint16(0) !== 0xffd8) return fromMtime();

    let off = 2;
    while (off + 4 < head.byteLength) {
      if (head.getUint8(off) !== 0xff) break;
      const marker = head.getUint8(off + 1);
      if (marker === 0xda) break; // 이미지 데이터 시작
      const segLen = head.getUint16(off + 2);

      if (marker === 0xe1 && off + 10 < head.byteLength) {
        // "Exif\0\0" 확인
        let isExif = true;
        const sig = [0x45, 0x78, 0x69, 0x66, 0x00, 0x00];
        for (let i = 0; i < sig.length; i++) {
          if (head.getUint8(off + 4 + i) !== sig[i]) {
            isExif = false;
            break;
          }
        }
        if (isExif) {
          const found = parseTiffDate(head, off + 10);
          if (found) return found;
        }
      }
      off += 2 + segLen;
    }
  } catch {
    // 파싱 실패는 조용히 폴백
  }
  return fromMtime();
}

function toYMD(d: Date): string | undefined {
  if (Number.isNaN(d.getTime())) return undefined;
  const y = d.getFullYear();
  if (y < 1990 || y > 2100) return undefined; // 명백히 잘못된 값 방어
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** TIFF 헤더 위치(tiffStart)부터 촬영일 태그를 찾는다. */
function parseTiffDate(v: DataView, tiffStart: number): string | undefined {
  if (tiffStart + 8 > v.byteLength) return undefined;
  const le = v.getUint16(tiffStart) === 0x4949; // "II" = little endian
  const u16 = (p: number) => v.getUint16(p, le);
  const u32 = (p: number) => v.getUint32(p, le);

  const readIfd = (ifdOff: number, want: number[]): Map<number, number> => {
    const out = new Map<number, number>();
    const base = tiffStart + ifdOff;
    if (base + 2 > v.byteLength) return out;
    const n = u16(base);
    for (let i = 0; i < n; i++) {
      const e = base + 2 + i * 12;
      if (e + 12 > v.byteLength) break;
      const tag = u16(e);
      if (want.includes(tag)) out.set(tag, u32(e + 8));
    }
    return out;
  };

  const readAscii = (offset: number, len = 19): string | undefined => {
    const p = tiffStart + offset;
    if (p + len > v.byteLength) return undefined;
    let s = "";
    for (let i = 0; i < len; i++) {
      const c = v.getUint8(p + i);
      if (c === 0) break;
      s += String.fromCharCode(c);
    }
    return s;
  };

  const toDate = (s?: string): string | undefined => {
    // "YYYY:MM:DD HH:MM:SS"
    const m = s?.match(/^(\d{4}):(\d{2}):(\d{2})/);
    if (!m) return undefined;
    return toYMD(new Date(+m[1], +m[2] - 1, +m[3]));
  };

  const ifd0 = readIfd(u32(tiffStart + 4), [0x0132, 0x8769]);

  // 촬영 원본 시각(DateTimeOriginal)이 가장 정확하다
  const exifPtr = ifd0.get(0x8769);
  if (exifPtr !== undefined) {
    const sub = readIfd(exifPtr, [0x9003]);
    const orig = toDate(readAscii(sub.get(0x9003) ?? -1));
    if (orig) return orig;
  }
  return toDate(readAscii(ifd0.get(0x0132) ?? -1));
}

async function loadBitmap(
  file: File,
): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file, {
        imageOrientation: "from-image",
      } as ImageBitmapOptions);
    } catch {
      // 일부 포맷은 createImageBitmap 실패 → 아래 폴백
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("decode failed"));
      img.src = url;
    });
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** 이미지를 최대 변 길이 maxEdge 이하로 줄여 JPEG로 재인코딩. 실패 시 원본 그대로. */
export async function prepareImage(
  file: File,
  maxEdge = 1600,
  quality = 0.85,
): Promise<PreparedImage> {
  // 재인코딩하면 EXIF가 사라지므로, 촬영일은 먼저 읽어 둔다
  const takenAt = await readPhotoDate(file);

  const asIs = (): PreparedImage => ({
    blob: file,
    name: file.name,
    previewUrl: URL.createObjectURL(file),
    takenAt,
  });

  // 벡터·움짤은 래스터화하지 않고 원본 사용
  if (file.type === "image/svg+xml" || file.type === "image/gif") return asIs();

  try {
    const src = await loadBitmap(file);
    const w0 = "width" in src ? src.width : 0;
    const h0 = "height" in src ? src.height : 0;
    if (!w0 || !h0) return asIs();

    const scale = Math.min(1, maxEdge / Math.max(w0, h0));
    const w = Math.round(w0 * scale);
    const h = Math.round(h0 * scale);

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return asIs();
    ctx.drawImage(src as CanvasImageSource, 0, 0, w, h);
    if ("close" in src) (src as ImageBitmap).close();

    const blob = await new Promise<Blob | null>((res) =>
      canvas.toBlob(res, "image/jpeg", quality),
    );
    if (!blob) return asIs();

    // 줄인 게 원본보다 오히려 크면 원본 유지
    if (blob.size >= file.size && file.size < 4_000_000) return asIs();

    const base = file.name.replace(/\.[^.]+$/, "") || "image";
    return {
      blob,
      name: `${base}.jpg`,
      previewUrl: URL.createObjectURL(blob),
      takenAt,
    };
  } catch {
    return asIs();
  }
}
