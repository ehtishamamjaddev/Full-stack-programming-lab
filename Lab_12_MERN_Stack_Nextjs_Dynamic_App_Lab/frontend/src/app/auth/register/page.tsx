"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const auth = useAuth();

  async function onSubmit(data: any) {
    try {
      schema.parse(data);
      await auth.register({ name: data.name, email: data.email, password: data.password });
      toast.success('Account created');
      router.push('/');
    } catch (err: any) {
      toast.error(err?.message || 'Registration failed');
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Create account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Full name</label>
          <input {...register('name')} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input {...register('email')} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input type="password" {...register('password')} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <button type="submit" className="w-full bg-amber-600 text-white py-2 rounded">Create account</button>
        </div>
      </form>
    </div>
  );
}
