# Relay.club
## Getting Started

### Local
Clone the project.
```bash
git@github.com:skpaik/relay-club.git
```

Open in Editor
Create a local env file by following command

```bash
cp .env.local.template .env.local
```

### Supabase
Open a new account and create a new organization.
Then create a project.

Then go to project settings?API
Copy and update project `URL` and `anon` both from supabase

```yaml
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Install dependency and run local development server:

```bash
npm install

npm run dev
# or
yarn dev
```

Open the url in your browser
http://localhost:3000

### Uses
You can use the project in both logged in or logged out state.

- Products Page: Fow showing all products
    - You can add product to cart
    - Logged in state you can add or edit product
- Cart Page: You can see the list of items added to cart
  - If you add `mbp` product then automatically a `vga` product will add to cart
- You can clear the cart by click `Clear cart` button for test purpose