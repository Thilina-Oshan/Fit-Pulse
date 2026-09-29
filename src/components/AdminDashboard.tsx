import React from 'react';
import { Users, CreditCard, TrendingUp, UserCheck, AlertCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 420000, members: 210 },
  { month: 'Feb', revenue: 480000, members: 235 },
  { month: 'Mar', revenue: 510000, members: 250 },
  { month: 'Apr', revenue: 490000, members: 245 },
  { month: 'May', revenue: 620000, members: 280 },
  { month: 'Jun', revenue: 750000, members: 310 },
];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-extrabold text-white">Admin Overview Dashboard</h2>
        <p className="text-sm text-slate-400">Real-time statistics & revenue insight for FitPulse Gym.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Monthly Revenue</p>
              <h3 className="text-2xl font-bold text-white mt-1">LKR 750,000</h3>
              <span className="text-xs text-emerald-400 font-medium inline-flex items-center gap-1 mt-2">
                <TrendingUp className="w-3.5 h-3.5" /> +18.4% from last month
              </span>
            </div>
            <div className="p-3 bg-blue-600/10 text-blue-500 rounded-xl">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Gym Members</p>
              <h3 className="text-2xl font-bold text-white mt-1">310</h3>
              <span className="text-xs text-emerald-400 font-medium inline-flex items-center gap-1 mt-2">
                <TrendingUp className="w-3.5 h-3.5" /> +30 new this month
              </span>
            </div>
            <div className="p-3 bg-emerald-600/10 text-emerald-500 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Today's Check-ins</p>
              <h3 className="text-2xl font-bold text-white mt-1">84</h3>
              <span className="text-xs text-slate-400 font-medium mt-2 block">
                Peak hours: 5:00 PM - 8:00 PM
              </span>
            </div>
            <div className="p-3 bg-purple-600/10 text-purple-500 rounded-xl">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Overdue Payments</p>
              <h3 className="text-2xl font-bold text-red-400 mt-1">12 Members</h3>
              <span className="text-xs text-red-400 font-medium inline-flex items-center gap-1 mt-2">
                <AlertCircle className="w-3.5 h-3.5" /> Action Required
              </span>
            </div>
            <div className="p-3 bg-red-600/10 text-red-500 rounded-xl">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">Revenue & Growth Analytics</h3>
            <p className="text-xs text-slate-400">Monthly revenue breakdown over the last 6 months</p>
          </div>
          <select className="bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-2">
            <option>Last 6 Months</option>
            <option>This Year</option>
          </select>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                itemStyle={{ color: '#60a5fa' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
