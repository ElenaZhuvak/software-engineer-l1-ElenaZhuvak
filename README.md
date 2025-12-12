# 🛍️ SoftwareEngineer-L1: Interactive Product Filter

Build an **interactive product filtering interface** using vanilla HTML, CSS, and JavaScript.
The repo contains:

* **Product data** (`data.json`) with 20 tech products
* **Design specification** with exact requirements
* **Starter files** (`index.html`, `styles.css`, `script.js`)
* **Automated tests** to verify your implementation

> **Time box:** **2 hours**
> **Plan:** ~15m reading + ~90m implementation + ~15m testing
> **Focus:** Clean code, accessibility, and attention to detail

---

## 📝 What to build

Build a product listing page with real-time filtering, search, and sorting capabilities.

### Core Requirements

| Category | Requirement |
|----------|-------------|
| **Search** | Filter products by name/description as user types (case-insensitive, debounced 300ms) |
| **Category Filter** | Dropdown to filter by category (All, Laptops, Phones, Tablets, Accessories) |
| **Price Sort** | Dropdown to sort by price (Low to High, High to Low, Featured) |
| **Display** | Show product cards in a responsive grid (1 col mobile, 2 col tablet, 3 col desktop) |
| **No Results** | Display friendly message when no products match filters |
| **Accessibility** | Keyboard navigable, semantic HTML, ARIA labels, screen-reader friendly |

### Product Card Design

Each product card must display:
- Product image (with alt text)
- Product name
- Category badge
- Price (formatted as currency)
- Rating (stars out of 5)
- Stock status indicator (In Stock / Low Stock / Out of Stock)

### Interaction Requirements

1. **Search input**:
   - Updates results as user types (300ms debounce)
   - Has clear/reset button (×) when text is entered
   - Shows count of filtered results

2. **Filters**:
   - All filters work together (search + category + sort)
   - URL updates with current filter state (bonus)
   - Filters persist on page reload (bonus)

3. **Visual feedback**:
   - Loading states during search
   - Smooth transitions when filtering (fade in/out)
   - Hover states on interactive elements
   - Focus indicators for keyboard navigation

### Design Specifications

**Colors:**
- Primary: `#6366f1` (indigo)
- Background: `#f8fafc` (light gray)
- Card background: `#ffffff`
- Text primary: `#1e293b`
- Text secondary: `#64748b`
- Border: `#e2e8f0`

**Typography:**
- Font: System font stack
- Product name: 18px, semi-bold
- Price: 20px, bold
- Body text: 14px

**Spacing:**
- Card padding: 20px
- Grid gap: 24px
- Border radius: 12px
- Card shadow: `0 1px 3px rgba(0,0,0,0.1)`

**Responsive breakpoints:**
- Mobile: < 640px (1 column)
- Tablet: 640px - 1024px (2 columns)
- Desktop: > 1024px (3 columns)

---

## 🏁 Getting started

1. Click the assignment link and **accept** the exercise

2. Clone your private repository:

```bash
git clone <your-assignment-repo-url>
cd software-engineer-l1-<your-github-handle>
```

3. **IMPORTANT:** Read the requirements BEFORE installing dependencies
   - Review this README
   - Check `design/reference.md` for design specs
   - Look at `data.json` to understand the data
   - Understand the evaluation criteria
   - **Plan your approach**

4. **When ready to start the 2-hour timer, install dependencies:**

```bash
npm install
```

⏰ **This automatically creates a timestamp and STARTS YOUR TIMER!**

The `postinstall` script will:
- Create `.assessment-start-time` file
- Auto-commit it to git
- Display your official start time

5. **Push the timestamp commit immediately:**

```bash
git push
```

6. Start the development server:

```bash
npm run dev
```

This will open your browser at `http://localhost:3000`

7. Start implementing in the provided starter files:
   - `index.html` - HTML structure
   - `styles.css` - Styling
   - `script.js` - JavaScript functionality

---

## 🗂️ Repo layout

```
├── START.md             ← Delete this to start the timer!
├── index.html           ← HTML structure (update this)
├── styles.css           ← Your styles (update this)
├── script.js            ← Your JavaScript (update this)
├── data.json            ← Product data (don't modify)
├── package.json         ← Dependencies and scripts
├── vite.config.js       ← Dev server configuration
├── tests/
│   ├── test.html        ← Visual test runner
│   ├── tests.js         ← Automated test suite
│   ├── run-tests.js     ← Headless test runner
│   └── validate.js      ← Code validation
└── design/
    └── reference.md     ← Design specifications
```

---

## ✅ Running tests

### Option 1: Command Line (Recommended)

Run all tests automatically:

```bash
npm test
```

This will:
- Validate your code structure
- Run automated tests in headless browser
- Check for console errors
- Display detailed results

### Option 2: Visual Test Runner

Open `tests/test.html` in your browser while `npm run dev` is running:

```bash
# In one terminal
npm run dev

# Open in browser: http://localhost:3000/tests/test.html
```

The tests verify:
- Product data loads correctly
- Search functionality works
- Category filtering works
- Price sorting works
- Combined filters work together
- Accessibility attributes present
- No console errors

**All tests must pass for submission.**

---

## 🎯 Evaluation Criteria

You'll be evaluated on:

1. **Functionality** (40%):
   - All filters work correctly
   - Search is debounced and responsive
   - Multiple filters work together
   - Edge cases handled (no results, empty search, etc.)

2. **Code Quality** (25%):
   - Clean, readable code
   - Proper variable naming
   - Good code organization
   - No unnecessary complexity

3. **Design Implementation** (20%):
   - Matches design specifications
   - Responsive on all screen sizes
   - Smooth interactions and transitions
   - Attention to detail (spacing, colors, typography)

4. **Accessibility** (15%):
   - Semantic HTML
   - Keyboard navigation works
   - ARIA labels where appropriate
   - Screen reader friendly
   - Focus indicators visible

---

## 💡 Tips

* **Start with HTML structure** - Get the semantic markup right first
* **Use the provided data** - Fetch from `data.json`, don't hardcode
* **Test as you go** - Run the automated tests frequently
* **Mobile-first CSS** - Start with mobile styles, add breakpoints for larger screens
* **Debounce search** - Don't filter on every keystroke, wait 300ms
* **Console is your friend** - Check for errors regularly
* **Commit often** - Make small, incremental commits

---

## ⏱️ Time Management

**Suggested breakdown:**

- **0-15 min**: Read requirements, review data structure, plan approach
- **15-45 min**: HTML structure and basic CSS layout
- **45-90 min**: JavaScript functionality (load data, filters, search, sort)
- **90-105 min**: Polish (transitions, responsive design, accessibility)
- **105-120 min**: Run tests, fix bugs, final review

---

## 🚫 Constraints

- **Vanilla JavaScript only** - No frameworks or libraries (except for testing)
- **Modern browsers** - You can use ES6+ features
- **No external CSS frameworks** - Write your own CSS (Tailwind, Bootstrap, etc. not allowed)
- **Don't modify** `data.json` or test files

---

## 📤 Submission

1. Ensure all tests pass:

```bash
npm test
```

2. Build the project (optional, to verify no build errors):

```bash
npm run build
```

3. Commit your changes:

```bash
git add .
git commit -m "Complete product filter implementation"
git push origin main
```

4. Verify your repository is pushed and tests pass in GitHub Actions

**⚠️ Important:** The time is measured from when you run `npm install` (which creates `.assessment-start-time`) to your final commit. Submissions with commits beyond the 2-hour window (plus 10 min grace period) will be flagged for review.

---

Good luck! 🚀
