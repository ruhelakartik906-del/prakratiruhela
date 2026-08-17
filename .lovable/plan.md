# Visual Design Overhaul - Premium Handmade Aesthetic

Rebuild the website UI to match a premium handmade aesthetic, using the reference style for all sections. This involves updating the color palette, typography, spacing, and interactive elements.

## Design System Updates
- **Colors**:
  - Background: `#FBF7F0` (warm cream)
  - Primary Text: `#3F2A22` (dark brown)
  - Accent: `#C94F2D` (terracotta) for badges, active states, and borders.
  - CTA (WhatsApp): `#087F69` (deep teal).
  - Footer: `#3F2A22` (dark chocolate brown).
- **Typography**: 
  - Headings: Fraunces (Serif) with specific italic accents.
  - Body: Karla (Sans-serif).
- **Shapes**: 
  - Large rounded corners (1.25rem - 2rem).
  - Pill-shaped buttons and inputs.
- **Shadows**: Soft, subtle warm shadows.

## User Interface Refinements

### Header & Navigation
- Redesign the circular logo area.
- Refine the search bar dimensions and focus states.
- Update the horizontal category slider to use the new pill design with terracotta active states.

### Hero Section
- Implement a two-column desktop layout with a soft peach gradient background.
- Style the image collage with thick white borders and soft shadows.

### Product Grid
- Refine product cards with higher border radius, subtle shadows, and a clean hover lift effect.
- Update the price and badge styling to match the terracotta/teal palette.

### Brand Sections
- **Brand Story**: Spacious layout with generous whitespace.
- **How to Order**: Styled as three distinct cards with hover effects.
- **FAQ**: Clean accordion rows with terracotta accents on active states.

### Footer & Global Elements
- Dark brown footer with cream text.
- Floating WhatsApp button in teal.
- Responsive adjustments for mobile (1-col) and tablet (2-col) grids.

## Technical Details
- Update `src/styles.css` with new CSS variables and theme configuration.
- Modify `src/routes/index.tsx` for layout adjustments and new section backgrounds.
- Update `src/components/site/Header.tsx`, `ProductCard.tsx`, and `CookieNotice.tsx` to reflect the new visual identity.
- Ensure all transitions use smooth timing (200-300ms).
