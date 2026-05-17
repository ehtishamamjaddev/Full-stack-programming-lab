import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="hidden border-b border-ink-200 bg-ink-50 text-xs text-ink-700 md:block">
      <div className="mx-auto flex max-w-site items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3 text-ink-500">
          <Twitter className="h-3.5 w-3.5 hover:text-brand-500" />
          <Facebook className="h-3.5 w-3.5 hover:text-brand-500" />
          <Instagram className="h-3.5 w-3.5 hover:text-brand-500" />
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="hover:text-brand-600">My Account</Link>
          <Link href="/auth/login" className="hover:text-brand-600">Login</Link>
          <Link href="/auth/register" className="hover:text-brand-600">Register</Link>
        </div>
      </div>
    </div>
  );
}
