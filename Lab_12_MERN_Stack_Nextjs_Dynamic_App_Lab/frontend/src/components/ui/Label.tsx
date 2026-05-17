import React from 'react';

export function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={"text-sm font-medium text-gray-700 " + (className || '')}>{children}</label>;
}

export default Label;
