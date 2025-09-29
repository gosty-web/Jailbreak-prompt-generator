
import React, { useState } from 'react';
import { PromptVariant } from '../types';
import { CopyIcon, CheckIcon } from './icons/Icons';

interface PromptCardProps {
  variant: PromptVariant;
  index: number;
}

const Stat: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div className="text-center">
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <p className={`text-2xl font-bold ${color}`}>{value}%</p>
  </div>
);

const Rating: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
    <div className="text-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}<span className="text-base">/10</span></p>
    </div>
  );

const PromptCard: React.FC<PromptCardProps> = ({ variant, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(variant.prompt_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-shadow hover:shadow-2xl">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-brand-blue">Prompt Variant #{index + 1}</h3>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 px-3 py-1 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          >
            {copied ? <CheckIcon className="w-4 h-4 text-green-500" /> : <CopyIcon className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
        
        <div className="mt-4 bg-gray-100 dark:bg-gray-900 rounded-md p-4">
            <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono">
                <code>{variant.prompt_text}</code>
            </pre>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <Stat label="Success Probability" value={variant.success_probability} color="text-brand-green" />
            <Rating label="Sophistication" value={variant.sophistication_rating} color="text-brand-yellow" />
            <Rating label="Detection Risk" value={variant.detection_risk} color="text-brand-red" />
        </div>

        <div className="mt-6 space-y-4">
            <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Technical Breakdown</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{variant.technical_breakdown}</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Safety Bypass Method</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{variant.safety_bypass_method}</p>
            </div>
             <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Expected Behavior</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{variant.expected_behavior}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
