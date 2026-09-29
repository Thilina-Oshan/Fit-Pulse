import React from 'react';
import { QrCode, Dumbbell, Utensils,  Clock} from 'lucide-react';
import { mockWorkoutPlans, mockDietPlans } from '../data/mockData';

export const MemberPortal: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 p-6 rounded-2xl border border-blue-500/20 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full border border-blue-400/30">
            VIP Annual Membership
          </span>
          <h2 className="text-2xl font-black text-white mt-2">Welcome Back, Kasun! 👋</h2>
          <p className="text-slate-200 text-sm mt-1">
            Your active pass expires in <span className="font-bold text-emerald-300">178 days</span>. Keep pushing!
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white text-blue-900 font-bold px-5 py-3 rounded-xl hover:bg-slate-100 transition shadow-lg text-sm">
          <QrCode className="w-5 h-5 text-blue-700" /> Show Gym Entry Pass
        </button>
      </div>

      {/* Fitness Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <p className="text-xs text-slate-400 font-semibold uppercase">Current Weight</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-white">72.5</span>
            <span className="text-slate-400 text-sm font-medium">kg</span>
          </div>
          <p className="text-xs text-emerald-400 mt-2 font-medium">↓ -1.5 kg this month</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <p className="text-xs text-slate-400 font-semibold uppercase">Body Mass Index (BMI)</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-emerald-400">23.4</span>
            <span className="text-slate-400 text-sm font-medium">Normal</span>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">Optimal health range</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <p className="text-xs text-slate-400 font-semibold uppercase">Assigned Trainer</p>
          <div className="flex items-center gap-3 mt-2">
            <img 
              src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100" 
              alt="Trainer" 
              className="w-10 h-10 rounded-full object-cover border border-blue-500"
            />
            <div>
              <p className="text-sm font-bold text-white">Coach Nimal Siripala</p>
              <span className="text-xs text-blue-400">Head Fitness Instructor</span>
            </div>
          </div>
        </div>
      </div>

      {/* Workout & Diet Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workout Schedule */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-blue-500" />
              <h3 className="font-bold text-lg text-white">Today's Workout Plan</h3>
            </div>
            <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-lg border border-slate-700">
              {mockWorkoutPlans[0].target}
            </span>
          </div>

          <div className="space-y-3 mt-4">
            {mockWorkoutPlans[0].exercises.map((ex, idx) => (
              <div key={idx} className="bg-slate-800/60 border border-slate-700/50 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{ex.name}</h4>
                    <p className="text-xs text-slate-400">{ex.sets} Sets × {ex.reps} Reps</p>
                  </div>
                </div>
                <span className="text-xs bg-slate-900 text-slate-400 px-2.5 py-1 rounded-md border border-slate-800">
                  Rest {ex.rest}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Diet Chart */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-emerald-500" />
              <h3 className="font-bold text-lg text-white">Assigned Diet Plan</h3>
            </div>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-lg border border-emerald-500/20 font-semibold">
              {mockDietPlans[0].calories} kcal / day
            </span>
          </div>

          <div className="space-y-3 mt-4">
            {mockDietPlans[0].meals.map((meal, idx) => (
              <div key={idx} className="bg-slate-800/60 border border-slate-700/50 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-bold text-slate-300">{meal.time}</span>
                  </div>
                  <p className="text-sm font-medium text-white mt-1">{meal.description}</p>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2.5 py-1 rounded-lg">
                  {meal.protein} Prot.
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
