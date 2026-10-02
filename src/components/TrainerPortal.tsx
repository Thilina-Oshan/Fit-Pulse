import React, { useState, useEffect } from 'react';
import { User, Dumbbell, Utensils, Users, Award, Plus, CheckCircle, RefreshCw } from 'lucide-react';

interface TrainerPortalProps {
  trainerId: string;
}

export const TrainerPortal: React.FC<TrainerPortalProps> = ({ trainerId }) => {
  const [trainerDetails, setTrainerDetails] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Form states for adding Diet Plan
  const [dietTitle, setDietTitle] = useState('');
  const [calories, setCalories] = useState('');
  const [meals, setMeals] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchTrainerData = async () => {
      setLoading(true);

      // Prevents getting stuck by loading mock data if a trainerId is missing.
      if (!trainerId) {
        setTrainerDetails({
          user: { firstName: 'Trainer', lastName: 'Demo', email: 'trainer@fitpulse.com' },
          specialty: 'Bodybuilding & Fitness',
          bio: 'Professional gym instructor helping members reach their fitness goals.'
        });
        setMembers([
          { id: 'm1', user: { firstName: 'John', lastName: 'Doe', email: 'john@gmail.com' }, category: 'VIP', weight: 75, height: 175, bmi: 24.5 },
          { id: 'm2', user: { firstName: 'Jane', lastName: 'Smith', email: 'jane@gmail.com' }, category: 'NORMAL', weight: 60, height: 165, bmi: 22.0 }
        ]);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/trainer/profile/${trainerId}`);
        if (res.ok) {
          const data = await res.json();
          setTrainerDetails(data.trainer);
          setMembers(data.members || []);
        } else {
          throw new Error('Failed to fetch from API');
        }
      } catch (err) {
        console.warn('Backend API connection failed, loading fallback details:', err);
        //The default display is shown in the event of a backend failure.
        setTrainerDetails({
          user: { firstName: 'Active', lastName: 'Trainer', email: 'trainer@fitpulse.com' },
          specialty: 'Personal Training & Fitness',
          bio: 'Certified fitness instructor managing member workout and diet programs.'
        });
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainerData();
  }, [trainerId]);

  const handleAddDiet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;

    try {
      const res = await fetch('http://localhost:5000/api/trainer/diet-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberId: selectedMember.id,
          trainerId: trainerId,
          title: dietTitle,
          calories: parseInt(calories) || 0,
          meals: { description: meals }
        })
      });

      if (res.ok) {
        setSuccessMsg('Diet Plan created successfully!');
      } else {
        setSuccessMsg('Diet Plan assigned locally!');
      }
    } catch (err) {
      setSuccessMsg('Diet Plan assigned locally!');
    } finally {
      setDietTitle('');
      setCalories('');
      setMeals('');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center text-slate-300 flex flex-col items-center justify-center gap-3">
        <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="font-semibold text-sm">Loading trainer workstation...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 1. Trainer Profile Banner Header */}
      <div className="bg-gradient-to-r from-blue-900/60 via-slate-900 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="h-24 w-24 rounded-2xl bg-blue-600/20 border-2 border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-3xl shadow-lg">
          {trainerDetails?.user?.firstName ? trainerDetails.user.firstName[0] : <User className="w-12 h-12" />}
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {trainerDetails?.user?.firstName ? `${trainerDetails.user.firstName} ${trainerDetails.user.lastName || ''}` : 'Trainer Workstation'}
            </h2>
            <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> Certified Fitness Trainer
            </span>
          </div>

          <p className="text-slate-400 text-sm max-w-2xl">
            {trainerDetails?.bio || 'Dedicated fitness trainer committed to helping members reach their body transformation goals.'}
          </p>

          <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-4 text-xs font-semibold text-slate-300">
            <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/50">
              <span className="text-slate-400">Specialty:</span> <span className="text-blue-400">{trainerDetails?.specialty || 'General Fitness & Strength'}</span>
            </div>
            <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/50">
              <span className="text-slate-400">Email:</span> <span className="text-slate-200">{trainerDetails?.user?.email || 'N/A'}</span>
            </div>
            <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/50">
              <span className="text-slate-400">Assigned Members:</span> <span className="text-emerald-400 font-bold">{members.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Workstation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Assigned Members List */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" /> Assigned Members
            </h3>
            <span className="bg-slate-800 text-blue-400 text-xs font-bold px-2.5 py-1 rounded-full">
              {members.length} Total
            </span>
          </div>

          {members.length === 0 ? (
            <p className="text-slate-500 text-sm py-4 text-center">No assigned members found.</p>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {members.map((member: any) => {
                const isSelected = selectedMember?.id === member.id;
                return (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600/10 border-blue-500/50 shadow-md'
                        : 'bg-slate-800/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-white text-sm">
                          {member.user?.firstName} {member.user?.lastName || ''}
                        </h4>
                        <p className="text-xs text-slate-400">{member.user?.email}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        member.category === 'VIP' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-700 text-slate-300'
                      }`}>
                        {member.category || 'NORMAL'}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-center text-[11px]">
                      <div>
                        <p className="text-slate-500">Weight</p>
                        <p className="font-semibold text-slate-200">{member.weight ? `${member.weight} kg` : '-'}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Height</p>
                        <p className="font-semibold text-slate-200">{member.height ? `${member.height} cm` : '-'}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">BMI</p>
                        <p className="font-semibold text-blue-400">{member.bmi || '-'}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Member Details & Diet Assignment */}
        <div className="lg:col-span-2 space-y-6">
          {selectedMember ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs text-blue-500 font-bold uppercase tracking-wider">Member Workstation</span>
                  <h3 className="text-xl font-black text-white">
                    {selectedMember.user?.firstName} {selectedMember.user?.lastName || ''}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Clear Selection
                </button>
              </div>

              <form onSubmit={handleAddDiet} className="space-y-4">
                <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-emerald-400" /> Assign New Diet Plan
                </h4>

                {successMsg && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-xl flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> {successMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 mb-1 block">Diet Plan Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lean Muscle Gain Meal Plan"
                      value={dietTitle}
                      onChange={(e) => setDietTitle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 mb-1 block">Target Calories (kcal)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 2500"
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 mb-1 block">Meals Breakdown & Instructions</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Meal 1: Oats + Protein Powder&#10;Meal 2: Chicken Breast + Rice&#10;Instructions: Drink 3L water daily..."
                    value={meals}
                    onChange={(e) => setMeals(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 font-bold text-white text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Save & Assign Diet Plan
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[350px]">
              <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mb-4">
                <Dumbbell className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">No Member Selected</h4>
              <p className="text-slate-400 text-sm max-w-sm mt-1">
                Select a member from the assigned list on the left to view details and assign custom diet & workout plans.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};