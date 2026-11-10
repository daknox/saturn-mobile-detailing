# Style variants (experiments)

Keep experiments here so the brand kit itself stays untouched.

One folder per idea, e.g. `variants/neon-red/`, `variants/clean-light/`:

```
variants/<name>/
  theme.css     ← overrides ONLY the semantic tokens from tokens/tokens.css (--bg, --fg, --accent, fonts, radius)
  notes.md      ← what you're trying, which logo set/lockup it uses, screenshots if any
```

Rules for every variant:
- Don't edit `--saturn-red`, `--saturn-white`, `--saturn-charcoal` — those are the brand.
- Use logos straight from `logos/<theme>/` — never recolor or redraw them.
- Pick the logo set that matches the variant's background (`dark` for charcoal, `light` for off-white, `red` for red).

When one wins, move its `theme.css` values into `tokens/tokens.css` (or a new `[data-theme="..."]` block) and note it in `BRAND.md`.
