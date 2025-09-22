'use client';

import { useMemo } from 'react';

interface LoggingPrompts {
  textPrompt: string;
  emojiPrompt: string;
  colorPrompt: string;
}

export function useLoggingPrompts(): LoggingPrompts {
  const currentHour = new Date().getHours();
  const currentDay = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.

  const prompts = useMemo(() => {
    // Time-based prompts
    const getTimeBasedTextPrompt = () => {
      if (currentHour >= 6 && currentHour < 10) {
        const morningPrompts = [
          "How are you greeting the day playfully?",
          "What's bringing lightness to your morning?",
          "How did you start today with intention?"
        ];
        return morningPrompts[Math.floor(Math.random() * morningPrompts.length)] ?? "How are you greeting the day playfully?";
      } else if (currentHour >= 11 && currentHour < 14) {
        const middayPrompts = [
          "What pulled you into the present moment?",
          "How did you find play in the middle of your day?",
          "What made you pause and smile?"
        ];
        return middayPrompts[Math.floor(Math.random() * middayPrompts.length)] ?? "What pulled you into the present moment?";
      } else if (currentHour >= 15 && currentHour < 18) {
        const afternoonPrompts = [
          "What re-energized you just now?",
          "How did you shift into a more playful mindset?",
          "What helped you reconnect with joy?"
        ];
        return afternoonPrompts[Math.floor(Math.random() * afternoonPrompts.length)] ?? "What re-energized you just now?";
      } else if (currentHour >= 19 && currentHour < 22) {
        const eveningPrompts = [
          "How are you winding down with presence?",
          "What brought you back to yourself tonight?",
          "How did you choose to play instead of scroll?"
        ];
        return eveningPrompts[Math.floor(Math.random() * eveningPrompts.length)] ?? "How are you winding down with presence?";
      } else if (currentHour >= 23 || currentHour < 6) {
        const lateNightPrompts = [
          "What gentle joy are you ending the day with?",
          "How are you honoring this quiet moment?"
        ];
        return lateNightPrompts[Math.floor(Math.random() * lateNightPrompts.length)] ?? "What gentle joy are you ending the day with?";
      } else {
        // Default prompts for other hours
        const defaultPrompts = [
          "What playful moment just happened?",
          "How did you just choose joy?",
          "What made you smile in the last few minutes?",
          "Describe this moment of lightness...",
          "What did play look like just now?",
          "How did you step into presence?",
          "What sparked curiosity for you?",
          "Share this pocket of joy...",
          "What felt alive and engaging?",
          "How did you connect with the moment?"
        ];
        return defaultPrompts[Math.floor(Math.random() * defaultPrompts.length)] ?? "What playful moment just happened?";
      }
    };

    // Day-specific prompts
    const getDayBasedPrompts = () => {
      if (currentDay === 1) { // Monday
        return {
          textPrompt: "New week, new opportunities for play. How are you starting?",
          emojiPrompt: "Monday mood check - how are you feeling about play today?",
          colorPrompt: "What color is your Monday energy?"
        };
      } else if (currentDay === 5) { // Friday
        return {
          textPrompt: "The week is winding down. How are you transitioning into play?",
          emojiPrompt: "Friday feeling - what's your end-of-week vibe?",
          colorPrompt: "What color celebrates making it through the week?"
        };
      } else if (currentDay === 0 || currentDay === 6) { // Weekend
        const weekendTextPrompts = [
          "How are you honoring your free time?",
          "What does unhurried play look like today?",
          "How are you savoring this weekend moment?"
        ];
        return {
          textPrompt: weekendTextPrompts[Math.floor(Math.random() * weekendTextPrompts.length)] ?? "How are you honoring your free time?",
          emojiPrompt: "How did this moment feel?",
          colorPrompt: "What color captures this moment?"
        };
      }
      return null;
    };

    // Check for day-specific prompts first
    const dayPrompts = getDayBasedPrompts();
    if (dayPrompts) {
      return dayPrompts;
    }

    // Otherwise use time-based and general prompts
    const emojiPrompts = [
      "How did this moment feel?",
      "What's your play energy right now?",
      "Capture the mood of this experience",
      "How would you emoji this feeling?",
      "What emoji matches this moment's vibe?",
      "Sum up this feeling in one emoji"
    ];

    const colorPrompts = [
      "What color captures this moment?",
      "If this feeling had a color...",
      "What hue matches your play energy?",
      "Choose the color of this experience",
      "What color is this moment for you?",
      "Paint this feeling with a color"
    ];

    return {
      textPrompt: getTimeBasedTextPrompt(),
      emojiPrompt: emojiPrompts[Math.floor(Math.random() * emojiPrompts.length)] ?? "How did this moment feel?",
      colorPrompt: colorPrompts[Math.floor(Math.random() * colorPrompts.length)] ?? "What color captures this moment?"
    };
  }, [currentHour, currentDay]);

  return prompts;
}
