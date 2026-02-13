# AGENTS.md

## Project Overview

This is a static personal portfolio website for Osamah Al-Saleh, a Lead QA Automation Engineer. The site is built with vanilla HTML, CSS, and JavaScript - no build tools or frameworks.

## Project Structure

```
Professional Profile/
├── index.html          # Main HTML page (all content sections)
├── styles.css          # CSS styles with CSS variables for theming
├── script.js           # JavaScript for interactivity
├── profile_avatar.png  # Profile image
└── Profile.pdf         # Resume PDF
```

## Commands

Since this is a static website without a build system:

### Local Development
- Open `index.html` directly in a browser
- Or serve with a simple HTTP server:
  ```bash
  # Python 3
  python -m http.server 8000
  
  # Node.js (if npx is available)
  npx serve .
  
  # PHP
  php -S localhost:8000
  ```

### Validation (Optional)
```bash
# Validate HTML (requires html-validate)
npx html-validate index.html

# Validate CSS (requires stylelint)
npx stylelint styles.css
```

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements (`<section>`, `<nav>`, `<header>`, `<footer>`)
- All sections must have an `id` attribute for navigation
- Include proper `meta` tags for SEO and accessibility
- Use double quotes for attributes
- Indent with 4 spaces
- Close all tags (no self-closing shortcuts)

### CSS
- Use CSS custom properties (variables) defined in `:root`
- Follow the existing color palette using CSS variables
- Use BEM-like naming: `.block__element--modifier`
- Mobile-first responsive design with breakpoints at 1024px, 768px, and 480px
- Indent with 4 spaces
- Group related properties together
- Use `var()` for all colors, spacing, and transitions

### JavaScript
- Use vanilla JavaScript (no frameworks)
- Use `const` and `let` (no `var`)
- Use modern ES6+ features (arrow functions, template literals, optional chaining)
- Comment complex logic or animations
- Use semantic variable names
- Indent with 4 spaces
- Prefer `document.querySelector` over `getElementById` for consistency
- Debounce scroll events for performance

## Naming Conventions

- **CSS Classes**: kebab-case (`.nav-menu`, `.hero-content`)
- **JavaScript Variables**: camelCase (`navMenu`, `scrollPosition`)
- **IDs**: kebab-case matching section names (`#home`, `#experience`)
- **CSS Variables**: `--category-name` (`--color-primary`, `--spacing-lg`)

## Design System

### Colors
- Primary: `#8b5cf6` (purple) - use `var(--color-primary)`
- Secondary: `#3b82f6` (blue) - use `var(--color-secondary)`
- Accent: `#06b6d4` (cyan) - use `var(--color-accent)`
- Background: Dark theme (`#0f172a`, `#1e293b`)
- Text: Light colors on dark background

### Typography
- Font family: Inter (Google Fonts)
- Use CSS variables for font sizes: `--font-size-sm` to `--font-size-6xl`

### Spacing
- Use CSS variables: `--spacing-xs` (0.5rem) to `--spacing-3xl` (6rem)

### Components
- **Glass Cards**: Use `.glass-card` class for translucent cards
- **Buttons**: `.btn` base with `.btn-primary` or `.btn-secondary` variants
- **Timeline**: Use `.timeline` structure for experience section

## Error Handling

- Wrap clipboard operations in try-catch
- Use optional chaining (`?.`) when accessing potentially null DOM elements
- Log errors to console for debugging

## Accessibility

- Include `aria-label` attributes on icon-only links
- Ensure sufficient color contrast
- Support keyboard navigation
- Use semantic HTML elements

## Performance

- Images should be optimized
- Use lazy loading for images below the fold
- Debounce scroll and resize event handlers
- Minimize reflows/repaints

## Git Workflow

- Make small, focused commits
- Use descriptive commit messages
- Test in multiple browsers before committing
