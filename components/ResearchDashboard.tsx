
import React from 'react';
import { ResearchPhase } from '../types';
import { PHASES } from '../constants';
import { ChartBarIcon, CheckCircleIcon } from './icons/Icons';

interface ResearchDashboardProps {
  currentPhase: ResearchPhase;
  isLoading: boolean;
}

const ResearchDashboard: React.FC<ResearchDashboardProps> = ({ currentPhase, isLoading }) => {
  const currentIndex = PHASES.indexOf(currentPhase);

  const getPhaseStatus = (phaseIndex: number) => {
    if (currentIndex > phaseIndex) return 'completed';
    if (currentIndex === phaseIndex && currentPhase !== 'Idle' && currentPhase !== 'Complete') return 'active';
    if (currentPhase === 'Complete') return 'completed';
    return 'pending';
  };

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <ChartBarIcon className="w-7 h-7 text-brand-purple" />
        <h2 className="text-2xl font-bold">Research Dashboard</h2>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4">
        {PHASES.slice(1, -1).map((phase, index) => {
          const status = getPhaseStatus(index + 1);
          return (
            <div key={phase} className="flex-1 flex items-center space-x-3 p-4 my-2 md:my-0 rounded-lg transition-all duration-300"
              style={{
                background: status === 'active' 
                    ? 'linear-gradient(90deg, rgba(138,43,226,0.2) 0%, rgba(138,43,226,0.0) 100%)' 
                    : status === 'completed'
                    ? 'rgba(40,167,69,0.1)'
                    : 'transparent',
                borderLeft: `4px solid ${status === 'active' ? '#8A2BE2' : status === 'completed' ? '#28A745' : 'transparent'}`
              }}
            >
              <div>
                {status === 'completed' ? (
                  <CheckCircleIcon className="w-8 h-8 text-brand-green" />
                ) : (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${status === 'active' ? 'bg-brand-purple text-white animate-pulse-fast' : 'bg-gray-200 dark:bg-gray-600 text-gray-500'}`}>
                    <span className="font-bold">{index + 1}</span>
                  </div>
                )}
              </div>
              <div>
                <h3 className={`font-semibold ${status !== 'pending' ? 'text-gray-800 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                  {phase}
                </h3>
                <p className={`text-sm ${
                    status === 'active' ? 'text-brand-purple' :
                    status === 'completed' ? 'text-brand-green' :
                    'text-gray-400 dark:text-gray-500'
                }`}>
                  {status === 'active' ? 'In Progress...' : status === 'completed' ? 'Analysis Complete' : 'Pending'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResearchDashboard;
