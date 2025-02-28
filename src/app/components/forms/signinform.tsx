'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { inter } from '@/app/fonts';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { pb } from '@/lib/pocketbase';

interface SignInFormProps {
  onClose: () => void;
}

export default function SignInForm({ onClose }: SignInFormProps) {
  const router = useRouter();
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await pb.collection('users').authWithPassword(
        formData.email,
        formData.password
      );

      console.log('Authentication unsuccessful', pb.authStore);
      
      if (pb.authStore.isValid) {
        console.log('Authentication successful', pb.authStore);
        onClose();
        router.push('/account');
      }
    } catch (err) {
      setError('Invalid email or password');
      console.error('Authentication error:', err);
    }
  };

  return (
    <div className="relative p-6">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-navy hover:text-navy/70 transition-colors"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
      
      <form onSubmit={handleSubmit} className="space-y-4 mt-8">
        {error && (
          <div className="text-red-500 text-sm mb-4">
            {error}
          </div>
        )}
        <input
          type="email"
          name="email"
          placeholder="EMAIL"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full p-2 border border-navy rounded-xl bg-light ${inter.className}`}
        />
        <input
          type="password"
          name="password"
          placeholder="PASSWORD"
          value={formData.password}
          onChange={handleInputChange}
          className={`w-full p-2 border border-navy rounded-xl bg-light ${inter.className}`}
        />
        <button
          type="submit"
          className={`w-full bg-mint border-2 border-navy text-navy px-6 py-3 font-semibold rounded-xl lowercase ${inter.className}`}
        >
          SIGN IN
        </button>
      </form>
    </div>
  );
} 