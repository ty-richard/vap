'use client';

import { useState } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';
import User from '@/types/user';
import userData from '@/data/user.json';
import { roboto_serif, inter } from '@/app/fonts';
import UpdatePaymentForm from '@/app/components/forms/updatepaymentform';

export default function Billing() {
  const user: User = userData.user;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="p-6 border-2 border-navy rounded-lg mb-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-semibold ${roboto_serif.className}`}>Billing</h2>
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className={`flex items-center gap-2 text-navy hover:text-navy ${inter.className}`}
          >
            <PencilIcon className="h-5 w-5" />
            <span>Edit</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="mb-2 sm:mb-0">
            <h3 className={`text-sm font-medium text-navy mb-1 ${inter.className}`}>Credit Card Number</h3>
            <p className="text-navy break-words">{user.creditCardNumber}</p>
            </div>

            <div className="mb-2 sm:mb-0">
            <h3 className={`text-sm font-medium text-navy mb-1 ${inter.className}`}>Expiration Date</h3>
            <p className="text-navy break-words">{user.creditCardExpiration}</p>
            </div>

            <div className="mb-2 sm:mb-0">
            <h3 className={`text-sm font-medium text-navy mb-1 ${inter.className}`}>CVC Number</h3>
            <p className="text-navy break-words">{user.creditCardCVC}</p>
            </div>

            <div className="mb-2 sm:mb-0">
            <h3 className={`text-sm font-medium text-navy mb-1 ${inter.className}`}>Billing Zip Code</h3>
            <p className="text-navy break-words">{user.zipCode}</p>
            </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-navy/50 flex items-center justify-center p-4 z-50">
          <div className="bg-light w-full max-w-lg rounded-xl">
            <UpdatePaymentForm onClose={() => setIsEditModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
