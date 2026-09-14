# RentalCar — Car Rental Web Application

A responsive, production-ready car rental application built with **Next.js (App Router)**, **TypeScript**, **TanStack Query**, and **Zustand**. The application provides an interactive vehicle catalog with backend filtering and infinite pagination, detailed technical specification views, an accessible booking system with toast notifications, custom accessible UI controls, and persistent client-side favorites management.

---

## 🚀 Live Demo

- **Production Deployment:** [rental-car-app-yu-za.vercel.app](https://rental-car-app-yu-za.vercel.app)
- **Repository:** [github.com/yulikafsd/rental-car-app](https://github.com/yulikafsd/rental-car-app)

---

## ✅ Test Assignment Criteria Checklist

- [x] Next.js 15+ App Router & TypeScript
- [x] TanStack Query with `useInfiniteQuery` (Load More pagination)
- [x] Backend-side vehicle filtering
- [x] Car details route opening in a new tab (`/catalog/[carId]`)
- [x] Functional booking form with API integration & toast alerts
- [x] Desktop layout matching Figma design specifications
- [x] Custom accessible UI controls (Select, Checkbox)

---

## 🛠️ Tech Stack & Tools

- **Next.js (App Router)** — React framework handling hybrid Server/Client components, dynamic routing, metadata generation, and image optimization.
- **TypeScript** — Strict static typing across API contracts, domain entities, filter schemas, and component interfaces.
- **@tanstack/react-query** — Asynchronous server-state management using `useInfiniteQuery` for paginated car retrieval, automated caching, and refetch handling.
- **Zustand** — Lightweight client state store with `persist` middleware for persistent user favorites in `localStorage`.
- **React Hot Toast** — Accessible interactive toast notifications for booking confirmations and form submission feedback.
- **CSS Modules & Design Tokens** — Scoped, collision-free styling with design tokens defined as CSS custom properties in `:root` (Flexbox & Grid layout models, zero style duplication).
- **React Icons** — Accessible icon set (`react-icons/fi`).
- **next/image** — High-performance image loading with responsive slot sizing, layout shift (CLS) stabilization, and AVIF/WebP delivery.

---

## ✨ Features

- **Dynamic Routing & Navigation:**
    - `/` — Homepage with an engaging hero banner and direct CTA leading to the catalog.
    - `/catalog` — Paginated car catalog featuring backend filter synchronization via URL search parameters.
    - `/catalog/[carId]` — Vehicle specification overview opening in a new tab with interactive rental booking.
- **Custom Accessible UI Controls:**
    - **Custom Select:** Fully accessible dropdown with custom styling, custom scrollbars, keyboard navigation (`Escape`, `Enter`, `Space`), and WAI-ARIA listbox attributes.
    - **Custom Checkbox:** Styled accessible checkbox with proper focus states and keyboard toggling.
    - **Mileage Inputs:** Dual range numerical inputs bundled semantically in a fieldset.
- **Backend Search & Filtering:**
    - Brand selection dropdown populated via dynamic filters endpoint.
    - Hourly rate selector with custom prefix formatting.
    - Dual numeric mileage range filter (`minMileage` and `maxMileage`).
    - URL query parameter synchronization enabling shareable filter states.
    - Instant filter reset functionality.
- **Infinite Pagination (`Load More`):**
    - Continuous data fetching powered by TanStack Query's `useInfiniteQuery`.
    - Seamless appending of subsequent pages preserving active search filters.
- **Persistent Favorites System:**
    - Instant bookmarking of vehicles saved across browser sessions using Zustand `persist` middleware in `localStorage`.
    - Dedicated "Only favorites" filter toggle to browse saved cars.
- **Rental Booking & Toast Feedback:**
    - Complete car technical specifications: engine, fuel consumption, mileage, rental conditions, and functional accessories.
    - Validated booking form sending data directly to the backend API.
    - Accessible feedback with **React Hot Toast** confirming booking success.
- **Comprehensive Accessibility (a11y & WCAG 2.2):**
    - Valid semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<fieldset>`, `<ul>`/`<li>`).
    - Screen-reader-friendly ARIA attributes (`aria-current`, `aria-label`, `aria-expanded`, `aria-controls`, `aria-busy`, `aria-live`, `role="alert"`).
    - Smooth, accessible keyboard focus indicators (`:focus-visible` with animated outline transitions).
    - Layout Shift mitigation (CLS) with locked scrollbar margins (`scrollbar-gutter: stable`) and fixed image slot dimensions.
- **SEO & Dynamic Metadata:**
    - Route-level metadata coverage using Next.js root `metadataBase` and title templates (`%s | Rental Car App`).
    - Dynamic `generateMetadata` implementation on `/catalog/[carId]` generating vehicle-specific titles, descriptions, and Open Graph cards.
    - Polymorphic Button Component: Fully reusable, type-safe button supporting multiple visual variants (`primary`, `outline`) and size presets (`extraLarge`, `large`, `full`, `compact`), dynamically rendering as either a native `<button>` or a Next.js `<Link>` based on navigation props while maintaining unified focus states and accessibility standards.

---

## 📊 Quality & Performance Audit

The application was audited using Google Lighthouse, demonstrating high optimization standards, semantic markup, and full accessibility compliance:

| Metric             |  Score  | Target Met                                                                |
| :----------------- | :-----: | :------------------------------------------------------------------------ |
| **Performance**    | **100** | Zero layout shifts (CLS), optimized Next.js images, stable layout heights |
| **Accessibility**  | **96**  | WCAG 2.2 compliant, keyboard navigability, semantic ARIA roles            |
| **Best Practices** | **100** | Secure headers, modern web standards, error-free console execution        |
| **SEO**            | **100** | Dynamic Open Graph cards, descriptive meta tags, robots configuration     |

## Lighthouse Audit Scores:

- [Home Page](./public/lighthouse_home.png?raw=true)
- [Catalog Page](./public/lighthouse_catalog.png?raw=true)

---

## 📂 Project Structure

```text
rental-car-app/
├── app/
│   ├── catalog/
│   │   ├── [carId]/
│   │   │   ├── CarDetailsView.tsx       # Client presentation view for car details
│   │   │   ├── page.module.css          # Car details layout styles
│   │   │   └── page.tsx                 # Server component with dynamic generateMetadata
│   │   ├── CatalogView.module.css       # Catalog grid and container styles
│   │   ├── CatalogView.tsx              # Interactive catalog with infinite query handling
│   │   └── page.tsx                     # Catalog route boundary with accessible headings
│   ├── globals.css                      # Global resets, typography tokens, and CSS variables
│   ├── layout.tsx                       # Root layout with Header, Footer, and QueryProvider
│   ├── page.module.css                  # Home hero section styles
│   └── page.tsx                         # Landing homepage with main CTA
├── components/
│   ├── BookingForm/                     # Rental request form with submission handling & toasts
│   ├── Button/                          # Polymorphic, reusable accessible button
│   ├── CarCard/                         # Catalog car card with mock dimension slots
│   ├── CarInfo/                         # Technical specifications and conditions list
│   ├── ErrorMessage/                    # Resilient error display with retry triggers
│   ├── Filters/                         # Search bar orchestrating filter controls
│   │   ├── CustomCheckbox/              # Custom accessible checkbox input
│   │   ├── CustomSelect/                # WAI-ARIA compliant keyboard dropdown
│   │   └── MileageFilter/               # Fieldset-grouped dual mileage inputs
│   ├── Footer/                          # Global footer
│   ├── Header/                          # Global navigation with active route detection
│   ├── Loader/                          # Status loading indicator with CLS stabilization
│   └── NoResults/                       # Empty state display with reset filter action
├── hooks/
│   ├── useCarDetails.ts                 # Single car data query hook
│   ├── useCarFilters.ts                 # Available brands query hook
│   └── useCars.ts                       # Infinite query car pagination hook
├── providers/
│   └── QueryProvider.tsx                # TanStack React Query client setup
├── public/                              # Static brand assets, icons, and illustrations
├── services/
│   └── api.ts                           # Axios API client and backend service calls
├── store/
│   └── useFavoritesStore.ts             # Zustand persistent favorites store
└── types/
    └── car.ts                           # Domain models, filter types, and API schemas
```

---

## 🔗 Backend API Integration

- **Base URL:** `https://car-rental-api.goit.global`
- **Endpoints:**
    - `GET /cars` — Paginated list of vehicles with query filtering (`brand`, `pricePerHour`, `minMileage`, `maxMileage`, `page`, `limit`).
    - `GET /cars/:id` — Single vehicle specification.
    - `GET /brands` — List of available automotive brands for dynamic filter options.

---

## 💻 Getting Started Locally

### Prerequisites:

- Node.js >= 18.18.0
- npm >= 9.0.0

1. Clone the repository:

    ```bash
    git clone [https://github.com/yulikafsd/rental-car-app.git](https://github.com/yulikafsd/rental-car-app.git)
    ```

2. Navigate to the project directory:

    ```bash
    cd rental-car-app
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:
   Create a .env.local file in the root directory and add your NoteHub API Token:

    ```bash
     NEXT_PUBLIC_API_URL=https://car-rental-api.goit.global
    ```

5. Start the development server:
    ```Bash
    npm run dev
    ```

Open http://localhost:3000 in your browser.

### **Available Scripts**:

- npm run dev — Starts the Next.js local development server.
- npm run build — Creates an optimized production build.
- npm run start — Boots the production server.
- npm run lint — Runs ESLint checks across the codebase.

👤 Author: Yuliia Zahorovska (GitHub: @yulikafsd)
