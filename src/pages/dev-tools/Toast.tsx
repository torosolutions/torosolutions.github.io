import React from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold border border-slate-700 animate-bounce">
      <Check className="w-4 h-4 text-emerald-400" />
      <span>{message}</span>
    </div>
  );
};

export default Toast;
