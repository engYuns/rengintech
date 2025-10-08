# Rengin Tech Agency Website - Design Guidelines

## Design Approach

**Selected Approach:** Reference-Based with Creative Portfolio Focus

Drawing inspiration from leading creative agencies (Awwwards winners, Dribbble showcases) combined with Stripe's refined professionalism. This approach emphasizes visual impact while maintaining credibility for a tech agency.

**Core Principles:**
- Bold visual presence that commands attention at events
- Professional polish that builds trust with potential clients
- Smooth, purposeful animations that enhance rather than distract
- Portfolio-first mentality showcasing work quality

---

## Color Palette

**Primary Colors:**
- Deep Navy: 220 85% 12% (authority, professionalism)
- Electric Blue: 210 100% 55% (innovation, tech-forward)

**Accent Colors:**
- Vibrant Cyan: 185 85% 50% (energy, creativity)
- Soft Purple: 270 60% 65% (premium services)

**Neutrals:**
- Dark Mode Background: 220 20% 8%
- Card Background: 220 15% 12%
- Text Primary: 0 0% 98%
- Text Secondary: 220 10% 70%

---

## Typography

**Font Families:**
- Headlines: Inter (700-800 weight) - modern, professional
- Body: Inter (400-500 weight) - excellent readability
- Accent/Stats: Space Grotesk (600 weight) - distinctive touch

**Scale:**
- Hero Headline: text-6xl lg:text-7xl (bold 800)
- Section Headers: text-4xl lg:text-5xl (bold 700)
- Service Titles: text-2xl lg:text-3xl (semibold 600)
- Body Text: text-base lg:text-lg (regular 400)
- Small Text: text-sm (medium 500)

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 4, 8, 12, 16, 20, 24 for consistent rhythm

**Container Strategy:**
- Full-width sections with inner max-w-7xl
- Content sections: max-w-6xl
- Text-heavy content: max-w-4xl

**Vertical Rhythm:**
- Section padding: py-16 md:py-24 lg:py-32
- Component spacing: space-y-12 md:space-y-16
- Card spacing: gap-8 md:gap-12

---

## Hero Section

**Layout:** Full-viewport impact hero (min-h-screen) with gradient overlay

**Structure:**
- Large hero image showcasing tech/creative work (blurred, with dark overlay 40% opacity)
- Centered headline: "Transform Your Digital Presence" with animated gradient text effect
- Subheadline highlighting "15+ Projects Delivered | 8 Expert Team Members | 3 Years Excellence"
- Dual CTA: Primary "View Our Work" + outline "Get Started" (with backdrop blur)
- Floating stat cards (animated on scroll): Projects, Clients, Team size
- Subtle scroll indicator at bottom

---

## Services Section

**Layout:** 3-column grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)

**Each Service Card:**
- Icon at top (Font Awesome icons, size-8)
- Service name as headline
- Brief 2-line description
- Hover effect: lift transform with glow shadow
- Background: semi-transparent card with border
- Smooth transition on all states

**Services to Feature:**
1. Social Media Management (icon: chart-line)
2. Website Development (icon: code)
3. Graphic Design (icon: palette)
4. Motion Graphics (icon: video)
5. Video & Photo Graphics (icon: camera)
6. Digital Marketing (icon: bullhorn)

---

## Portfolio/Clients Section

**Layout:** Masonry-style grid (grid-cols-2 md:grid-cols-3 lg:grid-cols-4) with staggered heights

**Project Cards:**
- Client logo (contained, centered)
- Project thumbnail/preview
- Overlay on hover with project name and category
- Click expands to modal with full case study
- Smooth scale and opacity transitions

**Featured Projects Display:**
- Highlight 3-4 major projects in larger cards above main grid
- Include project metrics (results, timeline)

---

## Reviews/Testimonials Section

**Layout:** Horizontal scroll carousel with 3 visible cards on desktop, 1 on mobile

**Review Cards:**
- 5-star rating system (gold stars, filled based on rating)
- Quote text in larger, styled typography
- Client name and company
- Profile image placeholder or initial circle
- Card background with subtle gradient border
- Auto-scroll animation (pausable on hover)

---

## Contact & Booking Section

**Layout:** 2-column split (form left, info right)

**Contact Form:**
- Name, Email, Phone, Service selection dropdown
- Message/Project details textarea
- "Request Consultation" CTA button
- Animated input focus states with border glow

**Contact Information Panel:**
- All phone numbers listed with click-to-call
- Email with icon
- Instagram handle with link
- Business hours
- Decorative gradient background accent

---

## Footer

**Comprehensive Footer Design:**
- 4-column grid: About, Services Quick Links, Contact, Social
- About column: Brief company description, years of experience
- Newsletter signup with email input
- Social media icons (Instagram prominent)
- Copyright and trust badges area
- Background: darker than main with subtle texture

---

## Component Library

**Buttons:**
- Primary: Solid electric blue with white text, hover lift + brighten
- Secondary: Outline cyan with hover fill transition
- Ghost: Text only with underline animation

**Cards:**
- Default: backdrop-blur with border and subtle shadow
- Hover: enhanced shadow, slight scale (transform scale-105)
- Padding: p-8 for comfortable spacing

**Icons:**
- Source: Font Awesome (CDN)
- Size: Consistent w-8 h-8 for section icons, w-6 h-6 for inline
- Color: Match accent colors per section theme

---

## Animations (Purposeful & Smooth)

**Entry Animations:**
- Fade up on scroll for sections (opacity + translateY)
- Stagger children for card grids (delay increments)

**Interaction Animations:**
- Button hover: scale-105 + shadow enhancement
- Card hover: translateY(-4px) + enhanced glow
- Service icons: gentle pulse on hover

**Micro-interactions:**
- Form input focus: border width + color transition
- Star rating: fill animation on click
- Navigation: smooth underline slide

**Performance:**
- Use transform and opacity only (GPU accelerated)
- Reduce motion for accessibility
- Duration: 200-300ms for snappy feel

---

## Images Strategy

**Large Hero Image:** Yes - full-width hero showcasing creative/tech work with dark gradient overlay

**Additional Images:**
- Service section icons (Font Awesome, not images)
- Portfolio client logos (actual client logos)
- Project thumbnails in portfolio grid
- Team section: Professional team photo or individual headshots in grid
- About section: Office/workspace lifestyle imagery

**Image Treatment:**
- Hero: Blur + dark overlay for text contrast
- Portfolio: Sharp, high-quality project screenshots
- Overlay gradient on all decorative images
- Lazy loading for performance

---

## Admin Panel Design Note

Admin interface should maintain brand colors but prioritize functionality with clear table layouts, action buttons, and form inputs. Use same typography and spacing system for consistency.