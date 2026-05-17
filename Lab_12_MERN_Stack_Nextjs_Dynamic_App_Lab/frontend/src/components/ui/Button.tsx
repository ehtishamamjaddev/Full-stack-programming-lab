/**
 * Primary Button component
 *
 * @author M Ehtisham Amjad (231996)
 * @description Accessible button with consistent styling
 */
import React from 'react';
import clsx from 'clsx';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' };

export default function Button({ className, variant = 'primary', ...props }: Props) {
  return (
    <button
      {...props}
      className={clsx(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition duration-200',
        variant === 'primary' ? 'bg-brand-500 text-white hover:bg-brand-600 shadow-sm' : 'bg-transparent text-brand-600 hover:bg-brand-50',
        className
      )}
    />
  );
}
