# Design Reference

## Visual Design Guidelines

Since this is a coding exercise focused on implementation skills, we're providing design specifications in text format rather than a pixel-perfect mockup. This allows you to demonstrate your ability to translate design requirements into code.

### Layout Structure

```
┌─────────────────────────────────────────────────┐
│  Header                                         │
│  Tech Store                                     │
│  Find your perfect tech product                 │
├─────────────────────────────────────────────────┤
│  Filters                                        │
│  [Search...] [Category ▼] [Sort ▼] (X results)  │
├─────────────────────────────────────────────────┤
│  Products Grid (Responsive)                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │ Image    │ │ Image    │ │ Image    │         │
│  │ Name     │ │ Name     │ │ Name     │         │
│  │ [Cat]    │ │ [Cat]    │ │ [Cat]    │         │
│  │ $999     │ │ $1299    │ │ $599     │         │
│  │ ★★★★☆    │ │ ★★★★★    │ │ ★★★★☆    │         │
│  │ In Stock │ │ Low Stock│ │ In Stock │         │
│  └──────────┘ └──────────┘ └──────────┘         │
│  (more cards...)                                │
└─────────────────────────────────────────────────┘
```

### Product Card Details

Each product card should include:

1. **Product Image**
   - Full width of card
   - Aspect ratio: 3:2
   - Border radius on top corners
   - Alt text for accessibility

2. **Product Name**
   - Font size: 18px
   - Font weight: 600 (semi-bold)
   - Color: #1e293b
   - Margin bottom: 8px

3. **Category Badge**
   - Small pill-shaped badge
   - Background: #e0e7ff (light indigo)
   - Color: #6366f1 (indigo)
   - Padding: 4px 12px
   - Border radius: 12px
   - Font size: 12px

4. **Price**
   - Font size: 20px
   - Font weight: 700 (bold)
   - Color: #1e293b
   - Format: $X,XXX.XX

5. **Rating**
   - Display as stars (★★★★☆)
   - Full star: ★ (#fbbf24 - amber)
   - Empty star: ☆ (#e5e7eb - gray)
   - Font size: 16px

6. **Stock Status**
   - Font size: 14px
   - In Stock: #10b981 (green)
   - Low Stock: #f59e0b (amber)
   - Out of Stock: #ef4444 (red)

### Filter Section

1. **Search Input**
   - Width: 300px (desktop), 100% (mobile)
   - Height: 40px
   - Border: 1px solid #e2e8f0
   - Border radius: 8px
   - Padding: 10px 16px
   - Placeholder: "Search products..."
   - Clear button (×) appears when text is entered

2. **Dropdowns**
   - Width: 180px
   - Height: 40px
   - Border: 1px solid #e2e8f0
   - Border radius: 8px
   - Padding: 10px 16px
   - Background: white

3. **Results Count**
   - Font size: 14px
   - Color: #64748b
   - Format: "Showing X products"

### Responsive Grid

- **Mobile** (< 640px): 1 column, full width
- **Tablet** (640px - 1024px): 2 columns
- **Desktop** (> 1024px): 3 columns
- **Grid gap**: 24px

### Hover & Focus States

1. **Product Card Hover**
   - Transform: translateY(-4px)
   - Box shadow: 0 4px 12px rgba(0,0,0,0.15)
   - Transition: all 0.3s ease

2. **Button/Input Focus**
   - Outline: 2px solid #6366f1
   - Outline offset: 2px

### Transitions

- Product cards: 0.3s ease on hover
- Filter changes: 0.2s fade in/out
- All transitions should be smooth and subtle

### Accessibility Reminders

- Use semantic HTML (`<header>`, `<main>`, `<section>`, `<article>`)
- Add `aria-label` to filter controls
- Ensure keyboard navigation works for all interactive elements
- Add `role="status"` to results count for screen readers
- Images must have descriptive alt text
- Focus indicators must be visible

## Color Palette

```css
/* Primary */
--primary: #6366f1;
--primary-light: #e0e7ff;

/* Backgrounds */
--bg-main: #f8fafc;
--bg-card: #ffffff;

/* Text */
--text-primary: #1e293b;
--text-secondary: #64748b;

/* Borders */
--border: #e2e8f0;

/* Status colors */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;

/* Rating */
--star-filled: #fbbf24;
--star-empty: #e5e7eb;
```

## Implementation Tips

1. Build mobile-first, then add responsive breakpoints
2. Use CSS Grid for the product grid layout
3. Use Flexbox for card internal layout
4. Add smooth transitions for better UX
5. Test keyboard navigation thoroughly
6. Ensure color contrast meets WCAG AA standards
