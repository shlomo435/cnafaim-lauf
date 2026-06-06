// Brand design tokens - single source of truth for all color values.

// Shared literal constants to avoid duplicating the same hex in multiple tokens.
const INDIGO_600 = '#3949AB' as const;   // plumHover = textHeading = textDark
const MAGENTA    = '#D81B8C' as const;   // rose (CTA, accents)

export const C = {
  // Backgrounds — warm pink tones matching logo
  cream:       '#FFF0F5',
  creamAlt:    '#FCE4EF',
  creamDeep:   '#F8BBD9',
  // Primary brand — soft indigo
  plum:        '#5C6BC0',
  plumHover:   INDIGO_600,
  // CTA / accent — vivid magenta
  rose:        MAGENTA,
  roseHover:   '#AD1457',
  accent:      '#9C27B0',
  gold:        '#8D6E63',
  // Text — all three map to the same indigo for consistent body/heading colour
  textHeading: INDIGO_600,
  textDark:    INDIGO_600,
  textMid:     '#5C4A6E',
  textLight:   '#8D6E63',
  // Structural
  border:      '#F8BBD9',
  borderLight: '#FCE4EF',
} as const;
