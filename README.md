# butov.dev

Ruslan Butov's profile at [butov.dev](https://butov.dev), built with Next.js,
React, TypeScript and Tailwind CSS. The site exports static HTML and runs on
Vercel without a backend, environment variables or server functions.

## Development

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Before publishing:

```sh
npm run lint
npm run typecheck
npm run build
```

The production files are written to `out/`. To preview the export locally,
run `npx serve out` after building.

## Deployment

The Vercel project imports `rbutov/butov-dev` from GitHub with the Next.js
framework preset and repository root as its root directory. Pushes to `main`
deploy production; pull requests receive preview deployments. No deployment
secrets are needed in GitHub Actions. CI checks lint, types and the static build.

The profile content lives in `src/app/page.tsx`; its frame, theme switch and
styles live alongside it and in `src/styles/globals.css`.

Split Guru's website is maintained separately in
[`rbutov/split-guru`](https://github.com/rbutov/split-guru/tree/main/apps/web).

## License

This project is open source and available under the [MIT License](LICENSE).
