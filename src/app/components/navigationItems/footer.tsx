"use client"

import Link from 'next/link';
import { inter } from '@/app/fonts';
import Image from "next/image"

const Footer = () => {
  return (
    <footer className={`
      w-full 
      bg-navy
      text-white
      ${inter.className}
      p-5
    `}>
      <div className="flex flex-row w-full">
        <div className="w-1/3 flex justify-center items-center">
          <Link href="/" className="text-navy hover:text-gray-300">
            <Image 
              src="/static/icons/veterans-alliance-partners_logo.png"
              alt="xplorist logo"
              width={60}
              height={12}
              priority
            />
          </Link>
        </div>
        <nav className="w-2/3 flex flex-col items-center justify-center">
          <ul className="text-center">
            <li className="mb-1">
              <Link href="/aboutus" className="hover:text-light-600">
                ABOUT US
              </Link>
            </li>
            <li className="mb-1">
              <Link href="/feedback" className="hover:text-light-600">
                FEEDBACK
              </Link>
            </li>
            <li className="mb-1">
              <Link href="/contactus" className="hover:text-light-600">
                CONTACT US
              </Link>
            </li>
          </ul>
          <div className="text-sm mt-2 text-center">
            <Link href="/terms" className="hover:underline">Terms</Link>
            <span className="mx-1">•</span>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <span className="mx-1">•</span>
            <Link href="/cookies" className="hover:underline">Cookies</Link>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
