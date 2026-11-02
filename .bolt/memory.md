# Project memory

## Product intent & audience

- WordPress plugin with an admin page and a Gutenberg block, built using `@wordpress/build` (`wp-build`).
- Admin page lets user write/save a greeting message; block displays that saved message on the frontend.
- Audience: site admins who configure the message; site visitors who see it via the block.

## Brand personality & voice

- Assistant communicates in Italian (user writes in Italian).
- Tone: practical, concise, transparent about limitations and assumptions.

## Visual design & UX direction

- No explicit design direction given yet.
- Admin page: simple settings form (textarea/input for the message, save button).
- Gutenberg block: renders saved message; block UI minimal/not specified.

## Decisions, constraints & rationale

- Plugin created at `wordpress-plugin/greeting-plugin/`.
- Uses `@wordpress/build` (`wp-build`) tooling; config in `package.json`, page entries in `routes/`.
- Admin page placed under Aspetto (Appearance) menu.
- Greeting message stored in WordPress options table (not Supabase) — plugin runs inside WP.
- All block files (`block.json`, `render.php`, JS source) consolidated under `packages/greeting-block/`; old `blocks/` folder removed; plugin main file paths updated accordingly.
- Build not executed; not tested in WordPress.
- `wp-build` pages system is experimental; requires WordPress 7.0+ or Gutenberg plugin.
- Generated asset filenames/paths are assumptions to verify after `npm install` and `npm run build`.

## Open questions & assumptions

- Exact generated build filenames/paths need verification after build.
- Whether `wp-build` experimental routing is stable enough for production use.
- No explicit visual/design preferences given; defaults assumed.
- PHP/WordPress version target beyond the 7.0+ requirement noted.