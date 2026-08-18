# Crafted Creations Catalogue

Create a single-page responsive handmade crochet catalogue website that closely matches the attached reference screenshots in layout, spacing, colors, typography, cards, navigation and overall UX.

Structure

Header → Search → Horizontal Category Pills → Hero → Collection → Filters → 3-Column Product Grid → Custom Order CTA → Brand Story → How to Order → FAQ → Footer.

Design

Use a premium handmade aesthetic:

Warm cream/beige background

Dark brown serif headings

Terracotta active buttons/pills

Teal/green WhatsApp buttons

White rounded product cards

Soft shadows, thin borders, large rounded corners

Elegant serif headings + clean sans-serif body

Match the reference proportions and spacing closely

Header

Logo + brand name, Instagram button, Order on WhatsApp button, centered search bar, horizontally scrollable category pills with counts.

Hero

Large heading:
“A rakhi made by hand, tied with love”
Short handmade description, Browse Designs and Chat with us buttons, plus circular/overlapping product image collage.

Collection

Raksha Bandhan Collection
Subtitle, product count, bulk-order offer, then filters:
All / For Kids / Flowers / Classic / Rakhi + Lumba Sets

Products

Use a responsive data-driven product grid:

Desktop: 3 columns

Tablet: 2 columns

Mobile: 1 column

Each card:
Image → badge/category → product name → short description → price → Order button.

Order button must open WhatsApp directly with a pre-filled message containing the product name and price. No product page, cart, checkout or payment system.

Custom Order

Pastel pink/lavender section:
“Have your own idea?”
Button: Request a custom rakhi
→ opens WhatsApp with a pre-filled custom-order message.

Bottom

Brand story, 3-step How to Order, accordion FAQ, dark brown footer, floating WhatsApp button, and small cookie notice.

Functionality

Implement working:

Search

Category filters

Combined search + filters

Smooth scrolling

WhatsApp order links

Mobile/tablet responsive layout

Sticky/floating WhatsApp CTA

Cookie dismissal with localStorage

Use React + TypeScript + Tailwind CSS. Keep products in one central data structure so images, names, prices and categories can be changed easily.

Important: This is a single-page catalogue only. Do not create product pages, cart, checkout, login, wishlist or unnecessary routes. Match the attached reference screenshots as closely as possible while keeping the site fast, clean and mobile-friendly.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://prakratiruhela.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ba79d395-7f55-45eb-9530-20d809e4f5c2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
