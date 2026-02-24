# UI Coding Standards

## Component Library

**ONLY shadcn/ui components are permitted in this project.**

- Custom UI components are **strictly forbidden**
- Do NOT create wrapper components around shadcn/ui components
- Do NOT build any UI primitives (buttons, inputs, cards, dialogs, etc.) from scratch
- If a shadcn/ui component does not exist for a use case, install it via the CLI before writing any custom code

### Installing shadcn/ui Components

```bash
npx shadcn@latest add <component-name>
```

### Examples of Correct Usage

```tsx
// ✅ Correct — use shadcn/ui components directly
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// ❌ Wrong — do NOT create custom components
const MyButton = ({ children }) => (
  <button className="bg-blue-500 px-4 py-2 rounded">{children}</button>
)
```

---

## Date Formatting

All date formatting must use **date-fns**.

### Required Format

Dates must be displayed using ordinal day, abbreviated month, and full year:

| Date | Display |
|------|---------|
| 2025-09-01 | 1st Sep 2025 |
| 2025-08-02 | 2nd Aug 2025 |
| 2026-01-03 | 3rd Jan 2026 |
| 2024-06-04 | 4th Jun 2024 |

### Implementation

```tsx
import { format } from "date-fns"

function formatDate(date: Date): string {
  return format(date, "do MMM yyyy")
}
```

- `do` — ordinal day (1st, 2nd, 3rd, 4th…)
- `MMM` — abbreviated month (Jan, Feb, Mar…)
- `yyyy` — 4-digit year

### Examples

```tsx
formatDate(new Date("2025-09-01")) // "1st Sep 2025"
formatDate(new Date("2025-08-02")) // "2nd Aug 2025"
formatDate(new Date("2026-01-03")) // "3rd Jan 2026"
formatDate(new Date("2024-06-04")) // "4th Jun 2024"
```

Do NOT use `new Date().toLocaleDateString()`, `Intl.DateTimeFormat`, or any other date formatting utility. **date-fns only.**
