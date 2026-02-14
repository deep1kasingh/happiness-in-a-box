# Production deployment

This app can run in two modes:

- **Local / demo**: Auth and completions use **localStorage** (no backend). Good for development and trying the app.
- **Production**: Auth and completions use **Supabase** (hosted auth + PostgreSQL). Good for real users and multiple devices.

---

## 1. Deploy with localStorage (no backend)

Works out of the box. Deploy the Next.js app to [Vercel](https://vercel.com), Netlify, or any Node host.

```bash
npm run build
npm start
```

- No env vars required.
- Data is per browser (localStorage). Users lose progress if they clear data or use another device.

---

## 2. Deploy with Supabase (production)

### 2.1 Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a project.
2. In **Project Settings → API**, copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2.2 Run the database migration

1. Install Supabase CLI: `npm i -g supabase` (or use the SQL Editor in the dashboard).
2. Link the project: `supabase link --project-ref YOUR_REF`.
3. Run the migration:
   ```bash
   supabase db push
   ```
   Or in the Supabase dashboard: **SQL Editor** → New query → paste the contents of `supabase/migrations/20250101000000_day_completions.sql` → Run.

### 2.3 Enable Email auth (optional)

In Supabase: **Authentication → Providers → Email** → enable “Confirm email” if you want verification. For a simple setup you can leave it off so users can sign up and sign in immediately.

### 2.4 Set environment variables

Create `.env.local` (or set in your host’s dashboard):

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_USE_SUPABASE=true
```

- **Vercel**: Project → Settings → Environment Variables. Add the three variables and redeploy.
- **Other hosts**: Set the same variables in their env/config UI.

### 2.5 Build and deploy

```bash
npm run build
npm start
```

With `NEXT_PUBLIC_USE_SUPABASE=true`:

- Sign up / log in use Supabase Auth (email + password, stored securely).
- Completions and streaks are stored in Supabase and sync across devices for logged-in users.
- Guest users (not logged in) still use localStorage for that browser only.

---

## 3. Checklist before going live

- [ ] Supabase project created and migration applied.
- [ ] `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `NEXT_PUBLIC_USE_SUPABASE=true` set in production.
- [ ] Custom domain and HTTPS (handled by Vercel/Netlify by default).
- [ ] (Optional) Turn on email confirmation in Supabase if you want verified emails.

---

## 4. Switching back to localStorage

Set `NEXT_PUBLIC_USE_SUPABASE=false` (or remove it) and redeploy. The app will use localStorage again for auth and completions.
