// Brand design tokens - single source of truth for all color values.
// 60/30/10 palette: Soft Mint / Deep Teal / Gentle Turquoise
export const C = {
  // 60% - Soft Mint backgrounds
  cream:       '#F0FDFA',
  creamAlt:    '#E6FFFA',
  creamDeep:   '#CCFBF1',
  // 30% - Deep Teal (headlines, buttons, footer)
  plum:        '#134E4A',
  plumHover:   '#0F3D39',
  // 10% - Gentle Turquoise (icons, active links, accents)
  rose:        '#2DD4BF',
  roseHover:   '#14B8A6',
  // Text
  textHeading: '#111827',
  textDark:    '#111827',
  textMid:     '#374151',
  textLight:   '#6B7280',
  // Structural
  border:      '#CCFBF1',
  borderLight: '#E6FFFA',
} as const;
