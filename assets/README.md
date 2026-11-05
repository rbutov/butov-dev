# butov.dev brand assets

The `[b]` mark: JetBrains Mono ExtraBold `b` in square brackets, 69% of the tile, tile corner radius 22.5%. Black and white only. Text in every file is outlined, so no font is needed.

## svg/

- `icon-dark.svg`, `icon-light.svg` — icon on a rounded tile (dark tile for light backgrounds, light tile for dark ones)
- `icon-dark-square.svg`, `icon-light-square.svg` — full-bleed square tile, for app icons that the OS masks
- `icon-maskable.svg` — mark scaled to the Android safe zone
- `icon-dark-16px.svg`, `icon-light-16px.svg` — pixel-aligned version for 16 px
- `mark-black.svg`, `mark-white.svg`, `mark-currentcolor.svg` — mark without a tile
- `logo-horizontal-on-light.svg`, `logo-horizontal-on-dark.svg` — icon + butov.dev
- `logo-stacked-on-light.svg`, `logo-stacked-on-dark.svg` — icon above butov.dev
- `wordmark-black.svg`, `wordmark-white.svg` — butov.dev only
- `favicon.svg` — follows the browser's light/dark setting
- `og-image-dark.svg`, `og-image-light.svg` — 1200×630 link preview

## png/

- `icon-dark-*.png`, `icon-light-*.png` — 16, 32, 48, 64, 96, 128, 180, 192, 256, 512, 1024 px
- `logo-horizontal-on-*-{32,64,128,256}h.png`, `logo-stacked-on-*-512h.png`, `mark-*-512h.png`
- `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-*.png`, `icon-maskable-512.png`
- `og-image-dark.png`, `og-image-light.png`

## Rules

- Dark icon on light backgrounds, light icon on dark backgrounds.
- Clear space around the logo: at least ¼ of the icon height.
- Minimum size: icon 16 px (use the 16 px file), horizontal logo 24 px tall.
- Don't recolour, stretch, or add shadows or outlines.

The site uses copies in `public/` (favicons) and `public/brand/`.
