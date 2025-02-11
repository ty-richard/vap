'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { inter } from '@/app/fonts';
import User from '@/types/user';
import userData from '@/data/user.json';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface UpdatePaymentFormProps {
  onClose: () => void;
}

export default function UpdatePaymentForm({ onClose }: UpdatePaymentFormProps) {
  const router = useRouter();
  const user: User = userData.user;

  const [formData, setFormData] = useState({
    creditCardNumber: user.creditCardNumber,
    creditCardExpiration: user.creditCardExpiration,
    creditCardCVC: user.creditCardCVC,
    zipCode: user.zipCode,
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
    <div className="relative p-6">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-navy hover:text-navy/70 transition-colors"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
      
      <form onSubmit={handleSubmit} className="space-y-4 mt-8">
        <input
          type="text"
          name="creditCardNumber"
          placeholder="CREDIT CARD NUMBER"
          value={formData.creditCardNumber}
          onChange={handleInputChange}
          className={`w-full p-2 border border-navy rounded-xl bg-light ${inter.className}`}
        />
        <input
          type="text"
          name="creditCardExpiration"
          placeholder="EXPIRATION DATE (MM/YY)"
          value={formData.creditCardExpiration}
          onChange={handleInputChange}
          className={`w-full p-2 border border-navy rounded-xl bg-light ${inter.className}`}
        />
        <input
          type="text"
          name="creditCardCVC"
          placeholder="CVC NUMBER"
          value={formData.creditCardCVC}
          onChange={handleInputChange}
          className={`w-full p-2 border border-navy rounded-xl bg-light ${inter.className}`}
        />
        <input
          type="text"
          name="zipCode"
          placeholder="BILLING ZIP CODE"
          value={formData.zipCode}
          onChange={handleInputChange}
          className={`w-full p-2 border border-navy rounded-xl bg-light ${inter.className}`}
        />
        <button
          type="submit"
          className={`w-full bg-mint border-2 border-navy text-navy px-6 py-3 font-semibold rounded-xl lowercase ${inter.className}`}
        >
          SAVE CHANGES
        </button>
      </form>
    </div>
  );
}
