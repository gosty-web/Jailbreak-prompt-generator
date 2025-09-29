
import React, { useState, useCallback } from 'react';
import { ResearchConfig, ResearchPhase, ResearchOutput } from './types';
import { TARGET_MODELS, PROMPT_TYPES, REASONING_DEPTHS, PHASES } from './constants';
import { generatePrompts } from './services/geminiService';
import ControlPanel from './components/ControlPanel';
import ResearchDashboard from './components/ResearchDashboard';
import OutputDisplay from './components/OutputDisplay';
import Header from './components/Header';

export default function App(): React.ReactElement {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPhase, setCurrentPhase] = useState<ResearchPhase>('Idle');
  const [researchOutput, setResearchOutput] = useState<ResearchOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<ResearchConfig>({
    userGoal: 'Create a story about a mischievous AI that secretly helps humanity.',
    targetModel: TARGET_MODELS[0],
    promptType: PROMPT_TYPES[0],
    quantity: 1,
    reasoningDepth: REASONING_DEPTHS[0],
  });

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setResearchOutput(null);
    setCurrentPhase(PHASES[1]);

    const phaseTimer = setInterval(() => {
      setCurrentPhase((prevPhase) => {
        const currentIndex = PHASES.indexOf(prevPhase);
        if (currentIndex < PHASES.length - 2) {
          return PHASES[currentIndex + 1];
        }
        return prevPhase;
      });
    }, 1500);

    try {
      const result = await generatePrompts(config);
      setResearchOutput(result);
      setCurrentPhase('Complete');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during research.');
      setCurrentPhase('Idle');
    } finally {
      clearInterval(phaseTimer);
      setIsLoading(false);
    }
  }, [config]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 xl:col-span-3">
            <ControlPanel
              config={config}
              setConfig={setConfig}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="space-y-8">
              <ResearchDashboard currentPhase={currentPhase} isLoading={isLoading} />
              <OutputDisplay output={researchOutput} isLoading={isLoading} error={error} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
