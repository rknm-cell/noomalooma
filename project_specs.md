# NoomaLooma Play Log - Project Specifications

## Project Overview
**Option B: Logging + Personal Play Log**
A mobile-first web app for capturing daily play moments and reflecting on personal play patterns.

## Core Features

### 1. Play Moment Logging
- **Big Play Button**: Hero element with scribble animation on page load
- **Squiggle Ripple Effect**: Animation reaction on every interaction
- **Floating Selection Clouds**: Emojis, colors, and moods as floating bubbles
- **Quick Capture**: Low-friction logging during busy moments
- **Custom Options**: Ability to add custom emojis/moods beyond pre-selected options

### 2. Personal Play Log (Spotify Wrapped Style)
- **Mood-based Organization**: Group moments by emotional state
- **Play Style Insights**: "Your play style is..." personality revelations
- **Surprise & Delight**: Unexpected discoveries about personal patterns
- **Visual Statistics**: Big numbers, simple charts, card-based layout

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
- **Frontend**: React/Next.js (existing setup)
- **Storage**: Local Storage (no backend required)
- **Animations**: CSS-only (no external libraries)
- **Styling**: CSS Grid/Flexbox for responsive design

## Design Principles

### Visual Style
- **Playful & Colorful**: Vibrant, joyful interface
- **Simple & Clean**: Minimal complexity, maximum delight
- **Mobile-First**: Touch-friendly, responsive design
- **Visually Cohesive**: Consistent design language throughout

### User Experience
- **Low-Friction Logging**: Capture moments without disrupting play
- **Instant Gratification**: Immediate visual feedback on interactions
- **Surprise Discovery**: Unexpected insights about personal patterns
- **Emotional Connection**: Interface that sparks joy

## Implementation Strategy

### Time Allocation (6 Hours Total)
- **2 hours**: Core logging interface + animations
- **2 hours**: Personal play log views + Spotify-style insights
- **1 hour**: Data structure + local storage implementation
- **1 hour**: Polish, responsive design, and demo data

### High-Impact Features
- Big play button with scribble animation
- Floating selection clouds for quick input
- Spotify Wrapped-style lookback experience
- Local storage for data persistence
- Mobile-first responsive design

### Features to Skip (Time Constraints)
- User authentication
- Real-time features
- Complex data visualization
- Backend integration
- Advanced animation libraries

## User Flow

### Logging Flow
1. User sees big play button with scribble animation
2. Tap button → squiggle ripple effect
3. Floating clouds appear (emojis, colors, moods)
4. Quick selection or custom input
5. Text input for play moment description
6. Save with visual celebration

### Reflection Flow
1. Access personal play log
2. Browse mood-based organization
3. Discover play style insights
4. Surprise revelations about patterns
5. Visual statistics and trends

## Success Metrics
- **Delight**: Interface that sparks joy and feels playful
- **Function**: Smooth logging and meaningful insights
- **Velocity**: Working prototype within 6-hour constraint
- **Cohesion**: Visually consistent and polished experience

## Demo Requirements
- Working prototype deployed and accessible
- Mock data for demonstration
- Mobile-responsive design
- Smooth animations and interactions
- Personal play style insights generation
