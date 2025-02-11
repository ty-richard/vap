'use client';

import { FormEvent, useState } from 'react';
import { dm_sans, inter } from '@/app/fonts';

export default function ResetPasswordForm() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // TODO: Add API call to update password
        try {
          // const response = await fetch('/api/update-password', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify(formData),
          // });
          console.log('Password update submitted:', formData);
        } catch (error) {
          console.error('Error updating password:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="password"
            placeholder="Current Password"
            className={`w-full uppercase p-2 border border-navy rounded-xl bg-light font-medium ${inter.className}`}
            value={formData.currentPassword}
            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="New Password"
            className={`w-full uppercase p-2 border border-navy rounded-xl bg-light font-medium ${inter.className}`}
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password Confirmation"
            className={`w-full uppercase p-2 border border-navy rounded-xl bg-light font-medium ${inter.className}`}
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className={`px-4 py-2 lowercase border-2 border-navy rounded-lg bg-mint text-navy hover:bg-mint transition-colors ${dm_sans.className}`}
        >
          Submit
        </button>
      </form>
    );
}