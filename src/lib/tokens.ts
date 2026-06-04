// Brand design tokens - single source of truth for all color values.
export const C = {
  // Backgrounds
  cream:       '#FFF0F5',  // soft pink - main bg
  creamAlt:    '#F3E5F5',  // light purple - alt section bg
  creamDeep:   '#E1BEE7',  // medium purple - accent bg
  // Primary brand colors
  plum:        '#1A237E',  // navy blue - footer, buttons, headings
  plumHover:   '#0D1757',  // darker navy
  // Accent / CTA
  rose:        '#C2185B',  // deep magenta - CTAs, accents
  roseHover:   '#880E4F',  // darker magenta - hover
  accent:      '#9C27B0',  // purple - butterfly/decorative
  gold:        '#8D6E63',  // warm brown-gold - dividers
  // Text
  textHeading: '#1A237E',  // navy
  textDark:    '#1A237E',  // navy
  textMid:     '#5C4A6E',  // soft purple-gray
  textLight:   '#8D6E63',  // warm gold
  // Structural
  border:      '#E1BEE7',  // light purple border
  borderLight: '#F3E5F5',  // lightest purple border
} as const;
