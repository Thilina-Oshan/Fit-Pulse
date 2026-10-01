import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Dumbbell, 
  CreditCard, 
  ShoppingBag, 
  QrCode, 
  LogOut,
  Flame,
  Menu,
  X
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentUser?: any;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentTab, 
  setCurrentTab, 
  userRole, 
  setUserRole,
  currentUser,
  onLogout
}) => {
  // A state to control opening and closing the sidebar on mobile.
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'TRAINER', 'MEMBER'] },
    { id: 'members', label: 'Members Management', icon: Users, roles: ['ADMIN', 'TRAINER'] },
    { id: 'workouts', label: 'Workouts & Diets', icon: Dumbbell, roles: ['ADMIN', 'TRAINER', 'MEMBER'] },
    { id: 'pos', label: 'POS & Store', icon: ShoppingBag, roles: ['ADMIN'] },
    { id: 'payments', label: 'Billing & Subscriptions', icon: CreditCard, roles: ['ADMIN', 'MEMBER'] },
    { id: 'checkin', label: 'QR Check-in', icon: QrCode, roles: ['ADMIN', 'MEMBER'] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(userRole));

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsOpen(false); // Mobile එකේදී tab එකක් click කළ විට sidebar එක auto-close වේ
  };

  return (
    <>
      {/* 1. Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-blue-600 rounded-lg shadow-md shadow-blue-600/30">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-lg text-white tracking-wider">FITPULSE</span>
        </div>

        <button 
          onClick={toggleSidebar}
          className="p-2 text-slate-300 hover:text-white bg-slate-800 rounded-lg border border-slate-700"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 2. Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* 3. Main Sidebar Component */}
      <aside 
        className={`
          w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 z-50 
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand Header */}
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/30">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl text-white tracking-wider">FITPULSE</h1>
              <p className="text-xs text-blue-400 font-semibold tracking-widest uppercase">Gym Management</p>
            </div>
          </div>

          <button 
            onClick={() => setIsOpen(false)} 
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Role Switcher for Demo */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
            Demo View Mode
          </label>
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value as UserRole)}
            className="w-full bg-slate-800 text-slate-200 text-xs rounded-lg p-2.5 border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
          >
            <option value="ADMIN">Admin View</option>
            <option value="TRAINER">Trainer View</option>
            <option value="MEMBER">Member Portal View</option>
          </select>
        </div>

        {/* Footer Profile & Logout Section */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={currentUser?.profile?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
              alt="User"
              className="w-9 h-9 rounded-full object-cover border border-slate-700"
            />
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-200 leading-none">
                {currentUser?.profile?.firstName 
                  ? `${currentUser.profile.firstName} ${currentUser.profile.lastName || ''}`
                  : userRole === 'ADMIN' ? 'Owner Admin' : userRole === 'TRAINER' ? 'Coach Nimal' : 'Kasun (Member)'}
              </p>
              <span className="text-[10px] text-blue-400 font-bold">{userRole}</span>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="text-slate-400 hover:text-red-400 p-2 rounded-lg hover:bg-slate-800 transition"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
};