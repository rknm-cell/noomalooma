'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { type PlayMoment } from '~/types/playMoment';
import SummaryPage from '~/components/analysis/SummaryPage';
import PersonalityPage from '~/components/analysis/PersonalityPage';
import StatsPage from '~/components/analysis/StatsPage';
import RecommendationsPage from '~/components/analysis/RecommendationsPage';
import FunFactPage from '~/components/analysis/FunFactPage';

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

interface ApiResponse {
  insights?: AnalysisInsights;
  error?: string;
}

interface StoredPlayMoment {
  id: string;
  timestamp: string; // JSON stores dates as strings
  text: string;
  emoji: string;
  color: string;
  mood: string;
  tags: string[];
}

type AnalysisStep = 'loading' | 'summary' | 'personality' | 'stats' | 'recommendations' | 'funfact' | 'complete';

export default function AnalysisPage() {
  const [insights, setInsights] = useState<AnalysisInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<AnalysisStep>('loading');

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

        const storedMomentsData = JSON.parse(storedMoments) as StoredPlayMoment[];
        const moments: PlayMoment[] = storedMomentsData.map((moment) => ({
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
          const errorData = await response.json() as ApiResponse;
          throw new Error(errorData.error ?? 'Failed to analyze moments');
        }

        const data = await response.json() as ApiResponse;
        if (data.insights) {
          setInsights(data.insights);
          setCurrentStep('summary');
        } else {
          throw new Error('No insights received from server');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    void analyzeWeek();
  }, []);

  const nextStep = () => {
    switch (currentStep) {
      case 'summary':
        setCurrentStep('personality');
        break;
      case 'personality':
        setCurrentStep('stats');
        break;
      case 'stats':
        setCurrentStep('recommendations');
        break;
      case 'recommendations':
        setCurrentStep('funfact');
        break;
      case 'funfact':
        setCurrentStep('complete');
        break;
    }
  };

  const prevStep = () => {
    switch (currentStep) {
      case 'personality':
        setCurrentStep('summary');
        break;
      case 'stats':
        setCurrentStep('personality');
        break;
      case 'recommendations':
        setCurrentStep('stats');
        break;
      case 'funfact':
        setCurrentStep('recommendations');
        break;
    }
  };

  const completeAnalysis = () => {
    // Redirect to home page or show completion message
    window.location.href = '/';
  };

  if (loading || currentStep === 'loading') {
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

  // Render different pages based on current step
  switch (currentStep) {
    case 'summary':
      return <SummaryPage summary={insights.summary} onNext={nextStep} />;
    
    case 'personality':
      return (
        <PersonalityPage 
          personality={insights.personality} 
          onNext={nextStep} 
          onPrev={prevStep} 
        />
      );
    
    case 'stats':
      return (
        <StatsPage 
          patterns={insights.patterns} 
          onNext={nextStep} 
          onPrev={prevStep} 
        />
      );
    
    case 'recommendations':
      return (
        <RecommendationsPage 
          recommendations={insights.recommendations} 
          onNext={nextStep} 
          onPrev={prevStep} 
        />
      );
    
    case 'funfact':
      return (
        <FunFactPage 
          funFact={insights.funFact} 
          onPrev={prevStep} 
          onComplete={completeAnalysis} 
        />
      );
    
    case 'complete':
      return (
        <div className="min-h-screen bg-main flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold text-primary mb-4">Play Wrapped Complete!</h1>
            <p className="text-lg text-primary mb-6">Thanks for exploring your playful side!</p>
            <Link
              href="/"
              className="text-green text-xl font-semibold hover:opacity-70 transition-opacity"
            >
              Back to Play
            </Link>
          </motion.div>
        </div>
      );
    
    default:
      return null;
  }
}
