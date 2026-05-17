import React from 'react';
import { cn } from './cn';

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
};

export function Dialog({ open, onClose, title, children }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className={cn('relative z-10 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg')}> 
        {title ? <h3 className="mb-2 text-lg font-semibold">{title}</h3> : null}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Dialog;
