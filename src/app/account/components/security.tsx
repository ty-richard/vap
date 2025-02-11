'use client';

import { roboto_serif } from '@/app/fonts';
import ResetPasswordForm from '@/app/components/forms/resetpasswordform';

export default function Security() {
  return (
    <div className="w-full p-6 border-2 border-navy rounded-lg">
      <h2 className={`text-xl font-bold text-navy mb-6 ${roboto_serif.className}`}>
        Password
      </h2>
      <ResetPasswordForm />
    </div>
  );
}
