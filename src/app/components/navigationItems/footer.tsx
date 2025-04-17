"use client"

import Link from 'next/link';
import { inter } from '@/app/fonts';

const Footer = () => {
  return (
    <footer className={`
      w-full 
      bg-navy
      text-white
      ${inter.className}
      p-5
      flex flex-col items-center justify-center 
    `}>
      <div className="text-2xl font-bold">
        TESTING
      </div>
      <nav>
        <ul className="flex flex-col items-center space-y-1">
          <li>
            <Link href="/aboutus" className="hover:text-light-600">
              ABOUT US
            </Link>
          </li>
          <li>
            <Link href="/feedback" className="hover:text-light-600">
              FEEDBACK
            </Link>
          </li>
          <li>
            <Link href="/contactus" className="hover:text-light-600">
              CONTACT US
            </Link>
          </li>
        </ul>
      </nav>

      <div className="text-sm mt-2">
        <span>TESTING</span>
        <span className="mx-1">•</span>
        <Link href="/terms" className="hover:underline">Terms</Link>
        <span className="mx-1">•</span>
        <Link href="/privacy" className="hover:underline">Privacy</Link>
        <span className="mx-1">•</span>
        <Link href="/cookies" className="hover:underline">Cookies</Link>
      </div>
    </footer>
  );
};

export default Footer;
