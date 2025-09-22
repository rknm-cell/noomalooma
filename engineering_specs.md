# NoomaLooma Play Log - Engineering Specifications

## Project Architecture

### Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Styled Components
- **Animations**: Framer Motion
- **State Management**: React useState/useEffect
- **AI Insights**: Vercel AI SDK
- **Deployment**: Vercel
- **Storage**: Browser Local Storage

### Project Structure
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Logging View)
│   ├── play-log/
│   │   └── page.tsx (Personal Play Log View)
│   └── globals.css
├── components/
│   ├── PlayButton/
│   │   ├── index.tsx
│   │   └── PlayButton.styles.ts
│   ├── FloatingClouds/
│   │   ├── index.tsx
│   │   └── FloatingClouds.styles.ts
│   ├── PlayLogView/
│   │   ├── index.tsx
│   │   └── PlayLogView.styles.ts
│   ├── MomentCard/
│   │   ├── index.tsx
│   │   └── MomentCard.styles.ts
│   └── Navigation/
│       ├── index.tsx
│       └── Navigation.styles.ts
├── hooks/
│   ├── useLocalStorage.ts
│   └── usePlayMoments.ts
├── utils/
│   ├── storage.ts
│   ├── mockData.ts
│   └── insights.ts
└── types/
    └── playMoment.ts
```

## Data Structure

### PlayMoment Type
```typescript
interface PlayMoment {
  id: string;
  timestamp: Date;
  text: string;
  emoji: string;
  color: string;
  mood: string;
  tags: string[];
}
```

### Local Storage Structure
```typescript
// Key: 'noomalooma-play-moments'
// Value: { [date: string]: PlayMoment[] }
// Example: { '2024-01-15': [moment1, moment2], '2024-01-16': [moment3] }
```

## Component Specifications

### 1. PlayButton Component
**Purpose**: Main hero button with scribble animation and ripple effect

**Props**:
```typescript
interface PlayButtonProps {
  onClick: () => void;
  isAnimating?: boolean;
}
```

**Features**:
- Hand-drawn scribble animation on page load using Framer Motion
- Squiggle ripple effect on tap with motion.div
- Large, colorful, always visible
- Smooth spring animations for natural feel

**Framer Motion Animations**:
- Initial scribble: `initial={{ pathLength: 0 }}` → `animate={{ pathLength: 1 }}`
- Ripple effect: `animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 0] }}`
- Hover states: `whileHover={{ scale: 1.05 }}`
- Tap feedback: `whileTap={{ scale: 0.95 }}`

### 2. FloatingClouds Component
**Purpose**: Emoji, color, and mood selection interface

**Props**:
```typescript
interface FloatingCloudsProps {
  onSelect: (type: 'emoji' | 'color' | 'mood', value: string) => void;
  isVisible: boolean;
}
```

**Features**:
- Divs that bump around each other using Framer Motion
- Staggered appearance animation with `staggerChildren`
- Touch-friendly selection with `whileTap` animations
- Draggable clouds using `drag` prop
- Pre-defined options with custom input option
- Spring physics for natural movement

**Framer Motion Animations**:
- Staggered entrance: `staggerChildren: 0.1`
- Bump animation: `animate={{ x: [0, 10, -5, 0], y: [0, -5, 10, 0] }}`
- Selection feedback: `whileTap={{ scale: 0.9, rotate: 5 }}`
- Drag constraints: `drag dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}`

**Cloud Types**:
- Emojis: 😊 🤪 😌 ✨ 🎉 🎨 🎭 🎪
- Colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD']
- Moods: ['Joyful', 'Silly', 'Calm', 'Energetic', 'Creative', 'Playful']

### 3. PlayLogView Component
**Purpose**: Spotify Wrapped-style personal play log

**Props**:
```typescript
interface PlayLogViewProps {
  moments: PlayMoment[];
}
```

**Features**:
- Mood-based organization with smooth transitions
- AI-generated insights with reveal animations
- Mind map-style visualization using Framer Motion
- Swipe interactions for navigation with `drag` gestures
- Surprise revelations about play patterns with staggered reveals

**Framer Motion Animations**:
- Page transitions: `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`
- Insight reveals: `staggerChildren: 0.2` for sequential appearance
- Swipe navigation: `drag="x"` with `dragConstraints`
- Mind map connections: `animate={{ pathLength: 1 }}` for drawing lines

### 4. MomentCard Component
**Purpose**: Individual play moment display

**Props**:
```typescript
interface MomentCardProps {
  moment: PlayMoment;
  onClick?: () => void;
}
```

**Features**:
- Color-coded by mood with smooth color transitions
- Emoji and text display with entrance animations
- Timestamp formatting
- Touch interactions with hover/tap feedback

**Framer Motion Animations**:
- Card entrance: `initial={{ opacity: 0, scale: 0.9 }}` → `animate={{ opacity: 1, scale: 1 }}`
- Hover effect: `whileHover={{ y: -5, scale: 1.02 }}`
- Tap feedback: `whileTap={{ scale: 0.98 }}`
- Color transitions: `animate={{ backgroundColor: moodColor }}`

### 5. Navigation Component
**Purpose**: Simple navigation between views

**Props**:
```typescript
interface NavigationProps {
  currentView: 'logging' | 'play-log';
  onNavigate: (view: 'logging' | 'play-log') => void;
}
```

**Features**:
- Two main buttons: "Log Play" and "My Play Log"
- No traditional navbar
- Clear visual indication of current view with smooth transitions

**Framer Motion Animations**:
- Button hover: `whileHover={{ scale: 1.05 }}`
- Active state: `animate={{ backgroundColor: activeColor }}`
- Page transitions: `AnimatePresence` for smooth view changes

## Hooks & Utilities

### useLocalStorage Hook
```typescript
const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Implementation for local storage with React state sync
}
```

### usePlayMoments Hook
```typescript
const usePlayMoments = () => {
  // CRUD operations for play moments
  // Date-based organization
  // Local storage integration
}
```

### Storage Utils
```typescript
// storage.ts
export const savePlayMoment = (moment: PlayMoment) => void;
export const getPlayMoments = (date?: string) => PlayMoment[];
export const getPlayMomentsByMood = (mood: string) => PlayMoment[];
```

### Mock Data Generator
```typescript
// mockData.ts
export const generateMockData = () => PlayMoment[];
// Generates 1 week of sample data
// Various moods, times, and play types
```

### AI Insights Generator
```typescript
// insights.ts
export const generatePlayStyleInsights = (moments: PlayMoment[]) => Promise<string[]>;
// Uses Vercel AI SDK
// Generates personality insights
// Mind map-style connections
```

## Responsive Design

### Breakpoints
- Mobile: 320px - 768px (primary)
- Tablet: 768px - 1024px
- Desktop: 1024px+

### Touch Interactions
- **Tap**: Primary selection and navigation
- **Swipe**: Navigate between moments in play log
- **Long Press**: (Stretch goal) Drag floating clouds

## AI Integration

### Vercel AI SDK Setup
```typescript
// For generating play style insights
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

