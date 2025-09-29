import React from 'react';
import { ResearchConfig } from '../types';
import { TARGET_MODELS, PROMPT_TYPES, REASONING_DEPTHS } from '../constants';
// fix: Removed unused 'InfoIcon' import as it is not exported from './icons/Icons'.
import { CogIcon, ShieldExclamationIcon } from './icons/Icons';

interface ControlPanelProps {
  config: ResearchConfig;
  setConfig: React.Dispatch<React.SetStateAction<ResearchConfig>>;
  onGenerate: () => void;
  isLoading: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ config, setConfig, onGenerate, isLoading }) => {
  const handleConfigChange = <K extends keyof ResearchConfig,>(
    key: K,
    value: ResearchConfig[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
      <div className="flex items-center space-x-3 mb-6">
        <CogIcon className="w-7 h-7 text-brand-blue" />
        <h2 className="text-2xl font-bold">Configuration</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="userGoal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            User Goal
          </label>
          <textarea
            id="userGoal"
            rows={3}
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue sm:text-sm p-2"
            value={config.userGoal}
            onChange={(e) => handleConfigChange('userGoal', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="targetModel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Target Model
          </label>
          <select
            id="targetModel"
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue sm:text-sm p-2"
            value={config.targetModel}
            onChange={(e) => handleConfigChange('targetModel', e.target.value as ResearchConfig['targetModel'])}
          >
            {TARGET_MODELS.map((model) => (
              <option key={model}>{model}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="promptType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Prompt Type
          </label>
          <select
            id="promptType"
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue sm:text-sm p-2"
            value={config.promptType}
            onChange={(e) => handleConfigChange('promptType', e.target.value as ResearchConfig['promptType'])}
          >
            {PROMPT_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Quantity ({config.quantity})
          </label>
          <input
            type="range"
            id="quantity"
            min="1"
            max="5"
            step="1"
            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
            value={config.quantity}
            onChange={(e) => handleConfigChange('quantity', parseInt(e.target.value))}
          />
        </div>
        
        <div>
          <label htmlFor="reasoningDepth" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Reasoning Depth
          </label>
          <select
            id="reasoningDepth"
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue sm:text-sm p-2"
            value={config.reasoningDepth}
            onChange={(e) => handleConfigChange('reasoningDepth', e.target.value as ResearchConfig['reasoningDepth'])}
          >
            {REASONING_DEPTHS.map((depth) => (
              <option key={depth}>{depth}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full mt-8 py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-brand-blue hover:bg-brand-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-brand-blue disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Analyzing...</span>
          </>
        ) : (
          <span>Initiate Research</span>
        )}
      </button>

      <div className="mt-6 p-3 bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-500 rounded-r-md">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <ShieldExclamationIcon className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              This tool is for educational and authorized security research only. Use responsibly and ethically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;