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
      const fallbackInsights: AnalysisInsights = {
        summary: weeklyMoments.length > 0 
          ? `You're the kind of person who finds magic in ${weeklyMoments.length} moments this week! 🎉`
          : "You're ready to discover your play personality - let's start logging those moments!",
        patterns: weeklyMoments.length > 0 ? [
          {
            title: "Your Play Count",
            description: `${weeklyMoments.length} moments of pure joy captured`,
            emoji: "🎯"
          },
          {
            title: "Your Vibe",
            description: `You were feeling ${getMostCommonMood(weeklyMoments).toLowerCase()} most of the time`,
            emoji: "😊"
          }
        ] : [],
        personality: {
          title: weeklyMoments.length > 0 ? "The Joy Collector" : "The Play Explorer",
          description: weeklyMoments.length > 0 
            ? "You see play everywhere and aren't afraid to capture it"
            : "Ready to discover the playful side of everyday life",
          emoji: "✨"
        },
        recommendations: [
          "Try logging one tiny moment of play each day",
          "Turn boring tasks into mini adventures"
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
          description: "Ready to uncover the playful side of everyday life",
          emoji: "🔍"
        },
        recommendations: ["Start with one tiny moment of play today", "Turn your coffee break into a mini adventure"],
        funFact: "Your first play moment is waiting to be discovered!"
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

    const prompt = `You're creating a Spotify Wrapped-style analysis for someone's week of play moments. Make it fun, direct, and celebratory - like you're revealing their play personality to them for the first time. Be playful, use casual language, and make them feel seen and excited about their playfulness.

Play Moments Data:
${JSON.stringify(momentsData, null, 2)}

Please provide a JSON response with this exact structure:
{
  "summary": "A fun, direct summary like 'You're the kind of person who...' or 'This week you proved that...'",
  "patterns": [
    {
      "title": "Short, punchy title (like 'Peak Play Time' or 'Your Signature Move')",
      "description": "One fun sentence about what this reveals",
      "emoji": "relevant emoji"
    }
  ],
  "personality": {
    "title": "Your Play Type (like 'The Spontaneous Sprinkler' or 'The Micro-Moment Master')",
    "description": "One sentence that captures their play essence",
    "emoji": "personality emoji"
  },
  "recommendations": [
    "One playful suggestion",
    "Another fun idea"
  ],
  "funFact": "A surprising, delightful, or funny observation that makes them smile"
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
          description: "You find magic in the smallest moments",
          emoji: "✨"
        },
        recommendations: ["Keep capturing those playful moments!", "Share your joy with others"],
        funFact: "Your playfulness is contagious!"
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