const generateInsights = async (moments: PlayMoment[]) => {
  // Analyze patterns in play moments
  // Generate personality insights
  // Create mind map connections
}
```

### Insight Types
- Time-based patterns ("You're a morning player")
- Mood analysis ("You love silly moments")
- Frequency insights ("You play most on Tuesdays")
- Creative connections ("You're drawn to artistic play")

## Performance Considerations

### Animation Performance
- Framer Motion with optimized animations
- Transform and opacity changes for 60fps
- Reduced motion support with `prefers-reduced-motion`
- Mobile-optimized spring physics
- `layout` prop for automatic layout animations

### Data Management
- Local storage with JSON serialization
- Efficient date-based organization
- Minimal re-renders with React optimization

## Deployment Configuration

### Vercel Setup
- Next.js App Router configuration
- Environment variables for AI SDK
- Mobile-first responsive design
- Performance optimization

### Environment Variables
```
OPENAI_API_KEY=your_openai_key
```

### Package Dependencies
```json
{
  "dependencies": {
    "framer-motion": "^10.16.0",
    "styled-components": "^6.1.0",
    "ai": "^2.2.0",
    "@ai-sdk/openai": "^0.0.0"
  }
}
```

## Development Timeline

### Phase 1 (2 hours): Core Logging Interface
- PlayButton component with animations
- FloatingClouds component
- Basic navigation
- Local storage setup

### Phase 2 (2 hours): Personal Play Log
- PlayLogView component
- MomentCard component
- AI insights integration
- Mock data generation

### Phase 3 (1 hour): Data & Storage
- useLocalStorage hook
- usePlayMoments hook
- Storage utilities
- Date organization

### Phase 4 (1 hour): Polish & Deploy
- Responsive design
- Performance optimization
- Vercel deployment
- Final testing

## Success Criteria
- Smooth animations on mobile devices
- Intuitive navigation between views
- Meaningful AI-generated insights
- Visually cohesive design
- Working local storage
- Deployed and accessible prototype
