# Configuration de Supabase

Guide en français pour brancher le backend Supabase (articles + admin).

## 1. Créer un projet Supabase

1. Aller sur https://supabase.com et créer un compte.
2. Cliquer sur **New project**, choisir une région proche de vos visiteurs.
3. Noter le mot de passe de la base (à conserver en lieu sûr).
4. Une fois le projet créé, ouvrir **Project Settings → API** :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (secrète !)

## 2. Exécuter les migrations SQL

Deux options :

- **Dashboard** : ouvrir **SQL Editor → New query**, coller le contenu de
  `supabase/migrations/0001_init.sql`, puis **Run**.
- **CLI** (si `supabase` CLI installé) :
  ```bash
  supabase db push
  ```

Cela crée la table `articles` (statuts `draft`, `published`, `rejected`),
les index, la Row Level Security, et le trigger `updated_at`.

## 3. Créer le premier compte admin

L'admin utilise l'authentification Supabase.

1. Ouvrir **Authentication → Users** dans le dashboard.
2. Cliquer **Add user → Create new user**.
3. Saisir un email et un mot de passe forts, cocher **Auto Confirm User** pour
   éviter l'envoi d'e-mail de confirmation en local.
4. Ce compte permet de se connecter sur `/admin/login`.

> Le rôle admin est géré par l'existence d'un compte authentifié (middleware).
> Pour restreindre à certains comptes, ajouter une table `admins` et vérifier
> l'appartenance dans `updateSession` (non inclus par défaut).

## 4. Configurer les variables d'environnement

### En local

Copier `.env.example` vers `.env.local` et remplir les valeurs :

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # JAMAIS commité
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADSENSE_PUBLISHER_ID=
GOOGLE_SITE_VERIFICATION=
NEWSLETTER_FORM_URL=
```

### Dans Vercel

**Project → Settings → Environment Variables**, ajouter les mêmes
(`NEXT_PUBLIC_*`, `SUPABASE_SERVICE_ROLE_KEY`, etc.), puis **Redeploy**.

## 5. Vérifications

- `npm run dev` puis `/admin/login` avec le compte créé à l'étape 3.
- Créer un article dans `/admin/new`, le passer en `published`.
- Vérifier qu'il apparaît sur la page d'accueil et `/article/[slug]`.
- Vérifier qu'un article `draft` ou `rejected` n'apparaît pas en public.

## Sécurité

- `SUPABASE_SERVICE_ROLE_KEY` est utilisée uniquement côté serveur
  (`src/lib/supabase/server.ts`, marqué `server-only`) et ne doit jamais
  apparaître dans le bundle navigateur.
- Le middleware (`src/middleware.ts`) protège toutes les routes `/admin`
  sauf `/admin/login`.
