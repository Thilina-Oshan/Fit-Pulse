import React, { useState } from 'react';
import { X } from 'lucide-react';

type MembershipCategory = 'NORMAL' | 'VIP';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: (user: any, token: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [category, setCategory] = useState<MembershipCategory>('NORMAL');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isRegister) {
                // Register Member Request
                const res = await fetch('http://localhost:5000/api/members/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, firstName, lastName, category })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Registration failed');

                // Auto switch to login
                setIsRegister(false);
                setError('Registration success! Please login now.');
            } else {
                // Login Request
                const res = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Invalid email or password');

                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                onLoginSuccess(data.user, data.token);
                onClose();
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 relative shadow-2xl">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-2xl font-black text-white mb-1">
                    {isRegister ? 'New Member Register' : 'FitPulse Account Login'}
                </h2>
                <p className="text-xs text-slate-400 mb-6">
                    {isRegister ? 'Join our gym network today' : 'Enter your credentials to access management console'}
                </p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isRegister && (
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-slate-400">First Name</label>
                                <input
                                    type="text"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 mt-1"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-400">Last Name</label>
                                <input
                                    type="text"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 mt-1"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="text-xs text-slate-400">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 mt-1"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-slate-400">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 mt-1"
                        />
                    </div>

                    {isRegister && (
                        <div>
                            <label className="text-xs text-slate-400">Membership Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value as MembershipCategory)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 mt-1"
                            >
                                <option value="NORMAL">NORMAL Member</option>
                                <option value="VIP">VIP Annual Pass</option>
                            </select>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-blue-600/30 text-sm mt-2"
                    >
                        {loading ? 'Processing...' : isRegister ? 'Register Account' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-xs text-blue-400 hover:underline"
                    >
                        {isRegister ? 'Already have an account? Sign In' : 'Need an account? Register as Member'}
                    </button>
                </div>
            </div>
        </div>
    );
};