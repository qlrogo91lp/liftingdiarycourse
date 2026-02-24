# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ Docs-First Rule (MUST FOLLOW — HIGHEST PRIORITY)

**모든 코드 생성 및 수정 전에 `/docs` 디렉토리의 관련 문서를 반드시 먼저 읽어야 합니다.**
이 규칙은 예외 없이 모든 작업에 최우선으로 적용됩니다.

### 필수 절차

1. 코드를 한 줄이라도 작성하기 전에 작업과 관련된 `/docs/*.md` 파일을 Read 툴로 읽습니다.
2. 문서에 명시된 구조, 패턴, 규칙을 코드에 반영합니다.
3. 문서와 충돌하는 코드는 절대 생성하지 않습니다.
4. 관련 문서를 읽지 않은 상태에서 코드를 생성하는 것은 허용되지 않습니다.

### 등록된 문서 목록

| 문서 | 적용 범위 |
|------|----------|
| `/docs/ui.md` | 모든 UI 컴포넌트, 스타일링, 날짜 포맷 |

## Project Overview

Lifting Diary Course - Next.js 16 기반 풀스택 웹 애플리케이션 (React 19, TypeScript 5)

## Development Commands

```bash
npm run dev      # 개발 서버 실행 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 검사
```

## Architecture

- **App Router**: `src/app/` 디렉토리 기반 라우팅 (pages 방식 아님)
- **Authentication**: Clerk (`@clerk/nextjs`)
- **Styling**: Tailwind CSS v4 + PostCSS
- **Fonts**: Geist, Geist_Mono (next/font 자동 최적화)

## Key Files

- `src/app/layout.tsx` - 루트 레이아웃, ClerkProvider 래핑
- `src/app/page.tsx` - 메인 페이지
- `src/app/globals.css` - 전역 스타일, Tailwind 통합
- `src/middleware.ts` - Clerk 인증 미들웨어

## Authentication (Clerk)

- `clerkMiddleware()` 사용 (authMiddleware 아님)
- 서버 컴포넌트에서 `auth()` 사용 시 `@clerk/nextjs/server`에서 import
- 환경 변수: `.env.local`에 `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` 설정

## Code Conventions

- **Imports**: 절대 경로 사용 (`@/` → `src/` 디렉토리)
- **TypeScript**: strict mode 활성화
- **Styling**: Tailwind CSS 유틸리티 클래스 사용
