# Migration Fix Plan

The "Migrate Static Data" operation currently fails due to Row-Level Security (RLS) violations. This plan fixes the migration by implementing a secure server-side administrative client that bypasses RLS using the Supabase Service Role Key.

## User Review Required

> [!IMPORTANT]
> To enable the fix, you must add the Supabase Service Role Key as a secret in Lovable.

1.  Open the **Secrets** tab in the sidebar.
2.  Add a new secret named `EXT_SUPABASE_SERVICE_ROLE_KEY`.
3.  Paste your Supabase Service Role key (found in Supabase Project Settings > API).

## Proposed Changes

### Infrastructure & Security

-   **Admin Client**: Create a dedicated `supabaseAdmin` client in `src/integrations/supabase/client.server.ts` that uses the `EXT_SUPABASE_SERVICE_ROLE_KEY`. This key is never exposed to the browser.
-   **Server-Side Execution**: Ensure all migration logic runs exclusively in a `createServerFn` (server-side context) using the admin client to bypass RLS safely.

### Migration Logic (`src/lib/migration.functions.ts`)

-   **Refactor to Admin Client**: Update `migrateExistingData` to use `supabaseAdmin` instead of the standard client.
-   **Idempotency**: Use `upsert` with `onConflict` (slug for categories, name for products, key for site content) to prevent duplicates if the migration is run multiple times.
-   **Comprehensive Migration**: Ensure all 9 products, 7 categories, and 6 core site content keys are included.
-   **Validation**: Add environment variable checks to provide clear error messages if the service key is missing.

### User Interface

-   **Dashboard Update**: Ensure the "Migrate Static Data" button in `/admin` provides immediate feedback via toasts (Success or specific Error).

## Technical Details

-   `src/integrations/supabase/client.server.ts`: Exports `supabaseAdmin` (Service Role) and `supabase` (Anon).
-   `src/lib/migration.functions.ts`: Uses `supabaseAdmin` for upsert operations.
-   `EXT_SUPABASE_SERVICE_ROLE_KEY`: Stored in server-side environment variables only.
