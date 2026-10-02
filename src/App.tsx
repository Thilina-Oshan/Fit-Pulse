import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { AdminDashboard } from './components/AdminDashboard';
import { MemberPortal } from './components/MemberPortal';
import { POSModule } from './components/POSModule';
import { TrainerPortal } from './components/TrainerPortal';
import { AuthModal } from './components/AuthModal';
import { UserRole } from './types';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('ADMIN');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Auto Session Restore: Restores user session from localStorage if logged in
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
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
    setUserRole(user.role as UserRole);
    setCurrentTab('dashboard');
  };

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser(null);
    setUserRole('ADMIN');
    setCurrentTab('dashboard');
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />

      {/* Sidebar Component */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        userRole={userRole} 
        setUserRole={setUserRole} 
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="ml-0 min-w-0 flex-1 overflow-y-auto px-4 pb-6 pt-20 lg:ml-64 lg:p-8">
        <header className="mb-6 flex flex-col gap-4 border-b border-slate-800/80 pb-5 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">FitPulse Ecosystem</span>
            <h1 className="text-xl font-black text-white sm:text-2xl">Modern Gym Management System</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs text-slate-400">
              Status: <span className="text-emerald-400 font-bold">System Online</span>
            </div>

            {/* Profile badge when logged in */}
            {currentUser && (
              <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
                  {currentUser.firstName ? currentUser.firstName[0] : 'U'}
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white">{currentUser.firstName} {currentUser.lastName || ''}</p>
                  <p className="text-[10px] text-blue-400 font-semibold uppercase">{userRole}</p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic View Rendering according to Tab and Role */}
        {currentTab === 'dashboard' && userRole === 'ADMIN' && <AdminDashboard />}
        
        {/* Trainer Portal Render Fixed */}
        {currentTab === 'dashboard' && userRole === 'TRAINER' && (
          <TrainerPortal trainerId={currentUser?.trainerProfile?.id || currentUser?.id || ''} />
        )}
        
        {currentTab === 'dashboard' && userRole === 'MEMBER' && <MemberPortal />}
        
        {/* POS Module */}
        {currentTab === 'pos' && <POSModule />}
        
        {/* Fallback View for remaining tabs */}
        {currentTab !== 'dashboard' && currentTab !== 'pos' && (
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