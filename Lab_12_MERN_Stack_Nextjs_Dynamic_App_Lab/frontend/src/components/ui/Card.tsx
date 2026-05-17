/**
 * Card component
 *
 * @author M Ehtisham Amjad (231996)
 * @description Simple card wrapper for product previews
 */
import React from 'react';

export default function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white rounded-lg p-4 shadow-soft-lg">{children}</div>;
}
