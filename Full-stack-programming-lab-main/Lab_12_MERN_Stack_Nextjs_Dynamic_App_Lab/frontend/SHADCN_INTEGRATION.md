Shadcn/UI integration
---------------------

What I did:
- Could not run `npx shadcn-ui` here because `npm install` failed in your environment. To avoid blocking, I added a small set of shadcn-style, Tailwind-compatible UI primitives manually under `src/components/ui`:
  - `Button`, `Card`, `Input`, `Label`, `Badge`, `Dialog`, `Dropdown`, `NavigationMenu`, and a `cn` helper.

How to finish with the official shadcn tooling (optional):
1. Fix `npm install` issues (see below) and run:
```bash
cd frontend
npm install
npx shadcn-ui@latest init
```
2. Then generate components you want, e.g.:
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
```

Notes about the `npm install` failure:
- The CLI failed with "Cannot read properties of null (reading 'location')". This is an npm runtime error unrelated to the code I changed. Try cleaning the npm cache:
```bash
npm cache clean --force
npm install
```
If the problem persists, try using a different Node/npm version or run `npm install` on another machine.

If you want, I can continue by:
- debugging the `npm install` error here, or
- generating more UI components manually to match shadcn shapes.
