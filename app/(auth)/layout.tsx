import { CheckSquare } from 'lucide-react';

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <>
    <section className="flex h-screen">
        <div className="hidden w-5/12 flex-col justify-between bg-slate-900 p-10 text-white md:flex">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold"><span className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-500"><CheckSquare size={20} /></span>TaskFlow</div>
            <div className="mt-24">
              <p className="text-sm font-medium text-indigo-300">WORK SMARTER, TOGETHER</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight">Keep every task moving forward.</h1>
              <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">Plan, prioritize, and deliver meaningful work with your team in one focused space.</p>
            </div>
          </div>
          <p className="text-sm text-slate-400">© 2026 TaskFlow. All rights reserved.</p>
        </div>

        {children}
      </section>
        
    </>        
  );
}
