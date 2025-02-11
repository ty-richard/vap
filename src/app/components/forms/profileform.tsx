'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { inter } from '@/app/fonts';
import User from '@/types/user';
import userData from '@/data/user.json';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ProfileFormProps {
  onClose: () => void;
}

export default function ProfileForm({ onClose }: ProfileFormProps) {
  const router = useRouter();
  const user: User = userData.user;

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    country: user.country,
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
    // Ready for API call with formData
    console.log('Form data ready for submission:', formData);
    // After API call success:
    onClose();
    router.push('/account');
  };

  return (
    <div className="relative p-4 sm:p-6">
      <button
        onClick={onClose}
        className="absolute right-2 top-2 sm:right-4 sm:top-4 text-navy hover:text-navy/70 transition-colors"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
      
      <form onSubmit={handleSubmit} className="space-y-4 mt-4 sm:mt-8">
        <input
          type="text"
          name="firstName"
          placeholder="FIRST NAME"
          value={formData.firstName}
          onChange={handleInputChange}
          className={`w-full p-2 sm:p-3 text-sm sm:text-base border border-navy rounded-xl bg-light ${inter.className}`}
        />
        <input
          type="text"
          name="lastName"
          placeholder="LAST NAME"
          value={formData.lastName}
          onChange={handleInputChange}
          className={`w-full p-2 sm:p-3 text-sm sm:text-base border border-navy rounded-xl bg-light ${inter.className}`}
        />
        <input
          type="email"
          name="email"
          placeholder="EMAIL"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full p-2 sm:p-3 text-sm sm:text-base border border-navy rounded-xl bg-light ${inter.className}`}
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="PHONE NUMBER"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className={`w-full p-2 sm:p-3 text-sm sm:text-base border border-navy rounded-xl bg-light ${inter.className}`}
        />
        <input
          type="text"
          name="country"
          placeholder="COUNTRY OF RESIDENCE"
          value={formData.country}
          onChange={handleInputChange}
          className={`w-full p-2 sm:p-3 text-sm sm:text-base border border-navy rounded-xl bg-light ${inter.className}`}
        />
        <button
          type="submit"
          className={`w-full bg-mint border-2 border-navy text-navy px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-xl lowercase ${inter.className}`}
        >
          SAVE CHANGES
        </button>
      </form>
    </div>
  );
}