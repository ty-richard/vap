'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { inter } from '@/app/fonts';

export default function ConnectForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ready for API call with formData
    console.log('Form data ready for submission:', formData);
    router.push('/home');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
        <input
        type="text"
        name="name"
        placeholder="NAME"
        value={formData.name}
        onChange={handleInputChange}
        className={`w-full p-2 border border-navy rounded-xl bg-light ${inter.className}`}
      />
      <input
        type="text"
        name="subject"
        placeholder="SUBJECT"
        value={formData.subject}
        onChange={handleInputChange}
        className={`w-full p-2 border border-navy rounded-xl bg-light ${inter.className}`}
      />
      <input
        type="email"
        name="email"
        placeholder="EMAIL"
        value={formData.email}
        onChange={handleInputChange}
        className={`w-full p-2 border border-navy rounded-xl bg-light ${inter.className}`}
      />
      
      <input
        type="message"
        name="message"
        placeholder="MESSAGE"
        value={formData.message}
        onChange={handleInputChange}
        className={`w-full p-2 border border-navy rounded-xl bg-light ${inter.className}`}
      />
      
      <button
        type="submit"
        className={`w-full bg-mint border-2 border-navy text-navy px-6 py-3 font-semibold rounded-xl ${inter.className}`}
      >
        SUBMIT
      </button>
    </form>
  );
}
