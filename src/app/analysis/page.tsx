'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

export default function AnalysisPage() {
  const [insights, setInsights] = useState<AnalysisInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const analyzeWeek = async () => {
      try {
        // Get moments from localStorage
        const storedMoments = localStorage.getItem('noomalooma-play-moments');
        if (!storedMoments) {
          setError('No play moments found. Start logging some play!');
          setLoading(false);
          return;
        }

        const moments: PlayMoment[] = JSON.parse(storedMoments).map((moment: any) => ({
          ...moment,
          timestamp: new Date(moment.timestamp)
        }));

        const response = await fetch('/api/analyze-week', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ moments }),
        });

        if (!response.ok) {
          throw new Error('Failed to analyze moments');
        }

        const data = await response.json();
        setInsights(data.insights);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    analyzeWeek();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-main flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            🎭
          </motion.div>
          <p className="text-lg text-primary">Analyzing your play patterns...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-main flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="text-6xl mb-4">😅</div>
          <h1 className="text-2xl font-bold text-primary mb-2">Oops!</h1>
          <p className="text-primary mb-6">{error}</p>
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-purple text-primary px-6 py-3 rounded-full font-semibold"
          >
            Back to Play
          </motion.a>
        </motion.div>
      </div>
    );
  }

  if (!insights) {
    return null;
  }

  return (
    <div className="min-h-screen bg-main p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-primary mb-2">
            Your Play Week Analysis
          </h1>
          <p className="text-lg text-primary/70">Discover your playful patterns</p>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 mb-6 shadow-sm"
        >
          <h2 className="text-2xl font-bold text-purple mb-3">Week Summary</h2>
          <p className="text-primary text-lg leading-relaxed">{insights.summary}</p>
        </motion.div>

        {/* Personality */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-pink rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{insights.personality.emoji}</span>
            <h2 className="text-2xl font-bold text-primary">{insights.personality.title}</h2>
          </div>
          <p className="text-primary text-lg leading-relaxed">{insights.personality.description}</p>
        </motion.div>

        {/* Patterns */}
        {insights.patterns.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">Play Patterns</h2>
            <div className="space-y-4">
              {insights.patterns.map((pattern, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-orange rounded-xl p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{pattern.emoji}</span>
                    <h3 className="text-xl font-semibold text-primary">{pattern.title}</h3>
                  </div>
                  <p className="text-primary">{pattern.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-lavender rounded-2xl p-6 mb-6"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">Play Recommendations</h2>
          <ul className="space-y-2">
            {insights.recommendations.map((rec, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="text-lg">✨</span>
                <span className="text-primary">{rec}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Fun Fact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-blue rounded-2xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-primary mb-3">Fun Fact</h2>
          <p className="text-primary text-lg leading-relaxed">{insights.funFact}</p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4 justify-center"
        >
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green text-primary px-6 py-3 rounded-full font-semibold"
          >
            Back to Play
          </motion.a>
          <motion.a
            href="/log"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-fuschia text-primary px-6 py-3 rounded-full font-semibold"
          >
            Log More Play
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
