# Mobile Optimization Plan

Implement a high-fidelity, professionally optimized mobile layout for the Crochet Craft website, strictly adhering to the provided reference screenshots and specifications for the mobile breakpoint (max-width: 767px), while preserving the desktop and tablet layouts exactly as they are.

## User Review Required
> [!IMPORTANT]
> - All changes are scoped specifically to mobile screens (max-width: 767px).
> - Desktop and tablet views will remain untouched.

## Proposed Changes

### 1. Mobile Header & Navigation
- **Top Row**: Redesign into a flex-row with [Logo/Brand] on the left and [Instagram][WhatsApp] buttons on the right.
- **Search Bar**: Position full-width rounded search field (60px height) immediately below the top row.
- **Category Bar**: Implement a non-wrapping horizontal scrolling row of category pills with hidden scrollbars.

### 2. Mobile Hero Section
- **Layout**: Switch to a vertical, center-aligned layout.
- **Hierarchy**: Raksha Bandhan badge -> Heading (responsive font size) -> Description -> Side-by-side Buttons -> Countdown -> Image Collage.
- **Image Collage**: Move BELOW text content; rescale circles (Main: 220-250px, Small: 110-150px) to fit viewport perfectly.

### 3. Feature Strip & Collection
- **Feature Strip**: Change from single row to a 2x2 grid layout.
- **Collection Filters**: Implement wrapping pill layout instead of horizontal scroll for better visibility on mobile.
- **Product Grid**: **CRITICAL** - Implement a 2-column grid layout for product cards.

### 4. Component Redesign (Mobile Only)
- **Product Cards**: Update typography (uppercase categories, serif titles), Price/Order button alignment, and ensure white background/rounded corners.
- **Custom Box/Story/FAQ**: Optimize for full-width mobile view with appropriate padding and centered typography.
- **Footer**: Center all elements (Logo, Tagline, Socials).

## Technical Details
- **Media Queries**: All mobile-specific CSS will be encapsulated within `@media (max-width: 767px)`.
- **CSS Architecture**: Use Tailwind's responsive prefixes (`md:`, `lg:`) and custom CSS in `src/styles.css` where utility classes become too verbose for complex mobile-only structures.
- **Layout Stability**: Fix horizontal overflow issues by ensuring `box-sizing: border-box` and `max-width: 100%` on all containers.
- **Components**: Update `Header.tsx`, `ProductCard.tsx`, and `index.tsx`.
