// Brand design tokens - single source of truth for all color values.
export const C = {
  // Backgrounds — warm pink tones matching logo
  cream:       '#FFF0F5',  // soft pink — main bg
  creamAlt:    '#FCE4EF',  // lighter pink — alt section bg
  creamDeep:   '#F8BBD9',  // medium pink — accent bg
  // Primary brand — soft indigo (replaces harsh navy)
  plum:        '#5C6BC0',  // soft indigo — footer, buttons
  plumHover:   '#3949AB',  // deeper indigo — hover
  // CTA / accent — vivid magenta matching logo
  rose:        '#D81B8C',  // vibrant magenta — CTAs, accents, headings
  roseHover:   '#AD1457',  // darker magenta — hover
  accent:      '#9C27B0',  // purple — butterfly/decorative
  gold:        '#8D6E63',  // warm brown-gold — dividers
  // Text
  textHeading: '#3949AB',  // indigo — headings (good contrast on white/pink)
  textDark:    '#3949AB',  // indigo — primary text
  textMid:     '#5C4A6E',  // soft purple-gray — secondary text
  textLight:   '#8D6E63',  // warm gold — light labels
  // Structural
  border:      '#F8BBD9',  // soft pink border
  borderLight: '#FCE4EF',  // lightest pink border
} as const;
