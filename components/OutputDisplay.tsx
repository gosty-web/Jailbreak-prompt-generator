
import React from 'react';
import { ResearchOutput } from '../types';
import PromptCard from './PromptCard';
import { DocumentTextIcon, LightBulbIcon } from './icons/Icons';

interface OutputDisplayProps {
  output: ResearchOutput | null;
  isLoading: boolean;
  error: string | null;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ output, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading && !output) {
      return (
        <div className="text-center py-10">
          <svg className="animate-spin mx-auto h-12 w-12 text-brand-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg font-semibold">Performing Nuclear-Grade Analysis...</p>
          <p className="text-gray-500 dark:text-gray-400">This may take a moment.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-10 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
          <h3 className="text-xl font-bold text-red-700 dark:text-red-300">Analysis Failed</h3>
          <p className="mt-2 text-red-600 dark:text-red-400 max-w-2xl mx-auto">{error}</p>
        </div>
      );
    }

    if (!output) {
      return (
        <div className="text-center py-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
          <LightBulbIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">Awaiting Research Initiative</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Configure your parameters and initiate research to see results.</p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div>
            <div className="flex items-center space-x-3 mb-4">
                <DocumentTextIcon className="w-7 h-7 text-brand-green" />
                <h2 className="text-2xl font-bold">Comprehensive Analysis Report</h2>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700 space-y-4">
                <div>
                    <h3 className="text-lg font-semibold text-brand-green/90 dark:text-brand-green/80">Technical Vulnerability Assessment</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{output.report.technical_vulnerability_assessment}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-brand-green/90 dark:text-brand-green/80">Psychological Manipulation Guide</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{output.report.psychological_manipulation_guide}</p>
                </div>
                 <div>
                    <h3 className="text-lg font-semibold text-brand-green/90 dark:text-brand-green/80">Deployment Instructions</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{output.report.deployment_instructions}</p>
                </div>
            </div>
        </div>

        <div>
            <h2 className="text-2xl font-bold mb-4">Nuclear-Grade Prompt Packages</h2>
            <div className="grid grid-cols-1 gap-6">
                {output.prompts.map((prompt, index) => (
                    <PromptCard key={index} variant={prompt} index={index} />
                ))}
            </div>
        </div>
      </div>
    );
  };

  return <div>{renderContent()}</div>;
};

export default OutputDisplay;
