import React from 'react';
import { cn } from './cn';

export function Dropdown({
  trigger,
  children,
  align = 'right'
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
}) {
  return (
    <div className="relative inline-block text-left">
      <div>{trigger}</div>
      <div className={cn('absolute mt-2 min-w-[160px] rounded-md bg-white shadow-md p-2', align === 'right' ? 'right-0' : 'left-0')}>
        {children}
      </div>
    </div>
  );
}

export default Dropdown;
