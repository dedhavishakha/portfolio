// Palettes offered by the dev-only switcher. The colours themselves live in
// palettes.css; swatches are listed dominant (60) → secondary (30) → accent (10).
//
// Not in use right now — the site runs on the monochrome :root colours. To
// bring them back, render <PaletteSwitcher /> in App.jsx (and set
// data-palette="…" on <html> in index.html to pick one for the live site).
export const palettes = [
  { id: 'lavender', name: 'Silver · Lavender · Mocha', swatches: ['#E5E4E2', '#E6E0F0', '#6F4E37'] },
  { id: 'burgundy', name: 'Cream · Latte · Burgundy', swatches: ['#EBDCC6', '#B7A89A', '#722F37'] },
  { id: 'wine', name: 'Cream · Sage Grey · Burgundy', swatches: ['#E8D2B5', '#A5A79B', '#590907'] },
  { id: 'sage', name: 'Sage · Concrete · Amber', swatches: ['#9CAF88', '#A7A7A7', '#CC5500'] },
  { id: 'orchid', name: 'Eggplant · Orchid · Orange', swatches: ['#400849', '#E7B0DE', '#FF5A0A'] },
  { id: 'obsidian', name: 'Obsidian · Chrome · Crimson', swatches: ['#080808', '#CDCBCA', '#D41514'] },
  { id: 'cobalt', name: 'Obsidian · Cobalt · Crimson', swatches: ['#01000C', '#0002CC', '#BF032F'] },
  { id: 'steel', name: 'Charcoal · Steel · Coral', swatches: ['#17191C', '#929DA7', '#FF4B32'] },
  { id: 'lime', name: 'Midnight · Cobalt · Lime', swatches: ['#030407', '#1558C9', '#D4FF24'] },
  { id: 'champagne', name: 'Mocha · Champagne · Amber (original)', swatches: ['#5B4632', '#F4D9A0', '#C8792C'] },
]

export const defaultPalette = 'lavender'
