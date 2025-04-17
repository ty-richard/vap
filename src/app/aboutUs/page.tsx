import React from 'react';
import { dm_sans, inter, roboto_serif } from '../fonts';
import ConnectForm from '../components/forms/connectform';
import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <main className="container mx-auto mb-4">
      <div className="relative h-[400px] mb-12">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/static/images/stockTravelPhoto.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative h-full flex items-center justify-center">
            <h1 className={`${dm_sans.className} text-6xl font-extrabold text-sage lowercase`}>
              About Us
            </h1>
          </div>
        </div>
      </div>
      <div className="px-4 my-12">
        <p className={`${roboto_serif.className} text-xl text-navy`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 px-4">
        <div className="h-[400px] relative w-full">
          <Image 
            src="/static/images/stockTravelPhoto.jpg"
            alt="Travel destination" 
            className="object-contain rounded-2xl"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className={`${dm_sans.className} text-6xl font-extrabold text-navy mb-4 lowercase`}>
            Our Purpose
          </h2>
          <p className={`${inter.className} text-sm text-navy`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      <div className="w-full h-[400px] relative my-12">
        <Image 
          src="/static/images/stockTravelPhoto.jpg"
          alt="Travel destination" 
          className="object-cover rounded-lg"
          fill
          sizes="100vw"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-8 px-4 relative">
        <div className="text-center">
          <h2 className={`${dm_sans.className} text-6xl font-extrabold text-sage mb-6 lowercase`}>
            Our Mission
          </h2>
          <p className={`${inter.className} text-md text-navy`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="hidden md:block absolute h-full w-px bg-navy left-1/2 transform -translate-x-1/2" />
        <div className="text-center">
          <h2 className={`${dm_sans.className} text-6xl font-extrabold text-sage mb-6 lowercase`}>
            Our Values
          </h2>
          <p className={`${inter.className} text-md text-navy`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 px-4 mt-12">
        <div className="relative h-[300px]">
          <Image 
            src="/static/images/stockTravelPhoto.jpg"
            alt="Press section" 
            className="object-cover rounded-lg"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/30 rounded-lg" />
          <div className="relative h-full flex items-center justify-center">
            <h2 className={`${dm_sans.className} text-6xl font-extrabold text-sage lowercase`}>
              Press
            </h2>
          </div>
        </div>
        <div className="relative h-[300px]">
          <Image 
            src="/static/images/stockTravelPhoto.jpg"
            alt="Careers section" 
            className="object-cover rounded-lg"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/30 rounded-lg" />
          <div className="relative h-full flex items-center justify-center">
            <h2 className={`${dm_sans.className} text-6xl font-extrabold text-sage lowercase`}>
              Careers
            </h2>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 px-4 mt-12 items-center">
        <div className="text-center md:text-left">
          <h2 className={`${dm_sans.className} text-4xl md:text-6xl font-extrabold text-navy lowercase`}>
            Let&apos;s stay in touch
          </h2>
        </div>
        <div>
          <ConnectForm />
        </div>
      </div>
    </main>
  );
}
