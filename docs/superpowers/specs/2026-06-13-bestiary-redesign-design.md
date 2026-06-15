# Bestiary Redesign Design

## Goal

Rework the bestiary tab so weapons are always visible and card selection feels like a proper collection screen.

## Layout

Use a three-column layout inside the existing settings screen:

- Left rail: category buttons for enemies, weapons, evolutions, and functional weapons.
- Center: paged card grid with real sprites, hover/selected states, and dark silhouette treatment for locked entries.
- Right panel: selected-entry detail view with large artwork, bilingual names when available, tags, stats, descriptions, and evolution recipes.

## Data

Create a small pure model module that builds bestiary entries from `ENEMIES`, `WEAPON_DEFS`, and `EVOLUTION_DEFS`. The renderer consumes these entries instead of manually assembling enemy and weapon sections inline.

## Interaction

Clicking a category resets the page and selects that category's first entry. Clicking a card selects it. Previous/next controls page through oversized categories. Keyboard/wheel support can reuse the same page helper without changing the data model.

## Testing

Add model-level tests that prove all normal weapons, evolved weapons, and functional weapons are represented, paginated, and connected to sprite ids.
