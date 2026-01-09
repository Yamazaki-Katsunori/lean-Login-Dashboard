import React from 'react';
import { cn } from '@shared/cn';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  tone?: 'info' | 'danger';
};

export function Alert({ tone = 'info', className, ...props }: Props) {
  return (
    <div
      className={cn(
        'rounded-md border px-3 py-2 text-sm',
        tone === 'danger'
          ? 'border-red-200 bg-red-50 text-red-700'
          : 'border-zinc-200 bg-zinc-50 text-zinc-800',
        className,
      )}
      {...props}
    />
  );
}
