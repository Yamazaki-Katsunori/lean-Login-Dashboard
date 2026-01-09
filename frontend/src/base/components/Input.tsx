import React from 'react';
import { cn } from '@shared/cn';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className, ...props }: Props) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium text-zinc-900">{label}</label>}
      <input
        className={cn(
          'w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm',
          'focus:ring-2 focus:ring-zinc-400 focus:outline-none',
          error && 'border-red-500 focus:ring-red-400',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
