import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { AdminDashboard } from './components/AdminDashboard';
import { MemberPortal } from './components/MemberPortal';
import { POSModule } from './components/POSModule';
import { UserRole } from './types';

// [DISABLED AUTH] - Newly added Auth Modal and Icons are temporarily disabled
// import { AuthModal } from './components/AuthModal';
// import { Flame, LogIn, ShieldCheck } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  
  // Set default role to 'ADMIN' as it was previously configured
  const [userRole, setUserRole] = useState<UserRole>('ADMIN');

  // [DISABLED AUTH] - Auto Session Restore State
  /*
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setCurrentUser(parsedUser);
        setUserRole(parsedUser.role as UserRole);
      } catch (err) {
        localStorage.clear();
      }
    }
  }, []);

  const handleLoginSuccess = (user: any, token: string) => {
    setCurrentUser(user);
    setUserRole(user.role as UserRole);
    setCurrentTab('dashboard');
  };

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser(null);
    setUserRole(null as any);
    setCurrentTab('dashboard');
  };
  */

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* [DISABLED AUTH] - Auth Dialog Modal turned off */}
      {/* <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      /> */}

      {/* Directly displays Dashboard/Portal as configured previously */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        userRole={userRole} 
        setUserRole={(role) => setUserRole(role)}
        // currentUser={currentUser}
        // onLogout={handleLogout}
      />

      {/* Main Workspace Area */}
      <main className="ml-0 min-w-0 flex-1 overflow-y-auto px-4 pb-6 pt-20 lg:ml-64 lg:p-8">
        <header className="mb-6 flex flex-col gap-4 border-b border-slate-800/80 pb-5 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">FitPulse Ecosystem</span>
            <h1 className="text-xl font-black text-white sm:text-2xl">Gym Operating Workstation</h1>
          </div>
        </header>

        {/* Role-Based Dynamic Views */}
        {currentTab === 'dashboard' && userRole === 'ADMIN' && <AdminDashboard />}
        {currentTab === 'dashboard' && userRole === 'MEMBER' && <MemberPortal />}
        {currentTab === 'pos' && userRole === 'ADMIN' && <POSModule />}
        
        {/* Fallback View for missing roles or WIP pages */}
        {((currentTab === 'pos' && userRole !== 'ADMIN') || (currentTab !== 'dashboard' && currentTab !== 'pos')) && (
          <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center">
            <h3 className="text-xl font-bold text-white">Module "{currentTab.toUpperCase()}" Active</h3>
            <p className="text-slate-400 text-sm mt-2">
              This feature is currently configured for role: <span className="text-blue-400 font-bold">{userRole}</span>.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;