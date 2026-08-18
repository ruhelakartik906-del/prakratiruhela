# Admin Panel Implementation Plan

Create a secure, clean, and responsive admin panel for managing products, categories, tags, and website content, integrated with the existing Supabase backend.

## User Interface & Experience
- Clean, minimalist admin layout using the project's existing color palette (#FBF7F0 background, #3B2922 accents).
- Sidebar navigation for Dashboard, Products, Categories, Tags, and Content.
- Responsive design for mobile and tablet access.
- Success/error feedback via Sonner toasts.

## Security & Authentication
- Email/Password authentication using Supabase Auth.
- Route protection: Redirect unauthenticated users to `/admin/login`.
- RLS-aware data fetching using the Supabase client.
- No exposure of sensitive service-role keys in frontend code.

## Core Features
### 1. Dashboard
- Quick overview cards showing total counts for products, categories, and tags.

### 2. Product Management (CRUD)
- Data table view with sorting and status indicators.
- Form to add/edit products including name, description, price, category, and tags.
- Toggles for "Active" and "Bestseller" status.
- Image upload integration with Supabase Storage ("website-images" bucket).

### 3. Category & Tag Management
- Simple lists/grids to manage taxonomy.
- Add, Edit, and Delete operations for categories (with image upload) and tags.

### 4. Website Content Manager
- Direct editing of `site_content` table entries to manage website text dynamically.

## Technical Details
- **Routing**: TanStack Router with `/admin` layout group.
- **Data Fetching**: TanStack Query combined with TanStack Start `createServerFn` for secure backend operations.
- **State Management**: Form state via React hooks; server state via TanStack Query.
- **Storage**: Supabase Storage for assets.

## Files to be created/modified
- `src/routes/admin/login.tsx`: Login page.
- `src/routes/admin/route.tsx`: Protected admin layout.
- `src/routes/admin/index.tsx`: Dashboard.
- `src/routes/admin/products/index.tsx`: Product list.
- `src/routes/admin/categories/index.tsx`: Category list.
- `src/routes/admin/tags/index.tsx`: Tag list.
- `src/routes/admin/content/index.tsx`: Site content manager.
- `src/lib/admin.functions.ts`: Server functions for database operations.
