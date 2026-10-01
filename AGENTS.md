# Agent rules

- All marketplace data lives in `src/data/market.ts` (mock data, no backend) — single source for clinics, doctors, services, slots.
- Every page wraps in `MarketShell` (header, bottom nav, search overlay, city sheet) — keeps navigation consistent.
- Search/filter state lives in URL params (`service`, `when`, `max`, `sort`, `view`…) — back navigation restores filters.
- Bookings are stored in localStorage under `bookings` until a backend exists.
- Colors only via tokens in `src/index.css` mapped in `tailwind.config.ts` — no hardcoded colors in components.
