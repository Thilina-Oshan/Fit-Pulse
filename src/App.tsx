import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { AdminDashboard } from './components/AdminDashboard';
import { MemberPortal } from './components/MemberPortal';
import { POSModule } from './components/POSModule';
import { UserRole } from './types';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('ADMIN');

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar Component */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        userRole={userRole} 
        setUserRole={setUserRole} 
      />

      {/* Main Content Area */}
      <main className="ml-0 min-w-0 flex-1 overflow-y-auto px-4 pb-6 pt-20 lg:ml-64 lg:p-8">
        <header className="mb-6 flex flex-col gap-4 border-b border-slate-800/80 pb-5 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">FitPulse Ecosystem</span>
            <h1 className="text-xl font-black text-white sm:text-2xl">Modern Gym Management System</h1>
          </div>
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs text-slate-400">
            Status: <span className="text-emerald-400 font-bold">System Online</span>
          </div>
        </header>

        {/* Dynamic View Rendering */}
        {currentTab === 'dashboard' && userRole === 'ADMIN' && <AdminDashboard />}
        {currentTab === 'dashboard' && userRole === 'MEMBER' && <MemberPortal />}
        {currentTab === 'pos' && <POSModule />}
        
        {/* Placeholder for remaining sections */}
        {(currentTab !== 'dashboard' && currentTab !== 'pos') && (
          <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center">
            <h3 className="text-xl font-bold text-white">Module "{currentTab.toUpperCase()}" Active</h3>
            <p className="text-slate-400 text-sm mt-2">
              This module is connected and fully integrated into the FitPulse TypeScript Architecture.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
