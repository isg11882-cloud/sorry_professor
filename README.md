# professor-check-please

`교수님 확인 부탁드립니다` 프로젝트는 현재 **범용 바이너리 스트레스 테스트 유틸리티** 방향으로 재구성되었습니다.

## 핵심 기능

- **테스트 파일 생성기(메인)**
  - 파일명(base name) 자유 입력
  - 확장자 선택: `.bin`, `.dat`, `.zero`, `.txt`, `.json`, `.csv`, `.tsv`, `.log`, `.md`, `.xml`, `.yaml`, `.yml`, `.ini`, `.cfg`
  - 데이터 생성 방식: `zero-fill`, `random`
  - 용량 설정: `10KB ~ 50MB` (`51,200KB`, 1024 기준 실바이트 반영)
  - 숫자 입력과 슬라이더가 동일한 KB 값을 항상 공유
  - 생성 파일명 규칙: `[TEST]-${baseName}.${extension}`
  - 생성 직후 즉시 다운로드
- **기존 파일 기본 점검기(보조)**
  - 기본은 접힌 상태로 두고 필요 시 펼쳐 사용
  - 확장자, 용량, 기본 시그니처 점검
  - 브라우저 내 처리, 서버 저장 없음

## 안전 기준

- 생성/다운로드는 브라우저 로컬에서만 처리합니다.
- 정적 배포(GitHub Pages 포함)에서도 동작하도록 Blob URL 다운로드 방식만 사용합니다.
- 테스트 파일은 서버 업로드 리허설, 대용량 처리, 비정형 데이터 대응 검증용입니다.
- 실제 제출물, 운영 데이터, 민감 데이터 용도로 사용하지 않습니다.
- 확장자는 안전 목록에서만 선택할 수 있습니다.

## 실행 기준

이 프로젝트는 `next.config.ts`에서 `output: "export"`를 사용하는 **정적 export** 기준입니다.

- 개발 중 UI 확인: `npm run dev`
- 배포용 정적 산출물 생성: `npm run build`
- 빌드 결과(`out/`) 로컬 확인: `npm run preview`

`next start`는 서버 런타임 프로젝트용 명령이라 현재 구조와 맞지 않습니다. 호환성을 위해 `npm run start`는 `npm run preview` 별칭으로 맞춰 두었습니다.

```bash
npm install
npm run dev
```

정적 빌드 결과를 확인하려면 아래 순서가 맞습니다.

```bash
npm run build
npm run preview
```

브라우저에서 `http://localhost:3000`으로 접속하면 export 결과물을 확인할 수 있습니다.

## 구글 애널리틱스 연동

GA4 측정 ID를 `.env.local` 또는 배포 환경변수에 설정하면 자동으로 스크립트가 삽입됩니다.

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

정적 export 기준이라 빌드 시점에 환경변수가 반영되어야 합니다.

## 검증

```bash
npm run lint
npm run build
```
