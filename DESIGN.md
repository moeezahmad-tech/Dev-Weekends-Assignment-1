---
name: Warm Epicurean
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#5b403e'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#8f706c'
  outline-variant: '#e3beba'
  surface-tint: '#b81e22'
  primary: '#a60c17'
  on-primary: '#ffffff'
  primary-container: '#c92c2c'
  on-primary-container: '#ffe6e3'
  inverse-primary: '#ffb3ac'
  secondary: '#655c5d'
  on-secondary: '#ffffff'
  secondary-container: '#e9dddd'
  on-secondary-container: '#696061'
  tertiary: '#55524c'
  on-tertiary: '#ffffff'
  tertiary-container: '#6d6a64'
  on-tertiary-container: '#f1ebe3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb3ac'
  on-primary-fixed: '#410003'
  on-primary-fixed-variant: '#930010'
  secondary-fixed: '#ece0e0'
  secondary-fixed-dim: '#d0c4c4'
  on-secondary-fixed: '#201a1a'
  on-secondary-fixed-variant: '#4d4545'
  tertiary-fixed: '#e7e2da'
  tertiary-fixed-dim: '#cbc6be'
  on-tertiary-fixed: '#1d1b17'
  on-tertiary-fixed-variant: '#494641'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-x: 32px
  card-padding: 20px
---

## Brand & Style

The brand personality of the design system is approachable, appetizing, and vibrant. It targets a modern audience looking for comfort and convenience without sacrificing quality. The UI evokes a sense of warmth and reliability through a balanced mix of soft, playful organic shapes and a disciplined, professional layout.

The design style is **Corporate Modern with Tactile Accents**. It utilizes high-quality "floating" food photography against soft, tinted background containers to create a sense of depth and freshness. The interface is clean and functional, ensuring that the product imagery remains the primary focus while supporting the user journey with friendly, rounded UI elements.

## Colors

The color palette is built on a "Warm Glow" foundation, designed to stimulate appetite and provide a welcoming atmosphere.

- **Primary (C92C2C):** A deep, energetic red used for calls to action, price points, and active states. It provides high contrast against soft backgrounds.
- **Secondary (FDF0F0):** A soft, blush pink used primarily for card backgrounds and container surfaces to differentiate product categories without the harshness of pure white.
- **Tertiary (FFF9F1):** A creamy vanilla tone used for page-level backgrounds and subtle section separators, reinforcing the warm, culinary theme.
- **Neutral (1A1A1A):** A soft charcoal black used for primary typography to ensure maximum readability while appearing less sterile than pure black.

## Typography

This design system utilizes **Plus Jakarta Sans** across all levels to maintain a friendly and contemporary feel. The typography hierarchy relies on significant weight variations (ExtraBold for headlines vs. Regular for body) to create a clear informational structure.

Headlines should use tight letter-spacing to feel impactful and "editorial." Body text uses a generous line height (1.5x - 1.6x) to ensure legibility during long browsing sessions. Color-wise, use the Primary Red sparingly for key emphasis words within headlines to draw the eye to core value propositions.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop, centering content within a 1280px container to maintain focus. 

- **Grid System:** A 12-column grid is used for desktop, transitioning to a 2-column or 1-column stack on mobile.
- **Rhythm:** An 8px base unit drives all spacing.
- **Card Layout:** Product grids should feature 24px gutters. Cards themselves use a 20px internal padding to ensure "breathing room" for the food imagery and text elements.
- **Responsive Behavior:** On mobile devices, side margins reduce to 16px, and large display imagery (like hero sections) should scale proportionally while maintaining their rounded corner ratios.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layering** and **Soft Shadows**.

- **Surface Strategy:** Backgrounds are flat (Cream or White), while interactive cards use a slightly different tint (Pink) to distinguish them.
- **Floating Imagery:** Food items are often isolated with transparent backgrounds (PNGs) and placed atop colored containers. To create the "floating" effect, use a very soft, low-opacity ambient shadow (`rgba(0,0,0,0.08)`) with a high blur radius (20-30px) beneath the food items, but not the containers themselves.
- **Interactive Elevation:** Buttons and cards should feature a subtle lift on hover, increasing shadow spread to signal interactivity.

## Shapes

The shape language is defined by "Organic Friendliness." Hard corners are avoided to keep the brand feeling soft and approachable.

- **Standard Radius:** 16px (1rem) for product cards and primary containers.
- **Large Radius:** 24px (1.5rem) for hero image containers and large section blocks.
- **Component Radius:** Buttons and input fields should utilize a 12px radius to balance the larger cards.
- **Iconography:** Icons should be rounded and use a medium stroke weight (2px) to match the typography's visual weight.

## Components

### Buttons
- **Primary:** Solid Red background with White text. Bold weight. 12px rounded corners.
- **Icon Buttons:** Small Red circles or squares with 8px radius for quick actions like "Add to Cart."

### Product Cards
- **Structure:** A vertical stack. Top half features a high-quality "floating" food image. Bottom half contains the title, 5-star rating (in Yellow/Orange), a short description in grey, and the price in Primary Red.
- **Background:** Usually Secondary Pink or White.

### Input Fields
- **Search Bar:** Large, rounded (pill-shaped or 12px), with a subtle grey border or light grey background. Placeholder text should be in a muted neutral.

### Chips & Badges
- Used for categories (e.g., "Fast Delivery," "Trending"). Use a light cream background with primary red text or borders to distinguish them without adding visual weight.

### Featured Banners
- Large, high-contrast imagery with rounded corners. Use "Buy 1 Get 1" style callouts in bold white text directly over the image to create an urgent, promotional feel.