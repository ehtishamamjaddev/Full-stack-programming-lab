"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const auth = useAuth();

  async function onSubmit(data: any) {
    try {
      schema.parse(data);
      await auth.login(data.email, data.password);
      toast.success('Logged in');
      router.push('/');
    } catch (err: any) {
      toast.error(err?.message || 'Login failed');
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input {...register('email')} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input type="password" {...register('password')} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <button type="submit" className="btn-primary w-full">Sign in</button>
        </div>
      </form>
    </div>
  );
}
