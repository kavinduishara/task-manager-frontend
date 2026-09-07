'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { CheckSquare, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { login } from '@/libs/api/auth';
import { useNotification } from '@/components/providers/NotificationProvider';
import axios from 'axios';
import { useUserDetails } from '@/components/providers/UserDetailsProvider';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { showNotification } = useNotification();

  const { setUser }=useUserDetails()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    

    if (!email || !password) {
      setError('Enter your email address and password to continue.');
      return;
    }

    try {
      const data = await login(email, password);

      setUser(data.user)

      console.log(data);
      showNotification(data.message,"success");
          
      router.push('/');
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
          showNotification(
          error.response?.data?.message ??
          "Failed to log in.","error"
          );
      } else {
          showNotification("Failed to log in.","error");
      }
    }
  }

  return (
    <>
      <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-12">
          <div className="w-full max-w-sm">
            <div className="mb-10 md:hidden">
              <div className="flex items-center gap-2 text-lg font-bold text-slate-900"><span className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-600 text-white"><CheckSquare size={20} /></span>TaskFlow</div></div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-slate-500">Sign in to access your workspace.</p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">Email address</label>
                <div className="relative"><Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="w-full rounded-lg border border-slate-200 py-2.5 pr-3 pl-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" /></div>
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between"><label htmlFor="password" className="text-sm font-medium text-slate-700">Password</label></div>
                <div className="relative"><LockKeyhole className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="w-full rounded-lg border border-slate-200 py-2.5 pr-10 pl-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
              </div>
              {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
              <button type="submit" className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200">Sign in</button>
            </form>
            <p className="mt-8 text-center text-sm text-slate-500">New to TaskFlow? <Link href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700">Create an account</Link></p>
          </div>
        </div>
    </>
  );
}
