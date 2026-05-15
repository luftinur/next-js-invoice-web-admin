# InvoiceCore Admin Theme

**Next.js 16 · shadcn v4 · Tailwind CSS v4 · TypeScript**

An open-source admin dashboard theme built for invoice management SaaS. 50+ pages, 45+ components, 6 layout variants, full RBAC, charts, tables, and more.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![shadcn](https://img.shields.io/badge/shadcn-v4-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Features

### Layouts
- **Admin Layout** — collapsible sidebar + sticky header
- **Compact Layout** — reduced spacing for data-dense views
- **Horizontal Layout** — top navigation, no sidebar
- **Focus View Layout** — minimal chrome for editing
- **Fullscreen Layout** — print/PDF preview
- **Blank Layout** — auth/error pages

### Pages
- 3 Dashboard variants (Finance, Executive, Team)
- Full Invoice module (list, create, edit, detail, preview, print, PDF, templates, recurring, drafts, overdue, credit notes)
- Customer module (list, profile, transactions, activity, notes)
- Payment tracking (transactions, history, refunds, payouts, gateway logs)
- Subscription management
- Reports & analytics (revenue, expense, tax, cashflow, export)
- Settings (profile, team, billing, API keys, integrations, workspace)
- Roles & permissions matrix
- File manager, calendar, notifications
- 7 auth pages (login, register, password reset, 2FA, etc.)
- 8 error/system pages (401, 403, 404, 500, maintenance, etc.)

### Components
- **UI**: buttons, badges, avatars, alerts, toasts, modals, dropdowns, tabs, accordions, tooltips, popovers, skeleton loaders, command palette
- **Tables**: data table, server-side table, sticky header, expandable rows, saved filters, density switch, Excel/CSV export
- **Forms**: input, select, multi-select, datepicker, currency/tax/percentage fields, rich text editor, markdown editor, tag input, OTP input, file upload, repeater form
- **Charts**: revenue line, payment bar, expense pie, growth area, cashflow (powered by ApexCharts, Chart.js, Recharts)
- **Financial**: currency converter, invoice timeline, payment progress, tax breakdown, billing summary, balance cards, KPI widgets
- **Advanced**: QR generator, barcode scanner, signature pad, PDF preview, global search, notification center

### Theme Features
- Dark/light mode
- RTL support
- 6 color presets (zinc, blue, green, purple, orange, rose)
- Compact density mode
- Sidebar collapse
- Multi-language (6 locales)
- Plugin ecosystem

### Security & Access Control
- Full RBAC with 6 roles (Super Admin to Customer Portal)
- Page-level and action-level permissions
- Data visibility scoping (all, department, assigned, own, none)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI Library | shadcn v4 (powered by Base UI) |
| Styling | Tailwind CSS v4 |
| State | Zustand (persisted) |
| Tables | TanStack Table v8 |
| Charts | ApexCharts, Chart.js, Recharts |
| Forms | React Quill, Tom Select, Flatpickr |
| Drag & Drop | dnd-kit |
| Icons | Lucide React |
| Export | xlsx (Excel), native CSV |
| Plugins | FullCalendar, Dropzone, SortableJS, PDF.js |

---

## Getting Started

```bash
git clone https://github.com/luftinur/next-js-invoice-web-admin.git
cd next-js-invoice-web-admin
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/             # Next.js App Router pages
├── components/      # Reusable UI components
│   ├── ui/          # Base UI primitives
│   ├── tables/      # Data table variants
│   ├── forms/       # Form components
│   ├── charts/      # Chart components
│   ├── invoice/     # Invoice-specific components
│   ├── customer/    # Customer-specific components
│   ├── payments/    # Payment-specific components
│   ├── reports/     # Report components
│   ├── analytics/   # Analytics widgets
│   ├── subscription/# Subscription components
│   ├── advanced/    # Advanced components (QR, barcode, signature)
│   ├── notifications/# Notification channel setup
│   └── rbac/        # Role-based access control UI
├── layouts/         # Layout variants
├── lib/             # Utilities, formatting, theme config
├── store/           # Zustand stores
├── plugins/         # Plugin ecosystem wrappers
└── types/           # TypeScript type definitions
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

---

## License

[MIT](LICENSE) — free to use, modify, and distribute.

Built by [byluftinur](https://luftinurfahmi.net).
