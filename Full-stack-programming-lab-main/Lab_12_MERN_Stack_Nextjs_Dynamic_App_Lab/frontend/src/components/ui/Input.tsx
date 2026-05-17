import React from 'react';
import { cn } from './cn';

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

export function Input({ className, label, ...props }: Props) {
  return (
    <div className="flex flex-col space-y-1">
      {label ? <label className="text-sm font-medium text-gray-700">{label}</label> : null}
      <input
        {...props}
        className={cn(
          'w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30',
          className
        )}
      />
    </div>
  );
}

export default Input;
