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
        summary: `You've logged ${weeklyMoments.length} play moments this week! ${weeklyMoments.length > 0 ? 'Keep up the great work finding joy in small moments!' : 'Time to start logging some play moments!'}`,
        patterns: weeklyMoments.length > 0 ? [
          {
            title: "Play Frequency",
            description: `You logged ${weeklyMoments.length} moments this week`,
            emoji: "📊"
          },
          {
            title: "Most Common Mood",
            description: `Your most frequent mood was: ${getMostCommonMood(weeklyMoments)}`,
            emoji: "😊"
          }
        ] : [],
        personality: {
          title: "Playful Spirit",
          description: "Someone who finds joy in small moments and isn't afraid to capture them",
          emoji: "✨"
        },
        recommendations: [
          "Try logging at least one play moment each day",
          "Look for opportunities to add play to routine activities",
          "Share your play moments with others"
        ],
        funFact: "Every moment of play you capture helps build a more joyful life!"
      };
      
      return Response.json({ insights: fallbackInsights });
    }

    if (weeklyMoments.length === 0) {
      const emptyWeekInsights: AnalysisInsights = {
        summary: "No play moments recorded this week. Time to start playing! 🎉",
        patterns: [],
        personality: {
          title: "Ready to Play",
          description: "Someone ready to discover the joy in small moments",
          emoji: "🎉"
        },
        recommendations: ["Try logging a small moment of joy each day", "Look for opportunities to add play to routine activities"],
        funFact: "Every journey begins with a single step - or in this case, a single play moment!"
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

    const prompt = `Analyze these play moments from the past week and provide insights about the person's play patterns, personality, and recommendations for more play. Be encouraging, specific, and playful in your analysis.

Play Moments Data:
${JSON.stringify(momentsData, null, 2)}

Please provide a JSON response with the following structure:
{
  "summary": "A brief, encouraging summary of their week of play",
  "patterns": [
    {
      "title": "Pattern title",
      "description": "Description of the pattern",
      "emoji": "relevant emoji"
    }
  ],
  "personality": {
    "title": "Play personality type",
    "description": "Description of their play style",
    "emoji": "personality emoji"
  },
  "recommendations": [
    "Specific recommendation for more play",
    "Another playful suggestion"
  ],
  "funFact": "A surprising or delightful observation about their play moments"
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
        summary: result.text,
        patterns: [],
        personality: {
          title: "Playful Spirit",
          description: "Someone who finds joy in small moments",
          emoji: "✨"
        },
        recommendations: ["Keep finding those small moments of play!"],
        funFact: "Every moment of play matters!"
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
