# NoomaLooma Play Log - Project Specifications

## Project Overview
**Option B: Logging + Personal Play Log**
A mobile-first web app for capturing daily play moments with physics-based interactive emoji selection.

## Core Features

### 1. Play Moment Logging
- **Big Play Button**: Hero element with scribble animation on page load
- **Squiggle Ripple Effect**: Animation reaction on every interaction
- **Physics-Based Emojis**: 8 large bouncing emojis (64px) with collision detection
- **Draggable Interface**: Emojis can be dragged around the viewport
- **Quick Capture**: Low-friction logging with scattered, organic interface

### 2. Page-Based Navigation
- **Home Page**: Animated title with play button
- **Log Page**: Dedicated logging interface with physics emojis
- **Simple Navigation**: Back button and tap-outside-to-cancel
- **Persistent Storage**: LocalStorage integration for play moments

## Technical Architecture

### Data Structure
```javascript
{
  id: string,
  timestamp: Date,
  text: string,
  emoji: string,
  color: string,
  mood: string,
  tags: string[]
}
```

### Technology Stack
- **Frontend**: React/Next.js with App Router
- **Storage**: Browser LocalStorage
- **Animations**: Framer Motion for physics and interactions
- **Styling**: Tailwind CSS with custom design system
- **Physics**: Custom collision detection and bouncing algorithms

## Design Principles

### Visual Style
- **Playful & Colorful**: Vibrant, joyful interface with randomized colors
- **Simple & Clean**: Minimal complexity, maximum delight
- **2D Design**: Flat design with no drop shadows or 3D effects
- **Physics-Based**: Interactive bouncing and draggable elements
- **Mobile-First**: Touch-friendly, responsive design
- **Scattered Interface**: Organic, carefree layout with floating elements

### User Experience
- **Low-Friction Logging**: Capture moments without disrupting play
- **Instant Gratification**: Immediate visual feedback on interactions
- **Surprise Discovery**: Unexpected insights about personal patterns
- **Emotional Connection**: Interface that sparks joy

## Implementation Strategy

### Time Allocation (6 Hours Total)
- **2 hours**: Core logging interface + physics animations ✅
- **2 hours**: Draggable interactions + collision physics ✅
- **1 hour**: Page navigation + local storage ✅
- **1 hour**: Polish, responsive design, and testing

### High-Impact Features
- Big play button with scribble animation ✅
- Physics-based bouncing emoji selection ✅
- Draggable emoji interactions ✅
- Page-based navigation system ✅
- Local storage for data persistence ✅
- Mobile-first responsive design ✅

### Features to Skip (Time Constraints)
- User authentication
- Real-time features
- Complex data visualization
- Backend integration
- AI-generated insights
- Personal play log views

## User Flow

### Logging Flow
1. User sees big play button with scribble animation
2. Tap button → navigate to `/log` page
3. Physics-based emojis bouncing around viewport
4. Drag emojis or click to select
5. Text input for play moment description
6. Save with localStorage persistence
7. Navigate back to home page

### Interaction Flow
1. Emojis bounce with physics simulation
2. Collision detection prevents sticking
3. Drag functionality with velocity transfer
4. Visual feedback on hover and selection
5. Responsive boundaries match viewport size

## Success Metrics
- **Delight**: Interface that sparks joy and feels playful ✅
- **Function**: Smooth logging with physics interactions ✅
- **Velocity**: Working prototype within 6-hour constraint ✅
- **Cohesion**: Visually consistent and polished experience ✅

## Demo Requirements
- Working prototype deployed and accessible
- Physics-based emoji interactions
- Mobile-responsive design ✅
- Smooth animations and interactions ✅
- Local storage persistence ✅
- Page-based navigation ✅
