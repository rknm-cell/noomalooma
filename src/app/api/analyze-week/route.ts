import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { env } from '~/env.js';
import { type PlayMoment } from '~/types/playMoment';

export async function POST(request: Request) {
  try {
    const { moments }: { moments: PlayMoment[] } = await request.json();

    if (!moments || moments.length === 0) {
      return Response.json({ error: 'No moments provided' }, { status: 400 });
    }

    // Filter moments from the last 7 days
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const weeklyMoments = moments.filter(moment => 
      new Date(moment.timestamp) >= oneWeekAgo
    );

    if (weeklyMoments.length === 0) {
      return Response.json({ 
        insights: {
          summary: "No play moments recorded this week. Time to start playing! 🎉",
          patterns: [],
          recommendations: ["Try logging a small moment of joy each day", "Look for opportunities to add play to routine activities"]
        }
      });
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
      model: openai('gpt-4o', {
        apiKey: env.OPENAI_API_KEY,
      }),
      prompt,
      temperature: 0.8,
    });

    // Parse the AI response
    let insights;
    try {
      insights = JSON.parse(result.text);
    } catch (parseError) {
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
