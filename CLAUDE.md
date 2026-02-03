# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

- **App Router**: `app/` 디렉토리 기반 라우팅 (pages 방식 아님)
- **Authentication**: Clerk (`@clerk/nextjs`)
- **Styling**: Tailwind CSS v4 + PostCSS
- **Fonts**: Geist, Geist_Mono (next/font 자동 최적화)

## Key Files

- `app/layout.tsx` - 루트 레이아웃, ClerkProvider 래핑
- `app/page.tsx` - 메인 페이지
- `app/globals.css` - 전역 스타일, Tailwind 통합
- `middleware.ts` - Clerk 인증 미들웨어

## Authentication (Clerk)

- `clerkMiddleware()` 사용 (authMiddleware 아님)
- 서버 컴포넌트에서 `auth()` 사용 시 `@clerk/nextjs/server`에서 import
- 환경 변수: `.env.local`에 `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` 설정

## Code Conventions

- **Imports**: 절대 경로 사용 (`@/` → 프로젝트 루트)
- **TypeScript**: strict mode 활성화
- **Styling**: Tailwind CSS 유틸리티 클래스 사용
