# NoomaLooma Play Log - Engineering Specifications

## Project Architecture

### Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Styled Components
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
- Hand-drawn scribble animation on page load (3-frame animation)
- Squiggle ripple effect on tap (3 frames radiating out)
- Large, colorful, always visible
- CSS-only animations for performance

**Animation Frames**:
- Frame 1: Initial scribble appearance
- Frame 2: Scribble completion
- Frame 3: Settled state
- Ripple: 3 expanding squiggle rings

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
- Divs that bump around each other
- Staggered appearance animation
- Touch-friendly selection
- Stretch goal: Draggable clouds
- Pre-defined options with custom input option

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
- Mood-based organization
- AI-generated insights
- Mind map-style visualization
- Swipe interactions for navigation
- Surprise revelations about play patterns

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
- Color-coded by mood
- Emoji and text display
- Timestamp formatting
- Touch interactions

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
- Clear visual indication of current view

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
- CSS-only animations (no JavaScript)
- Transform and opacity changes only
- Reduced motion support
- Mobile-optimized frame rates

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
