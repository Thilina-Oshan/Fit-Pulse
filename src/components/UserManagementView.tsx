import React, { useState } from 'react';
import { Users, UserCheck } from 'lucide-react';
import { MemberManagementContent } from './MemberManagementContent';
import { TrainerManagementContent } from './TrainerManagementContent';

interface UserManagementViewProps {
  initialTab?: 'MEMBERS' | 'TRAINERS';
}

export const UserManagementView: React.FC<UserManagementViewProps> = ({ 
  initialTab = 'MEMBERS' 
}) => {
  // Active sub-tab state ('MEMBERS' or 'TRAINERS')
  const [activeSubTab, setActiveSubTab] = useState<'MEMBERS' | 'TRAINERS'>(initialTab);

  return (
    <div className="space-y-6 p-6">
      {/* Top Header & Tab Switcher Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            User Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Switch between member records and trainer directory.
          </p>
        </div>

        {/* Sub-Tab Category Selector */}
        <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveSubTab('MEMBERS')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeSubTab === 'MEMBERS'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Member Management</span>
          </button>

          <button
            onClick={() => setActiveSubTab('TRAINERS')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeSubTab === 'TRAINERS'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Trainer Management</span>
          </button>
        </div>
      </div>

      {/* Dynamic Content Rendering */}
      <div>
        {activeSubTab === 'MEMBERS' ? (
          <MemberManagementContent />
        ) : (
          <TrainerManagementContent />
        )}
      </div>
    </div>
  );
};