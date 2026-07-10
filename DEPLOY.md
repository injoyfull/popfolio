# Popfolio 배포 가이드 (Supabase + Vercel)

로컬에서는 작업이 `data/` 폴더(파일)에 저장돼요. 하지만 Vercel은 파일을 영구 저장하지
못하기 때문에, **배포 환경에서는 Supabase**(Postgres + Storage)를 씁니다.

> 코드는 이미 **이중 모드**예요. 아래 환경변수 2개가 있으면 자동으로 Supabase를 쓰고,
> 없으면 로컬 파일 모드로 돕니다. 즉 로컬 개발은 아무 설정 없이 지금처럼 그대로 돌아가요.

환경변수 (코드가 읽는 정확한 이름):

| 이름 | 값 |
|---|---|
| `SUPABASE_URL` | Supabase 프로젝트 URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role 키 (비밀! 서버에서만 사용) |

---

## 1부. Supabase 설정 (한 번만)

### 1) 프로젝트 만들기
1. https://supabase.com 에서 로그인 → **New project**
2. 이름(예: `popfolio`), 비밀번호, 리전(가까운 곳: `Northeast Asia (Seoul)`) 선택 → 생성
3. 프로비저닝 1~2분 대기

### 2) 이미지 저장용 버킷 만들기
1. 왼쪽 메뉴 **Storage** → **New bucket**
2. 이름: **`works`** (코드가 이 이름을 찾음)
3. **Public bucket** 옵션 **켜기** → 저장
   (공개 버킷이라야 이미지가 링크로 바로 보여요)

### 3) 데이터 테이블 만들기
1. 왼쪽 메뉴 **SQL Editor** → **New query** → 아래 붙여넣고 **Run**:

```sql
create table if not exists portfolios (
  id text primary key,
  created_at timestamptz default now(),
  data jsonb not null
);
```

> RLS(행 수준 보안)는 기본값 그대로 두세요. 서버에서 service_role 키로 접근하므로
> 별도 정책 없이 동작합니다. (이 키는 클라이언트에 절대 노출되지 않아요.)

### 4) 키 두 개 복사
1. 왼쪽 아래 **Project Settings** → **API**
2. **Project URL** → `SUPABASE_URL` 에 쓸 값
3. **Project API keys**의 **`service_role`** (secret) → `SUPABASE_SERVICE_ROLE_KEY` 에 쓸 값
   - ⚠️ `anon` 말고 **`service_role`** 이에요. 이 값은 비밀이니 아무 데도 공유·커밋 금지.

---

## 2부. Vercel 배포

### 1) 저장소 가져오기
1. https://vercel.com 로그인 (GitHub 계정으로)
2. **Add New… → Project** → GitHub의 **`injoyfull/popfolio`** 선택 → **Import**
3. 프레임워크는 자동으로 **Next.js** 로 잡힘 (그대로 두기)

### 2) 환경변수 넣기 (Deploy 누르기 전에)
Import 화면의 **Environment Variables** 에 2개 추가:

| Name | Value |
|---|---|
| `SUPABASE_URL` | (1부 4)에서 복사한 Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | (1부 4)에서 복사한 service_role 키 |

### 3) 배포
**Deploy** 클릭 → 1~2분 후 `https://popfolio-xxxx.vercel.app` 주소가 나와요.
그 주소로 들어가 **만들기**를 해보면, 이제 이미지·글이 Supabase에 저장되어
새로고침해도·다른 사람이 봐도 유지됩니다. 🎉

---

## (선택) 로컬에서 Supabase 모드로 테스트하기

로컬에서도 Supabase 저장을 확인하고 싶으면, 프로젝트 루트에 `.env.local` 파일을 만들고:

```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

→ `npm run dev`. (이 파일은 `.gitignore`로 커밋되지 않아요.)
환경변수를 지우면 다시 로컬 파일 모드로 돌아갑니다.

---

## 참고: 저장 방식 요약

- 이미지 → Supabase Storage `works` 버킷의 `{id}/{파일명}`, 공개 URL로 서빙
- 포트폴리오 데이터 → `portfolios` 테이블에 `id` + `data`(jsonb)
- 접근 코드는 전부 `lib/storage.ts` 한 곳에 있음 (모드 분기도 여기)
