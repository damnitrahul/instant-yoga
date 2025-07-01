# Yoga Pose Finder App - PRD & TRD

## Product Requirements Document (PRD)

### 1. Product Overview

**Product Name**: Instant Yoga Pose Finder  
**Product Type**: Web Application (Next.js)  
**Target Users**: Yoga practitioners, fitness enthusiasts, beginners to experts

### 2. Product Vision

Create a simple, minimal yoga pose discovery app that helps users find yoga poses based on their preferences and skill level, with an intuitive interface for both random discovery and comprehensive browsing.

### 3. Core Features

#### 3.1 Header Component

- **Logo**: Generic yoga-themed logo centered in header
- **Filters Drawer**: Located in top-right corner
  - Filter by Category (12 categories available)
  - Filter by Difficulty (Beginner, Intermediate, Expert)
  - Save filter preferences to localStorage
  - Persistent filter state across sessions

#### 3.2 Navigation

Two main pages accessible via navigation:

1. **Random Page** (Primary/Default)
2. **All Poses Page**

#### 3.3 Random Page Features

- Display one random yoga pose from filtered dataset
- Pose Information Display:
  - Pose name (English and Sanskrit)
  - SVG image of the pose
  - Difficulty level badge
  - Category tags
  - Pose description
  - Benefits
- **Re-roll Button**: Generate new random pose
- Respect active filters when generating random poses

#### 3.4 All Poses Page Features

- Grid layout displaying all poses as cards
- Each card shows:
  - Pose name
  - Thumbnail image
  - Difficulty badge
  - Category tags
- Clickable cards leading to detailed view
- Detailed view includes:
  - All pose information (same as random page)
  - "View All" button to return to grid

#### 3.5 Footer

- Simple footer with credit: "Created by damnitrahul"

### 4. Data Structure Requirements

Based on yoga_database.json:

- **Total Poses**: 48 poses
- **Categories**: 12 categories (Core, Seated, Strengthening, etc.)
- **Difficulties**: 3 levels (Beginner, Intermediate, Expert)
- **Pose Data**: English name, Sanskrit name, description, benefits, images, categories, difficulties

### 5. UI/UX Requirements

- **Design Philosophy**: Simple and minimal
- **CSS Framework**: Tailwind CSS exclusively
- **Theme**: Minimal Tailwind theme with clean typography
- **Responsive**: Mobile-first responsive design
- **Performance**: Fast loading, optimized images

---

## Technical Requirements Document (TRD)

### 1. Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Data Storage**: Local JSON file + localStorage for filters
- **Deployment**: Ready for Vercel/Netlify deployment

### 2. Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Random page)
│   ├── all/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── FilterDrawer.tsx
│   ├── PoseCard.tsx
│   ├── PoseDetail.tsx
│   ├── RandomPose.tsx
│   └── Footer.tsx
├── types/
│   └── yoga.ts
├── utils/
│   ├── yogaData.ts
│   ├── filterUtils.ts
│   └── localStorage.ts
└── data/
    └── yoga_database.json
```

### 3. Data Types (TypeScript)

```typescript
interface YogaCategory {
  id: number;
  name: string;
  description: string;
}

interface YogaDifficulty {
  id: number;
  level: string;
}

interface YogaPose {
  id: number;
  english_name: string;
  sanskrit_name_adapted: string;
  sanskrit_name: string;
  translation_name: string;
  description: string;
  benefits: string;
  images: {
    svg: string;
    png: string;
    svg_alt: string;
  };
  categories: YogaCategory[];
  difficulties: YogaDifficulty[];
}

interface YogaDatabase {
  metadata: {
    total_poses: number;
    total_categories: number;
    total_difficulties: number;
    description: string;
  };
  categories: YogaCategory[];
  difficulties: YogaDifficulty[];
  poses: YogaPose[];
}

