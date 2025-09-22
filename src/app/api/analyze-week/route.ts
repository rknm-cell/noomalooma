import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { env } from '~/env.js';
import { type PlayMoment } from '~/types/playMoment';

interface AnalysisInsights {
  summary: string;
  patterns: Array<{
    title: string;
    description: string;
    emoji: string;
  }>;
  personality: {
    title: string;
    description: string;
    emoji: string;
  };
  recommendations: string[];
  funFact: string;
}


interface RequestBody {
  moments: PlayMoment[];
}

// Helper function to get most common mood
function getMostCommonMood(moments: PlayMoment[]): string {
  const moodCounts: Record<string, number> = {};
  moments.forEach(moment => {
    moodCounts[moment.mood] = (moodCounts[moment.mood] ?? 0) + 1;
  });
  
  const mostCommonMood = Object.entries(moodCounts).reduce((a, b) => 
    (moodCounts[a[0]] ?? 0) > (moodCounts[b[0]] ?? 0) ? a : b
  );
  
  return mostCommonMood[0] ?? 'Unknown';
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json() as RequestBody;
    const { moments } = body;

    if (!moments || moments.length === 0) {
      return Response.json({ error: 'No moments provided' }, { status: 400 });
    }

    // Filter moments from the last 7 days
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const weeklyMoments = moments.filter(moment => 
      new Date(moment.timestamp) >= oneWeekAgo
    );

    // Check if OpenAI API key is available, provide fallback analysis if not
    if (!env.OPENAI_API_KEY) {
      // Provide a simple fallback analysis
      // Simple profile detection based on available data
      const getSimpleProfile = (moments: PlayMoment[]) => {
        if (moments.length === 0) return null;
        
        const emojis = moments.map(m => m.emoji);
        const times = moments.map(m => new Date(m.timestamp).getHours());
        
        // Simple heuristics for profile detection
        const hasCreativeEmojis = emojis.some(e => ['🎨', '🖌️', '✨', '🌈', '💡', '🎭', '📸', '✏️'].includes(e));
        const hasNatureEmojis = emojis.some(e => ['🌱', '🌸', '☀️', '🌊', '🍃', '👃', '👂'].includes(e));
        const hasMagicalEmojis = emojis.some(e => ['✨', '🌙', '🦄', '🪐', '🌌', '💫', '🧚'].includes(e));
        const hasThoughtfulEmojis = emojis.some(e => ['🤔', '📚', '🧩', '♟️', '🔍', '💭', '🌿', '☕'].includes(e));
        const hasSpontaneousEmojis = emojis.some(e => ['🎲', '🎪', '🚀', '⚡', '🎉', '🌟', '🎯', '🎮'].includes(e));
        
        const isEveningPlayer = times.filter(t => t >= 18 || t <= 6).length > times.length / 2;
        const isMorningPlayer = times.filter(t => t >= 6 && t <= 12).length > times.length / 2;
        const isConsistent = moments.length >= 5; // 5+ moments suggests consistency
        
        if (hasCreativeEmojis && isEveningPlayer) return { title: "The Creative Explorer", emoji: "🎨", desc: "You find joy in bringing ideas to life through artistic expression" };
        if (hasNatureEmojis && isConsistent) return { title: "The Present Moment Seeker", emoji: "🧘", desc: "You've mastered the art of being fully present in simple moments" };
        if (hasMagicalEmojis && isEveningPlayer) return { title: "The Imaginative Dreamer", emoji: "✨", desc: "You transform ordinary moments into magical experiences" };
        if (hasThoughtfulEmojis && isMorningPlayer) return { title: "The Thoughtful Contemplator", emoji: "🤔", desc: "You choose activities that engage your mind and create space for deep thinking" };
        if (hasSpontaneousEmojis) return { title: "The Spontaneous Adventurer", emoji: "🎲", desc: "You're energized by the unexpected and find play in moments others might miss" };
        
        return { title: "The Joy Collector", emoji: "✨", desc: "You see play everywhere and aren't afraid to capture it" };
      };

      const profile = getSimpleProfile(weeklyMoments);
      
      const fallbackInsights: AnalysisInsights = {
        summary: weeklyMoments.length > 0 
          ? `You're a ${profile?.title ?? 'Playful Person'} who found magic in ${weeklyMoments.length} moments this week! 🎉`
          : "You're ready to discover your play personality - let's start logging those moments!",
        patterns: weeklyMoments.length > 0 ? [
          {
            title: "Your Play Count",
            description: `${weeklyMoments.length} moments of pure joy captured`,
            emoji: "🎯"
          },
          {
            title: "Your Signature Vibe",
            description: `You were feeling ${getMostCommonMood(weeklyMoments).toLowerCase()} most of the time`,
            emoji: "😊"
          }
        ] : [],
        personality: {
          title: profile?.title ?? "The Play Explorer",
          description: profile?.desc ?? "Ready to discover the playful side of everyday life",
          emoji: profile?.emoji ?? "🔍"
        },
        recommendations: weeklyMoments.length > 0 ? [
          "Keep exploring your unique play style",
          "Try logging one tiny moment of play each day"
        ] : [
          "Start with one tiny moment of play today",
          "Turn your coffee break into a mini adventure"
        ],
        funFact: weeklyMoments.length > 0 
          ? "You're building a treasure chest of happy memories!"
          : "Every play moment is a small act of rebellion against boring adulthood!"
      };
      
      return Response.json({ insights: fallbackInsights });
    }

    if (weeklyMoments.length === 0) {
      const emptyWeekInsights: AnalysisInsights = {
        summary: "You're about to discover your play personality! 🎭",
        patterns: [],
        personality: {
          title: "The Play Explorer",
          description: "Ready to uncover which of the 5 play profiles matches your unique style",
          emoji: "🔍"
        },
        recommendations: [
          "Start with one tiny moment of play today", 
          "Try different play styles to discover your profile"
        ],
        funFact: "Your first play moment will reveal whether you're a Creative Explorer, Present Moment Seeker, or one of the other amazing play types!"
      };
      
      return Response.json({ insights: emptyWeekInsights });
    }

    // Prepare data for AI analysis
    const momentsData = weeklyMoments.map(moment => ({
      text: moment.text,
      emoji: moment.emoji,
      mood: moment.mood,
      color: moment.color,
      timestamp: moment.timestamp,
      tags: moment.tags
    }));

    const prompt = `You're creating a Spotify Wrapped-style analysis for someone's week of play moments. Use the detailed play profiles below to identify their specific play personality type and create personalized insights.

Play Moments Data:
${JSON.stringify(momentsData, null, 2)}

Play Profile Reference:
1. The Creative Explorer 🎨 - Purple/orange/pink colors, weekend/evening activity, artistic emojis, creative bursts
2. The Thoughtful Contemplator 🤔 - Blue/green colors, morning/evening activity, introspective emojis, consistent patterns
3. The Present Moment Seeker 🧘 - Green/earth tones, consistent daily activity, nature/sensory emojis, mindful presence
4. The Spontaneous Adventurer 🎲 - Bright contrasting colors, random timing, excitement emojis, unpredictable patterns
5. The Imaginative Dreamer ✨ - Purple/silver/gold colors, evening/weekend activity, magical emojis, fantasy focus

Analyze their data to determine their primary play profile and create insights based on:
- Timing patterns (morning/evening/weekend consistency)
- Color psychology (warm/cool/earth/bright/pastel dominance)
- Emoji sentiment (creative/thoughtful/present/spontaneous/imaginative)
- Activity variety and clustering patterns
- Consistency vs spontaneity

Please provide a JSON response with this exact structure:
{
  "summary": "A personalized summary like 'You're a Creative Explorer who...' or 'This week you proved you're a Present Moment Seeker by...'",
  "patterns": [
    {
      "title": "Specific insight title (like 'Your Creative Peak' or 'Consistency Champion')",
      "description": "Personalized insight based on their actual data patterns",
      "emoji": "relevant emoji"
    }
  ],
  "personality": {
    "title": "Their specific play profile name (e.g., 'The Creative Explorer' or 'The Present Moment Seeker')",
    "description": "Personalized description based on their actual patterns and the profile characteristics",
    "emoji": "profile emoji"
  },
  "recommendations": [
    "Specific recommendation based on their profile type",
    "Another personalized suggestion for their play style"
  ],
  "funFact": "A surprising, specific observation about their unique play patterns"
}`;

    const result = await generateText({
      model: openai('gpt-4o'),
      prompt,
      temperature: 0.8,
    });

    // Parse the AI response
    let insights: AnalysisInsights;
    try {
      const parsedResponse = JSON.parse(result.text) as AnalysisInsights;
      insights = parsedResponse;
    } catch {
      // Fallback if JSON parsing fails
      insights = {
        summary: "You're definitely a playful person! 🎉",
        patterns: [],
        personality: {
          title: "The Joy Seeker",
          description: "You find magic in the smallest moments and bring light to everyday life",
          emoji: "✨"
        },
        recommendations: [
          "Keep capturing those playful moments!", 
          "Try exploring different play profiles to find your perfect match"
        ],
        funFact: "Your playfulness is contagious - you're inspiring others to find joy too!"
      };
    }

    return Response.json({ insights });

  } catch (error) {
    console.error('Error analyzing play moments:', error);
    return Response.json(
      { error: 'Failed to analyze play moments' },
      { status: 500 }
    );
  }
}
