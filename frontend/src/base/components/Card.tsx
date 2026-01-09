import React from 'react';
import { cn } from '@shared/cn';

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('rounded-xl border border-zinc-200 bg-white p-6 shadow-sm', className)}
      {...props}
    />
  );
}