interface FilterState {
  categories: number[];
  difficulties: number[];
}
```

### 4. Component Specifications

#### 4.1 Header Component

```typescript
interface HeaderProps {
  onFilterChange: (filters: FilterState) => void;
  currentFilters: FilterState;
}
```

- Responsive header with centered logo
- Filter drawer toggle button (hamburger/filter icon)
- Sticky positioning

#### 4.2 FilterDrawer Component

```typescript
interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: YogaCategory[];
  difficulties: YogaDifficulty[];
}
```

- Slide-out drawer from right
- Checkbox groups for categories and difficulties
- Clear filters option
- Apply/Save functionality with localStorage sync

#### 4.3 RandomPose Component

```typescript
interface RandomPoseProps {
  poses: YogaPose[];
  filters: FilterState;
}
```

- Display single pose with full details
- Re-roll button functionality
- Filtered random selection logic

#### 4.4 PoseCard Component

```typescript
interface PoseCardProps {
  pose: YogaPose;
  onClick: (poseId: number) => void;
}
```

- Card layout with image, name, difficulty, categories
- Hover effects and click handling

#### 4.5 PoseDetail Component

```typescript
interface PoseDetailProps {
  pose: YogaPose;
  showBackButton?: boolean;
}
```

- Full pose information display
- Reusable for both random and detail pages

### 5. Page Specifications

#### 5.1 Root Page (app/page.tsx) - Random Page

- Default landing page
- Implements RandomPose component
- Filter integration
- Server-side data loading

#### 5.2 All Poses Page (app/all/page.tsx)

- Grid layout of pose cards
- Filter integration
- Search functionality (optional enhancement)
- Pagination (if needed for performance)

#### 5.3 Pose Detail Page (app/all/[id]/page.tsx)

- Dynamic route for individual pose details
- Back navigation to all poses
- Same layout as random pose display

### 6. Utility Functions

#### 6.1 Data Management

```typescript
// utils/yogaData.ts
export const getYogaData = (): YogaDatabase;
export const getPoseById = (id: number): YogaPose | undefined;
export const getFilteredPoses = (poses: YogaPose[], filters: FilterState): YogaPose[];
export const getRandomPose = (poses: YogaPose[]): YogaPose;
```

#### 6.2 Filter Management

```typescript
// utils/filterUtils.ts
export const applyFilters = (poses: YogaPose[], filters: FilterState): YogaPose[];
export const getDefaultFilters = (): FilterState;
```

#### 6.3 localStorage Management

```typescript
// utils/localStorage.ts
export const saveFilters = (filters: FilterState): void;
export const loadFilters = (): FilterState;
```

### 7. Styling Guidelines

#### 7.1 Tailwind Configuration

- Use default Tailwind theme with minimal customizations
- Focus on clean, readable typography
- Consistent spacing using Tailwind spacing scale
- Neutral color palette (grays, whites, subtle accents)

#### 7.2 Component Styling Standards

- **Cards**: Rounded corners, subtle shadows, hover effects
- **Buttons**: Consistent padding, clear hover states
- **Typography**: Clear hierarchy with appropriate font sizes
- **Layout**: Grid and flexbox for responsive layouts
- **Color Scheme**: Light theme with good contrast ratios

### 8. Performance Requirements

- Initial page load < 2 seconds
- Optimized images (use Next.js Image component)
- Lazy loading for pose cards
- Efficient filtering algorithms
- Minimal JavaScript bundle size

### 9. Responsive Design Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

### 10. Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 11. Development Guidelines

- Use TypeScript strict mode
- Implement proper error handling
- Add loading states for data fetching
- Use Next.js best practices (App Router)
- Implement proper SEO meta tags
- Ensure accessibility (ARIA labels, keyboard navigation)

### 12. Testing Requirements

- Component unit tests (optional but recommended)
- Cross-browser testing
- Mobile responsiveness testing
- Filter functionality testing
- Local storage persistence testing

### 13. Deployment Configuration

- Environment variables for any external services
- Build optimization for production
- Static file optimization
- SEO configuration (metadata, sitemap)

### 14. Future Enhancement Considerations

- Search functionality
- Favorites/bookmarking system
- Pose sequences/flows
- Social sharing features
- Dark mode toggle
- Progressive Web App (PWA) features

This PRD/TRD provides comprehensive guidance for implementing the yoga pose finder app while maintaining simplicity and focusing on core user needs.
