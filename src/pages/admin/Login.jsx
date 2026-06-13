import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Melakukan autentikasi dengan Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);
      // Jika berhasil, arahkan ke dashboard admin
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError('Email atau password salah.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl border border-[#F5E6CC] max-w-md w-full shadow-sm">
        <h2 className="text-2xl font-black text-[#6B4F3A] mb-2 text-center">Login Admin</h2>
        <p className="text-xs text-[#6B4F3A]/70 text-center mb-6">Kelola katalog produk Victory Snack</p>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-xs mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-[#6B4F3A] mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-[#F5E6CC] p-3 rounded-xl text-sm focus:outline-none focus:border-[#C97B63]" 
              placeholder="admin@victory.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#6B4F3A] mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-[#F5E6CC] p-3 rounded-xl text-sm focus:outline-none focus:border-[#C97B63]" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#2F3E34] hover:bg-[#2F3E34]/90 text-white font-bold p-3 rounded-xl transition-colors mt-2 text-sm"
          >
            {loading ? 'Logging in...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  );
}