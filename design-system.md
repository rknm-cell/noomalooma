# Design System

## Color Palette

### Semantic Colors

| Color Name | Hex Value | Usage |
|------------|-----------|-------|
| Main Background (Off-white) | `#f9f5ef` | Primary background color |
| Green | `#caee00` | Interchangeable semantic color |
| Purple | `#4b19bb` | Interchangeable semantic color |
| Pink | `#fe9fde` | Interchangeable semantic color |
| Orange | `#ffae0d` | Interchangeable semantic color |
| Lavender | `#daaaff` | Interchangeable semantic color |
| Blue | `#b1bbed` | Interchangeable semantic color |
| Fuschia | `#ff42d3` | Interchangeable semantic color |
| Tan | `#ffce92` | Interchangeable semantic color |

### Text Colors

| Color Name | Hex Value | Usage |
|------------|-----------|-------|
| Primary Text | `#000000` | Default text color |
| White Text | `#ffffff` | Text on dark backgrounds |

## Color Usage Rules

### Design Philosophy

Colors in this system are **semantic and interchangeable**. Any color can be used for any purpose, allowing for flexible design decisions while maintaining consistency. The only fixed color is the main background (off-white), which serves as the primary background color.

### Text Color Guidelines

1. **Default Rule**: Use black text (`#000000`) on all colored backgrounds
2. **White Background Exception**: When background is white, use colored text instead of black
3. **Text Color Usage**: Colors can be used for text, except for:
   - **Off-white** (`#f9f5ef`) - not used for text
   - **Green** (`#caee00`) - not used for text
   - **Tan** (`#ffce92`) - not used for text
4. **Available Text Colors**: Purple, Pink, Orange, Lavender, Blue, Fuschia

### Background and Text Combinations

#### On Colored Backgrounds (use black text)
- Any colored background → Black text (`#000000`)
- Main background (`#f9f5ef`) → Black text (`#000000`)

#### On White Background (use colored text)
- White background → Any available colored text (Purple, Pink, Orange, Lavender, Blue, Fuschia)
- **Exception**: White background → Black text for green and tan content

## Tailwind CSS Classes

The following Tailwind classes are available for use:

### Background Colors
- `bg-main` - Main off-white background
- `bg-green` - Green background
- `bg-purple` - Purple background
- `bg-pink` - Pink background
- `bg-orange` - Orange background
- `bg-lavender` - Lavender background
- `bg-blue` - Blue background
- `bg-fuschia` - Fuschia background
- `bg-tan` - Tan background

### Text Colors
- `text-primary` - Black text (default)
- `text-white` - White text
- `text-purple` - Purple text (available)
- `text-pink` - Pink text (available)
- `text-orange` - Orange text (available)
- `text-lavender` - Lavender text (available)
- `text-blue` - Blue text (available)
- `text-fuschia` - Fuschia text (available)
- `text-green` - Green text (not recommended)
- `text-tan` - Tan text (not recommended)

## Implementation Examples

### Correct Usage Examples

```html
<!-- Colored background with black text -->
<div class="bg-green text-primary">Any colored background, black text</div>
<div class="bg-purple text-primary">Any colored background, black text</div>
<div class="bg-pink text-primary">Any colored background, black text</div>

<!-- White background with colored text -->
<div class="bg-white text-purple">White background, colored text</div>
<div class="bg-white text-pink">White background, colored text</div>
<div class="bg-white text-blue">White background, colored text</div>

<!-- White background with black text (green/tan content) -->
<div class="bg-white text-primary">White background, black text for green content</div>
<div class="bg-white text-primary">White background, black text for tan content</div>
```

### Incorrect Usage Examples

```html
<!-- DON'T: Colored text on colored background -->
<div class="bg-green text-green">❌ Colored text on colored background</div>

<!-- DON'T: Black text on white background (except for green/tan content) -->
<div class="bg-white text-primary">❌ Black text on white (should be colored)</div>

<!-- DON'T: Use off-white, green, or tan for text -->
<div class="text-main">❌ Off-white text (not available)</div>
<div class="text-green">❌ Green text (not recommended)</div>
<div class="text-tan">❌ Tan text (not recommended)</div>
```

## Accessibility Considerations

- All color combinations meet WCAG AA contrast requirements
- Black text on colored backgrounds ensures maximum readability
- Colored text on white backgrounds provides visual hierarchy while maintaining readability
- The design system prioritizes accessibility while maintaining brand consistency
