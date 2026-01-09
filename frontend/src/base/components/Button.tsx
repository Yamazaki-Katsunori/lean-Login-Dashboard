import React from 'react';
import { cn } from '@shared/cn';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export function Button({ variant = 'primary', className, ...props }: Props) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium',
        'disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'primary'
          ? 'bg-black text-white hover:opacity-90'
          : 'border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50',
        className,
      )}
      {...props}
    />
  );
}
